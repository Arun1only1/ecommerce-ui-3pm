import React, { useState } from "react";
import { useQuery } from "react-query";
import { $axios } from "../lib/axios";
import { Box, Pagination, Typography } from "@mui/material";
import ProductCard from "../component/ProductCard";
import Progress from "../component/Progress";
import { Link } from "react-router-dom";

const SellerProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
  console.log(totalPage);

  if (isLoading) {
    return <Progress />;
  }
  return (
    <>
      {productList.length <= 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            justifyContent: "center",
            alignItems: "center",
            marginTop: "10rem",
          }}
        >
          <Typography variant="h3" sx={{ color: "grey" }}>
            No product added
          </Typography>
          <Link to="/product/add">
            <Typography variant="h6">Click here to add product</Typography>
          </Link>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",

            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",

            gap: "2rem",
            minHeight: "60vh",
          }}
        >
          {productList?.map((item) => {
            return <ProductCard key={item._id} item={item} />;
          })}
        </Box>
      )}

      {totalPage > 0 && (
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
      )}
    </>
  );
};

export default SellerProductList;
