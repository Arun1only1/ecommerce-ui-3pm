import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Grid, Popover, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { $axios } from "../lib/axios";
import Progress from "./Progress";
import { placeHolderImage } from "../constants/fallback.image";

const ProductCard = (props) => {
  // popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // navigate
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const product = props.item;

  const userRole = localStorage.getItem("userRole");

  const goToProductDetail = () => {
    navigate(`/product/detail/${product._id}`);
  };

  // delete product mutation
  const { mutate: deleteProductMutate, isLoading } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async () => {
      return await $axios.delete(`/product/delete/${product._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("seller-product-list");
    },
  });

  if (isLoading) {
    return <Progress />;
  }

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }} variant="h6">
          Are you sure you want to delete this product?
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          padding="1rem"
          justifyContent="flex-end"
        >
          <Button variant="contained" onClick={closePopover}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              closePopover();
              deleteProductMutate();
            }}
          >
            Yes
          </Button>
        </Stack>
      </Popover>
      <Card
        sx={{
          maxWidth: {
            xs: "100vw",
            sm: "40vw",
            md: "30vw",
          },
          borderRadius: "8px",
          maxHeight: 600,
          boxShadow:
            " rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        <CardMedia
          onClick={() => goToProductDetail()}
          sx={{ objectFit: "cover", height: "300px", cursor: "pointer" }}
          component="img"
          alt={product?.name}
          image={product?.image || placeHolderImage}
        />
        <CardContent>
          <Stack direction="row" gap={10}>
            <Typography gutterBottom variant="h5" component="div">
              {product?.name}
            </Typography>
            <Chip label={product?.company} color="success" variant="outlined" />
          </Stack>
          <Typography variant="h6">Rs.{product.price}</Typography>

          <Typography variant="body2" color="text.secondary" mb="1rem">
            {product?.description?.slice(0, 200)}...
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              size="small"
              variant="contained"
              onClick={() => goToProductDetail()}
            >
              Explore
            </Button>
            {userRole === "seller" && (
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={(event) => openPopover(event)}
              >
                Delete
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
