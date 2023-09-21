import { Box, Typography } from "@mui/material";
import React from "react";
import LoginForm from "../component/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Box
      sx={{
        width: "25vw",

        borderRadius: "10px",
        margin: "auto",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        marginTop: "20vh",
      }}
    >
      <Typography variant="h3" sx={{ color: "grey", marginBottom: "2rem" }}>
        Login
      </Typography>
      <LoginForm />
      <Link to="/register">New here? Register</Link>
    </Box>
  );
};

export default Login;
