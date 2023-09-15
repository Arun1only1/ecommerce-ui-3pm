import React from "react";
import SellerProductList from "./SellerProductList";
import BuyerProductList from "./BuyerProductList";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: "5rem", padding: "4rem" }}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: "3rem",
          mr: "7rem",
        }}
      >
        <Button variant="contained" onClick={() => navigate("/product/add")}>
          Add product
        </Button>
      </Stack>

      {userRole === "seller" ? <SellerProductList /> : <BuyerProductList />}
    </Box>
  );
};

export default Product;
