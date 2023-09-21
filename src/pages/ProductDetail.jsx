import { Box, Button, Chip, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useQuery } from "react-query";
import { $axios } from "../lib/axios";
import { useParams } from "react-router-dom";
import Progress from "../component/Progress";
const ProductDetail = () => {
  const [count, setCount] = useState(1);

  const userRole = localStorage.getItem("userRole");

  const params = useParams();
  console.log(params);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["product-detail"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${params.productId}`);
    },
  });

  const productDetails = data?.data;
  const availableProductQuantity = productDetails?.quantity;

  if (isLoading) {
    return <Progress />;
  }

  return (
    <Box
      sx={{
        margin: "10rem 2rem 2rem 2rem",
        display: "flex",
        flexDirection: "row",
        minHeight: "500px",
        padding: "1rem",
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
        }}
      >
        <Grid item>
          <img
            style={{ height: 600 }}
            src="https://www.cgdigital.com.np/api/images/products/UZRvuJ_1639385902-CG32C1-001.webp"
          />
        </Grid>
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
          <Typography variant="h6"> {productDetails?.description}</Typography>
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
              <Button color="success" variant="contained">
                Add to cart
              </Button>
            </Grid>
          </>
        ) : (
          <Button variant="contained" sx={{ width: "200px" }}>
            Edit Product
          </Button>
        )}
      </Grid>
    </Box>
  );
};

export default ProductDetail;
