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
            sm: "25vw",
          },

          maxHeight: 500,
          boxShadow:
            " rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        <CardMedia
          onClick={() => goToProductDetail()}
          sx={{ objectFit: "cover", height: "200px", cursor: "pointer" }}
          component="img"
          alt={product?.name}
          image="https://assets.vogue.com/photos/61e9a9960f2c70681323293d/master/w_2560%2Cc_limit/Paris%2520Mens%2520Fall%252022%2520day%25203%2520by%2520STYLEDUMONDE0K3A6025FullRes.jpg"
        />
        <CardContent>
          <Stack direction="row" gap={10}>
            <Typography gutterBottom variant="h5" component="div">
              {product?.name}
            </Typography>
            <Chip label={product?.company} color="success" variant="outlined" />
          </Stack>
          <Typography variant="h6">Rs.{product.price}</Typography>

          <Typography variant="body2" color="text.secondary">
            {product?.description?.slice(0, 200)}...
          </Typography>
        </CardContent>
        <CardActions>
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
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
