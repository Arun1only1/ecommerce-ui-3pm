import { Grid, Pagination, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ProductCard from "../component/ProductCard";
import Progress from "../component/Progress";
import { $axios } from "../lib/axios";

const BuyerProductList = () => {
  const [page, setPage] = useState(1);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["buyer-product-list", page],
    queryFn: async () => {
      return await $axios.post("/product/buyer/all", {
        page,
        limit: 9,
      });
    },
  });

  const products = data?.data?.products;

  const totalPage = data?.data?.totalPage;

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
          minHeight: "60vh",
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
      <Pagination
        count={totalPage}
        color="secondary"
        sx={{
          display: "flex",
          justifyContent: "center",
          background: "none",
          mt: "2rem",
        }}
        onChange={(_, value) => {
          setPage(value);
        }}
      />
    </>
  );
};

export default BuyerProductList;
