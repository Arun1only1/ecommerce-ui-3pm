import React from "react";
import SellerProductList from "./SellerProductList";
import BuyerProductList from "./BuyerProductList";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: {
          xs: "1rem",
          md: "3rem",
        },
        padding: {
          xs: 0,
          sm: "3rem",
        },
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: {
            xs: "center",
            sm: "center",
            md: "flex-end",
          },
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
