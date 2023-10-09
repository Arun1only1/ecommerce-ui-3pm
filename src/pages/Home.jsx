import { Box, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { $axios } from "../lib/axios";
import Progress from "../component/Progress";
import { useDispatch } from "react-redux";
import { openErrorSnackbar } from "../store/slice/snackbarSlice";
import ProductCard from "../component/ProductCard";
import { getRandomId } from "../utils/random.id.generate";
import { isSeller } from "../utils/user.role";

const Home = () => {
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ["lates-products"],
    queryFn: async () => {
      return await $axios.get("/product/latest");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  const products = data?.data;

  if (isLoading) {
    return <Progress />;
  }
  return (
    <>
      <Typography sx={{ margin: "5rem 0 3rem 4rem" }} variant="h3">
        New Arrivals
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
          minHeight: "60vh",
          mb: "2rem",
        }}
      >
        {products?.map((item) => {
          return <ProductCard key={getRandomId()} item={item} />;
        })}
      </Box>
    </>
  );
};

export default Home;
