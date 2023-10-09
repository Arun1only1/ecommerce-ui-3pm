import { Box, Button, Chip, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { $axios } from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import Progress from "../component/Progress";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slice/snackbarSlice";
import { placeHolderImage } from "../constants/fallback.image";

const ProductDetail = () => {
  const [count, setCount] = useState(1);

  const userRole = localStorage.getItem("userRole");

  const params = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["product-detail"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${params.productId}`);
    },
  });

  const productDetails = data?.data;
  const availableProductQuantity = productDetails?.quantity;

  // add to cart mutation
  const { mutate: addToCartMutate, isLoading: isAddingToCart } = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: async () => {
      return await $axios.post(`/cart/add/${params.productId}`, {
        quantity: count,
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries("cart-count");
      dispatch(openSuccessSnackbar(res?.data?.message));
    },
  });

  if (isLoading || isAddingToCart) {
    return <Progress />;
  }

  if (isError) {
    dispatch(openErrorSnackbar(error?.response?.data?.message));
  }

  return (
    <>
      {!isError && (
        <Box
          sx={{
            margin: {
              xs: 0,
              sm: "10rem 2rem 2rem 2rem",
            },
            display: "flex",
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            gap: {
              xs: "2rem",
            },
            minHeight: "500px",
            boxShadow:
              " rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem",
            }}
          >
            <img
              style={{ objectFit: "cover", width: "90%" }}
              src={productDetails?.image || placeHolderImage}
            />
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
              gap: "2rem",
            }}
          >
            <Grid item>
              <Typography variant="h5">{productDetails?.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">{productDetails?.company}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {productDetails?.description}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Rs. {productDetails?.price}</Typography>
            </Grid>
            <Grid item>
              <Chip
                label={productDetails?.category.toUpperCase()}
                color="success"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Available quantity:{productDetails?.quantity}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                gap: "2rem",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Free shipping</Typography>
              <Chip
                label={productDetails?.freeShipping ? "Yes" : "No"}
                color={productDetails?.freeShipping ? "success" : "error"}
                variant="outlined"
              />
            </Grid>
            {userRole === "buyer" ? (
              <>
                <Grid item>
                  <Stack direction="row" spacing={5}>
                    <Button
                      disabled={count <= 1}
                      variant="outlined"
                      onClick={() => {
                        const newCount = count - 1;

                        if (newCount <= 0) {
                          setCount(1);
                        } else {
                          setCount(newCount);
                        }
                      }}
                    >
                      <AiOutlineMinus />
                    </Button>
                    <Typography>{count}</Typography>
                    <Button
                      variant="outlined"
                      disabled={count === availableProductQuantity}
                      onClick={() => {
                        const newCount = count + 1;

                        if (newCount > availableProductQuantity) {
                          setCount(availableProductQuantity);
                        } else {
                          setCount(newCount);
                        }
                      }}
                    >
                      <AiOutlinePlus />
                    </Button>
                  </Stack>
                </Grid>
                <Grid item>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => addToCartMutate()}
                  >
                    Add to cart
                  </Button>
                </Grid>
              </>
            ) : (
              <Button
                variant="contained"
                sx={{ width: "200px" }}
                onClick={() => navigate(`/product/edit/${productDetails?._id}`)}
              >
                Edit Product
              </Button>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ProductDetail;
