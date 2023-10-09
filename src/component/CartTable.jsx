import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getRandomId } from "../utils/random.id.generate";
import { RxCross2 } from "react-icons/rx";
import { Button, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { $axios } from "../lib/axios";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slice/snackbarSlice";
import { placeHolderImage } from "../constants/fallback.image";

const tableHeadData = [
  "Image",
  "Name",
  "Brand",
  "Price per unit",
  "Quantity",
  "Total",
  "Remove",
];

const CartTable = (props) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // remove item from cart mutation
  const { mutate: removeCartItemMutate, isLoading: removeItemLoading } =
    useMutation({
      mutationKey: ["remove-cart-item"],
      mutationFn: async (productId) => {
        return await $axios.put(`/cart/remove-item/${productId}`);
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries("cart-data");
        queryClient.invalidateQueries("cart-count");
        dispatch(openSuccessSnackbar(res?.data?.message));
      },
      onError: (error) => {
        dispatch(openErrorSnackbar(error?.response?.data?.message));
      },
    });

  // update item quantity mutation
  const { mutate: updateQuantityMutate, isLoading: updateQuantityLoading } =
    useMutation({
      mutationKey: ["update-cart-item-quantity"],
      mutationFn: async (data) => {
        return await $axios.put(`/cart/update/quantity/${data.productId}`, {
          option: data.option,
        });
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries("cart-data");
        dispatch(openSuccessSnackbar(res?.data?.message));
      },
      onError: (error) => {
        dispatch(openErrorSnackbar(error?.response?.data?.message));
      },
    });

  return (
    <TableContainer component={Paper}>
      {(removeItemLoading || updateQuantityLoading) && (
        <LinearProgress color="secondary" />
      )}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ paddingLeft: "1rem" }}>
            {tableHeadData.map((item) => {
              return (
                <TableCell
                  key={getRandomId()}
                  align={item === "Image" ? "left" : "center"}
                >
                  <Typography variant="h6">{item}</Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cartData.map((item) => (
            <TableRow
              key={getRandomId()}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                <img
                  src={item.image || placeHolderImage}
                  alt={item.name}
                  height={150}
                  width={150}
                  style={{ objectFit: "cover" }}
                />
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">{item?.name}</Typography>
              </TableCell>
              <TableCell align="center">
                <Chip label={item?.brand} color="success" variant="outlined" />
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">
                  {(item.price || 0).toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <AiOutlineMinus
                    onClick={() => {
                      if (item.orderQuantity > 0) {
                        updateQuantityMutate({
                          option: "decrease",
                          productId: item?.productId,
                        });
                      }
                    }}
                    size={15}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      display: item.orderQuantity > 1 ? "block" : "none",
                    }}
                  />

                  <Typography fontSize={20}>
                    {item?.orderQuantity > item.availableQuantity
                      ? item?.availableQuantity
                      : item?.orderQuantity}
                  </Typography>

                  <AiOutlinePlus
                    onClick={() => {
                      if (item.availableQuantity > item.orderQuantity) {
                        updateQuantityMutate({
                          option: "increase",
                          productId: item?.productId,
                        });
                      }
                    }}
                    size={15}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      display:
                        item.availableQuantity > item.orderQuantity
                          ? "block"
                          : "none",
                    }}
                  />
                </Stack>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">
                  {(item.total || 0).toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <RxCross2
                  onClick={() => removeCartItemMutate(item?.productId)}
                  size={25}
                  style={{ color: "red", cursor: "pointer" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
