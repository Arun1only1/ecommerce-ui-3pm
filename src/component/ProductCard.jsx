import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Grid, Stack } from "@mui/material";

const ProductCard = (props) => {
  const product = props.item;
  return (
    <Card
      sx={{
        width: {
          xs: "100%",
          sm: "30vw",
        },

        minHeight: "500px",
        boxShadow:
          " rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
      }}
    >
      <CardMedia
        sx={{ objectFit: "cover", height: "300px" }}
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
          {product?.description?.slice(0, 300)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Explore</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
