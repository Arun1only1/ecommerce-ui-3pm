import { Grid, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Grid
      container
      mt="5rem"
      padding="2rem"
      justifyContent="center"
      alignItems="start"
      spacing={2}
      sx={{
        minHeight: "calc(100vh - 140px)",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <img
          style={{ objectFit: "cover", width: "100%" }}
          src="https://res.cloudinary.com/dlkcko4n6/image/upload/v1696508118/uyv0rdz8po1iv32fpflo.jpg"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h3" textAlign="left" my="2rem">
          About Us
        </Typography>
        <Typography variant="body1" textAlign="justify" mb="2rem">
          {`Nepal Mart, a thriving e-commerce platform, stands as a digital gateway to the rich cultural tapestry and diverse heritage of Nepal. Committed to showcasing the best of Nepalese craftsmanship and products, the platform serves as a virtual marketplace that bridges the gap between traditional artisans and a global audience. From intricately handcrafted textiles to authentic Himalayan handicrafts, Nepal Mart curates a wide array of products that encapsulate the essence of Nepal's vibrant culture. Customers can explore and purchase a variety of items, from traditional clothing adorned with exquisite embroidery to handmade pottery that reflects centuries-old techniques. The platform not only provides a seamless shopping experience but also fosters economic empowerment for local artisans by connecting them with a broader customer base.`}
        </Typography>
        <Typography variant="body1" textAlign="justify">
          {`At Nepal Mart, customer satisfaction is paramount, and the platform prioritizes user-friendly navigation, secure transactions, and efficient delivery services. The website's intuitive design ensures a seamless browsing experience, allowing customers to effortlessly discover unique products and explore the diversity of Nepalese craftsmanship. With a commitment to authenticity, Nepal Mart guarantees the quality of each product, providing customers with a genuine taste of Nepal's rich cultural heritage. As a socially responsible e-commerce platform, Nepal Mart is dedicated to promoting sustainable and ethical practices, ensuring that the beauty of Nepal's traditional arts and crafts is preserved for generations to come`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default About;
