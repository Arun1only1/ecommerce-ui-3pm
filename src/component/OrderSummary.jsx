import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const OrderSummary = ({ subTotal, grandTotal }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        justifyContent: "center",
        alignItems: "center",
        // background: "red",
      }}
    >
      <Box
        sx={{
          padding: "2rem",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "space-between",
          width: {
            sm: "100%",
          },

          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        <Typography variant="h5" mb="1rem">
          Order Summary
        </Typography>
        <Stack direction="row" spacing={16} justifyContent="space-between">
          <Typography>Sub total</Typography>
          <Typography>{subTotal}</Typography>
        </Stack>
        <Stack direction="row" spacing={16} justifyContent="space-between">
          <Typography>Discount</Typography>
          <Typography>5%</Typography>
        </Stack>
        <Stack direction="row" spacing={16} justifyContent="space-between">
          <Typography>Grand total</Typography>
          <Typography>{grandTotal}</Typography>
        </Stack>
      </Box>
      <Box>
        <Button variant="contained" sx={{ width: "100%" }}>
          Proceed to checkout
        </Button>
      </Box>
    </Box>
  );
};

export default OrderSummary;
