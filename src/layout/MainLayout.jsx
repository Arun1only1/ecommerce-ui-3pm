import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Box sx={{ minHeight: "70vh" }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
