import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FilledInput,
  FormControl,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { $axios } from "../lib/axios";
import Progress from "../component/Progress";
import { placeHolderImage } from "../constants/fallback.image";
import axios from "axios";
import { openErrorSnackbar } from "../store/slice/snackbarSlice";
import { useDispatch } from "react-redux";
import { productCategories } from "../constants/general.constant";

const EditProductForm = () => {
  const [localUrl, setLocalUrl] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  const productId = params.id;

  const navigate = useNavigate();

  //   get product details query to prefill form
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-product-details"],
    queryFn: async () => {
      return $axios.get(`/product/details/${productId}`);
    },
  });

  const productDetails = data?.data;

  //   edit product mutation
  const { mutate, isLoading: editProductLoading } = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: async (values) => {
      return $axios.put(`/product/edit/${productId}`, values);
    },
    onSuccess: (res) => {
      navigate(`/product/detail/${productId}`);
    },
    onError: (error) => {
      console.log("Something went wrong.");
    },
  });

  if (isLoading || editProductLoading || uploadImageLoading) {
    return <Progress />;
  }

  return (
    <>
      {isError && <Typography variant="h3">Something went wrong</Typography>}
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: "100%",
        }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            name: productDetails?.name,
            company: productDetails?.company,
            price: productDetails?.price,
            freeShipping: productDetails?.freeShipping,
            quantity: productDetails?.quantity,
            description: productDetails?.description,
            category: productDetails?.category,
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("Name is required.")
              .min(2, "Name must be at least 2 characters.")
              .max(55, "Name must be at most 55 characters.")
              .trim(),
            company: Yup.string()
              .required("Company is required.")
              .min(2, "Name must be at least 2 characters.")
              .max(55, "Name must be at most 55 characters.")
              .trim(),
            price: Yup.number()
              .required("Price is required.")
              .min(0, "Price must be greater than 0"),
            description: Yup.string()
              .required("Description is required.")
              .min(200, "Description must be at least 200 characters.")
              .max(1000, "Description must be at most 1000 characters.")
              .trim(),
            category: Yup.string()
              .required("Category is required.")
              .oneOf(productCategories),
            freeShipping: Yup.boolean().required("Free Shipping is required."),
            quantity: Yup.number()
              .min(1, "Quantity must be greater than 0")
              .required("Quantity is required.")
              .integer("Quantity must be an integer."),
          })}
          onSubmit={async (values) => {
            let imageUrl = "";
            if (productImage) {
              const cloudName = "dlkcko4n6";

              // creates form data object
              const data = new FormData();
              data.append("file", productImage);
              data.append("upload_preset", "nepal-mart");
              data.append("cloud_name", cloudName);

              // hit cloudinary api
              try {
                setUploadImageLoading(true);
                const res = await axios.post(
                  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                  data
                );
                imageUrl = res?.data?.secure_url;
                setUploadImageLoading(false);
              } catch (error) {
                dispatch(openErrorSnackbar(error?.response?.data?.message));
                setUploadImageLoading(false);
              }
            }

            if (imageUrl) {
              values.image = imageUrl;
            }

            mutate(values);
          }}
        >
          {(formik) => (
            <Box
              sx={{
                width: {
                  xs: "90%",
                  sm: "60%",
                  md: "45%",
                  lg: "35%",
                  xl: "30%",
                },
                mt: {
                  xs: 0,
                  sm: "5rem",
                },
                mb: "2rem",
              }}
            >
              <form
                onSubmit={formik.handleSubmit}
                style={{
                  boxShadow:
                    " rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                }}
              >
                <Typography variant="h6" sx={{ color: "black" }}>
                  Edit Product
                </Typography>

                <img
                  src={localUrl || productDetails?.image || placeHolderImage}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />

                <Button variant="contained" component="label">
                  Upload
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => {
                      const productPhoto = event.target.files[0];
                      setLocalUrl(URL.createObjectURL(productPhoto));
                      setProductImage(productPhoto);
                      console.log(productPhoto);
                    }}
                  />
                </Button>

                <FormControl fullWidth>
                  <TextField
                    variant="filled"
                    label="Name"
                    {...formik.getFieldProps("name")}
                    fullWidth
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="error-message">{formik.errors.name}</div>
                  ) : null}
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    variant="filled"
                    label="Company"
                    {...formik.getFieldProps("company")}
                    fullWidth
                  />
                  {formik.touched.company && formik.errors.company ? (
                    <div className="error-message">{formik.errors.company}</div>
                  ) : null}
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-amount">
                    Amount
                  </InputLabel>
                  <FilledInput
                    {...formik.getFieldProps("price")}
                    startAdornment={
                      <InputAdornment position="start">Rs.</InputAdornment>
                    }
                  />

                  {formik.touched.price && formik.errors.price ? (
                    <div className="error-message">{formik.errors.price}</div>
                  ) : null}
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <TextField
                    type="number"
                    {...formik.getFieldProps("quantity")}
                    label="Quantity"
                    fullWidth
                    variant="filled"
                  />
                  {formik.touched.quantity && formik.errors.quantity ? (
                    <div className="error-message">
                      {formik.errors.quantity}
                    </div>
                  ) : null}
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    variant="filled"
                    {...formik.getFieldProps("category")}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                  >
                    {productCategories.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    // backgroundColor: "red",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "black" }}>
                    Free shipping
                  </Typography>

                  {/* we can set formik values using formik.values and formik.setFieldValue */}
                  <Checkbox
                    color="success"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 35 } }}
                    // {...formik.getFieldProps("freeShipping")}
                    checked={formik.values.freeShipping}
                    onChange={() => {
                      formik.setFieldValue(
                        "freeShipping",
                        !formik.values.freeShipping
                      );
                    }}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextareaAutosize
                    className="product-description"
                    placeholder="Product description here..."
                    {...formik.getFieldProps("description")}
                  />

                  {formik.touched.description && formik.errors.description ? (
                    <div className="error-message">
                      {formik.errors.description}
                    </div>
                  ) : null}
                </FormControl>

                <Button type="submit" variant="contained" fullWidth>
                  Edit product
                </Button>
              </form>
            </Box>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default EditProductForm;
