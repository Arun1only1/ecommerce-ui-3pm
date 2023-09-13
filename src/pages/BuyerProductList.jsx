import React from "react";
import { useQuery } from "react-query";
import { $axios } from "../lib/axios";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import ProductCard from "../component/ProductCard";
import Progress from "../component/Progress";

const BuyerProductList = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["buyer-product-list"],
    queryFn: async () => {
      return await $axios.post("/product/buyer/all", {
        page: 1,
        limit: 10,
      });
    },
  });

  const products = data?.data;
  console.log(products);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        flexWrap: "wrap",
      }}
    >
      {isLoading && <Progress />}
      {isError && (
        <Typography sx={{ color: "red" }}>
          {error.response.data.message}
        </Typography>
      )}
      {products?.map((item) => {
        return <ProductCard key={item._id} item={item} />;
      })}
    </Grid>
  );
};

export default BuyerProductList;
