import React from "react";
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
import { Form, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { $axios } from "../lib/axios";

const productCategories = [
  "grocery",
  "kitchen",
  "clothing",
  "electronics",
  "furniture",
  "bakery",
  "liquor",
  "sports",
];
const AddProductForm = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, isError, error } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: async (values) => {
      return await $axios.post("/product/add", values);
    },
    onSuccess: (res) => {
      navigate("/product");
    },
  });

  return (
    <Box sx={{ display: "grid", placeItems: "center" }}>
      <Formik
        initialValues={{
          name: "",
          company: "",
          price: 0,
          freeShipping: false,
          quantity: 0,
          description: "",
          category: "",
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
        onSubmit={(values) => {
          values.price = Number(values.price);
          console.log(values);
          mutate(values);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              marginTop: "10rem",

              boxShadow:
                " rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              padding: "1rem",
              // padding: {
              //   xs: "1rem",
              //   sm: "2rem",
              // },

              width: "30vw",

              // width: {
              //   xs: "100%",
              //   sm: "60vw",
              //   lg: "40vw",
              // },
            }}
          >
            <Typography variant="h6" sx={{ color: "black" }}>
              Add Product
            </Typography>

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
              <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
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
                <div className="error-message">{formik.errors.quantity}</div>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
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
                <div className="error-message">{formik.errors.description}</div>
              ) : null}
            </FormControl>

            {/* {console.log(formik.values)} */}

            <Button type="submit" variant="contained" fullWidth>
              Add product
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddProductForm;
