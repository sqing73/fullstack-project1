/* eslint-disable react/prop-types */
import { Card, Stack, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ productData, auth, handleAddToCart }) => {
  return (
    <Card>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        padding={5}
        spacing={7}
        height={{ sm: "500px" }}
      >
        <Box flex={1}>
          <img
            src={productData.image}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
        <Stack flex={1} direction="column" spacing={4}>
          <Typography variant="h6" noWrap>
            {productData.category}
          </Typography>
          <Typography variant="h2" noWrap>
            {productData.name}
          </Typography>
          <Typography variant="h6" noWrap>
            {"$" + productData.price}
            {productData.stock === 0 && (
              <Button
                sx={{
                  marginLeft: 3,
                  ":disabled": { color: "red", backgroundColor: "pink" },
                }}
                disabled
                variant="contained"
              >
                out of stock
              </Button>
            )}
          </Typography>
          <Typography variant="span">{productData.description}</Typography>
          <Stack direction="row" spacing={3}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ textTransform: "none" }}
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
            {auth.role === "admin" && (
              <Link to={`/product/edit/${productData._id}`}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ textTransform: "none" }}
                >
                  Edit
                </Button>
              </Link>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProductCard;
