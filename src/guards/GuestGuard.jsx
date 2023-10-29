import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isLoggedInUser } from "../utils/logged.in.user";

const GuestGuard = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLoggedIn = isLoggedInUser();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }

    if (pathname === "/" && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return <>{!isLoggedIn && props.children}</>;
};

export default GuestGuard;
