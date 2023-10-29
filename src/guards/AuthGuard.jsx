import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedInUser } from "../utils/logged.in.user";
import { Box } from "@mui/material";

const AuthGuard = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = isLoggedInUser();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, isLoggedIn]);

  return (
    <Box sx={{ minHeight: "calc(100vh - 108px)" }}>
      {isLoggedIn && props.children}
    </Box>
  );
};

export default AuthGuard;
