import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState({
    category: "",
    name: "",
    price: 0,
    stock: 0,
    description: "",
  });
  const [loading, setLoading] = useState();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`/product/${productId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setProductData(result.data);
      } catch (error) {
        navigate("/404");
      }
      setLoading(false);
    };
    fetchProduct();
  }, [navigate, productId]);

  return (
    <>
      {loading ? (
        "Loading...."
      ) : (
        <Stack
          width="90%"
          direction="column"
          spacing={3}
          marginBottom={{xs: 5, sm: 10 }}
        >
          <Stack
            direction="row"
            width="100%"
            justifyContent={{ xs: "center", sm: "flex-start" }}
          >
            <Typography
              variant="h5"
              noWrap
              sx={{ marginTop: { xs: 3, sm: 0 } }}
            >
              Product Detail
            </Typography>
          </Stack>
          <Box>
          <ProductCard productData={productData} auth={auth}/>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default ProductDetail;
