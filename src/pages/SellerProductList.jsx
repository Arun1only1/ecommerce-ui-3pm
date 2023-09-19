import React, { useState } from "react";
import { useQuery } from "react-query";
import { $axios } from "../lib/axios";
import { Box, Pagination } from "@mui/material";
import ProductCard from "../component/ProductCard";
import Progress from "../component/Progress";

const SellerProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["seller-product-list", currentPage],
    queryFn: async () => {
      return await $axios.post("/product/seller/all", {
        page: currentPage,
        limit: 9,
      });
    },
  });

  const productList = data?.data?.products;
  const totalPage = data?.data?.totalPage;

  if (isLoading) {
    return <Progress />;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          flexWrap: "wrap",

          gap: "2rem",
        }}
      >
        {productList?.map((item) => {
          return <ProductCard key={item._id} item={item} />;
        })}
      </Box>
      <Pagination
        page={currentPage}
        count={totalPage}
        color="secondary"
        sx={{
          background: "none",
          mt: "2rem",
          mb: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(_, value) => {
          setCurrentPage(value);
        }}
      />
    </>
  );
};

export default SellerProductList;
