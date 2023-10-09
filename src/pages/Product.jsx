import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  Stack,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BuyerProductList from "./BuyerProductList";
import SellerProductList from "./SellerProductList";
import {
  clearProductFilter,
  openProductFilter,
  setSearchText,
} from "../store/slice/productSlice";

const Product = () => {
  const userRole = localStorage.getItem("userRole");

  const { minPrice, maxPrice, category } = useSelector(
    (state) => state.product
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userHasAppliedFilter =
    minPrice > 0 || maxPrice > 0 || category.length > 0;

  return (
    <Box
      sx={{
        padding: {
          xs: 0,
          sm: "3rem",
        },

        minHeight: "calc(100vh - 108px)",
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
              mb: "2rem",
            }}
          >
            Add product
          </Button>
        )}
      </Stack>

      <FormControl // TODO: can use debouncer on search field
        variant="standard"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: "2rem",
          gap: "2rem",
        }}
      >
        {userRole === "buyer" && (
          <>
            <Button
              variant="contained"
              disabled={!userHasAppliedFilter}
              onClick={() => dispatch(clearProductFilter())}
            >
              Clear filter
            </Button>
            <Button
              variant="outlined"
              onClick={() => dispatch(openProductFilter())}
            >
              Filter product
            </Button>
          </>
        )}

        <Input
          variant="outlined"
          id="input-with-icon-adornment"
          onChange={(e) => dispatch(setSearchText(e.target.value))}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            </InputAdornment>
          }
        />
      </FormControl>
      {userRole === "seller" ? <SellerProductList /> : <BuyerProductList />}
    </Box>
  );
};

export default Product;
