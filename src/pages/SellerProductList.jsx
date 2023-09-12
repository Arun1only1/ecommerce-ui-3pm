import React from "react";
import { useQuery } from "react-query";
import { getProductBySeller } from "../lib/product.api";
import { Typography } from "@mui/material";

const SellerProductList = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["seller-product-list"],
    queryFn: () => getProductBySeller(),
  });

  return (
    <div>
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && isError && (
        <Typography>{error.response.data.message}</Typography>
      )}
      {data?.data?.map((item) => {
        console.log(item);

        return <Typography key={item._id}>{item.name}</Typography>;
      })}
    </div>
  );
};

export default SellerProductList;
