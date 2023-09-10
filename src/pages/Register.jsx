import { Box, Typography } from "@mui/material";
import React from "react";
import RegisterForm from "../component/RegisterForm";

const Register = () => {
  return (
    <Box
      sx={{
        width: "500px",
        minHeight: "500px",
        borderRadius: "10px",
        margin: "auto",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        padding: "2rem",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Typography variant="h3" sx={{ color: "grey", marginBottom: "2rem" }}>
        Register
      </Typography>
      <RegisterForm />
    </Box>
  );
};

export default Register;
