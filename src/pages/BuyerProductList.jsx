import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { $axios } from "../lib/axios";

const BuyerProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProductsByBuyer = async () => {
      try {
        setLoading(true);
        const res = await $axios.post("/product/buyer/all", {
          page: 1,
          limit: 10,
        });

        console.log(res);

        setLoading(false);

        setProducts(res?.data);
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
      }
    };

    getProductsByBuyer();
  }, []);

  return (
    <div>
      {loading && <Typography>Loading...</Typography>}
      {!loading && error && <Typography>{error}</Typography>}
      {products.map((item) => {
        return <Typography key={item._id}>{item.name}</Typography>;
      })}
    </div>
  );
};

export default BuyerProductList;
