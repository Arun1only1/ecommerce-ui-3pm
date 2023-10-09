import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Box } from "@mui/material";
import CustomSnackbar from "../component/CustomSnackbar";
import ProductFilter from "../component/ProductFilter";

const MainLayout = () => {
  return (
    <>
      <CustomSnackbar />
      <Header />
      <ProductFilter />
      <Box sx={{ minHeight: "70vh" }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
