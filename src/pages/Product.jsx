import React from "react";
import SellerProductList from "./SellerProductList";
import BuyerProductList from "./BuyerProductList";
const Product = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <>{userRole === "seller" ? <SellerProductList /> : <BuyerProductList />}</>
  );
};

export default Product;
