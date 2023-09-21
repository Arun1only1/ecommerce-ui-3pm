import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import BuyerProductList from "./BuyerProductList";
import SellerProductList from "./SellerProductList";

const Product = () => {
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  return (
    <Box
      sx={{
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

          mr: {
            xs: 0,
            sm: "5rem",
          },
        }}
      >
        {userRole === "seller" && (
          <Button
            variant="contained"
            onClick={() => navigate("/product/add")}
            sx={{
              width: {
                xs: "100vw",
                sm: "auto",
              },
            }}
          >
            Add product
          </Button>
        )}
      </Stack>

      {userRole === "seller" ? <SellerProductList /> : <BuyerProductList />}
    </Box>
  );
};

export default Product;
