import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
  Button,
  Card,
  CardContent,
  ButtonGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, metricsActions, syncCart } from "../store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const metricsOptions = {
  lastAdded: { sort: "createdAt", order: "desc" },
  priceLowToHigh: { sort: "price", order: "asc" },
  priceHighToLow: { sort: "price", order: "desc" },
};

let timer;

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProdutList] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    maxPage: 5,
    currStart: 1,
  });
  const dispatch = useDispatch();
  const metrics = useSelector((state) => state.metrics);
  const isXsScreen = useMediaQuery("(max-width:600px)");
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const itemsMap = useMemo(() => {
    const map = new Map();
    cart.items.forEach((item) => {
      map.set(item.product._id, item.quantity);
    });
    return map;
  }, [cart.items]);

  useEffect(() => {
    const fetchProductList = async () => {
      setLoading(true);
      try {
        const result = await axios.get("/product", {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            page: metrics.page,
            size: metrics.size,
            sort: metrics.sort,
            order: metrics.order,
          },
        });
        setProdutList(() => result.data.products);
        setPageInfo((prev) => ({
          ...prev,
          maxPage: Math.ceil(result.data.totalProducts / metrics.size),
        }));
      } catch (error) {
        console.log(error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchProductList();
  }, [metrics, navigate]);

  useEffect(() => {
    if (isXsScreen) {
      dispatch(
        metricsActions.set({
          size: 3,
          page: 1,
        })
      );
    }
  }, [dispatch, isXsScreen]);

  const handleMetricsChange = (event) => {
    const option = metricsOptions[event.target.value];
    dispatch(metricsActions.set({ ...option, optionName: event.target.value }));
  };

  const handlePageChange = (event) => {
    const page = +event.target.value;
    if (page <= 0 || page > pageInfo.maxPage || page === metrics.page) {
      return;
    }
    if (page === pageInfo.currStart + 4) {
      setPageInfo((prev) => ({
        ...prev,
        currStart: Math.min(page, pageInfo.maxPage - 4),
      }));
    }
    if (page === pageInfo.currStart) {
      setPageInfo((prev) => ({
        ...prev,
        currStart: Math.max(1, page - 4),
      }));
    }
    dispatch(
      metricsActions.set({
        page,
      })
    );
  };

  const handleAddCart = (product) => {
    //optimistic update
    dispatch(cartActions.addItem({ product }));

    axios
      .put("/cart", { productId: product._id, quantity: 1 })
      .then((result) =>
        dispatch(
          cartActions.set({
            items: result.data.cart.items,
            totalPrice: +result.data.totalPrice,
            tax: +result.data.tax,
            couponDiscount: +result.data.couponDiscount,
          })
        )
      )
      .catch((error) => console.log(error));
  };

  const handleCartIncrement = async (productId, amount) => {
    const currQuantity = cart.items.find(
      (item) => item.product._id === productId
    )?.quantity;
    if (
      !currQuantity ||
      currQuantity + amount <= 0 ||
      currQuantity + amount >= 100
    ) {
      return;
    }
    try {
      // do optimistic update
      dispatch(cartActions.increment({ productId, amount }));

      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(syncCart(productId));
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box padding={{ sm: 8 }} width="90%">
      <Stack direction="column" spacing={2} width="100%">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Typography variant="h4">Products</Typography>
          <Stack direction="row" spacing={3} justifyContent="space-between">
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={metrics.optionName}
                onChange={handleMetricsChange}
                inputProps={{
                  "aria-label": "Without label",
                  sx: { paddingX: 4, paddingY: 1, minWidth: 130 },
                }}
              >
                <MenuItem value={"lastAdded"}>Last added</MenuItem>
                <MenuItem value={"priceLowToHigh"}>Price: low to high</MenuItem>
                <MenuItem value={"priceHighToLow"}>Price: high to low</MenuItem>
              </Select>
            </FormControl>
            {auth.isAuthenticated && auth.role === "admin" && (
              <Link to="/product/create">
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ textTransform: "none", paddingX: 4 }}
                >
                  Add Product
                </Button>
              </Link>
            )}
          </Stack>
        </Stack>
        {/* products list */}
        <Card sx={{ width: "100%", sm: { minWidth: "1323px" } }}>
          {loading && <CardContent>Loading...</CardContent>}
          {!loading && (
            <CardContent sx={{ height: "100%" }}>
              <Stack
                height="100%"
                width="100%"
                direction={{ xs: "column", sm: "row" }}
                flexWrap="wrap"
                justifyContent="space-between"
              >
                {productList.map((product) => {
                  return (
                    <Card
                      sx={{ width: { sm: "19%" }, height: "50%", marginY: 1 }}
                      key={product._id}
                    >
                      <CardContent sx={{ height: "100%" }}>
                        <Stack
                          direction="column"
                          width="100%"
                          height="100%"
                          spacing={1}
                        >
                          <Link
                            to={`/product/${product._id}`}
                            style={{ height: "200px" }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Link>
                          <Typography color="gray">{product.name}</Typography>
                          <Typography color="black">
                            {"$" + product.price.toFixed(2)}
                          </Typography>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={1}
                          >
                            {auth.isAuthenticated &&
                              !itemsMap.has(product._id) && (
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  sx={{ width: "100%" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddCart(product);
                                  }}
                                >
                                  Add
                                </Button>
                              )}
                            {auth.isAuthenticated &&
                              itemsMap.has(product._id) && (
                                <ButtonGroup
                                  variant="outlined"
                                  color="secondary"
                                  disableRipple
                                  disableFocusRipple
                                  sx={{ width: "100%" }}
                                >
                                  <Button
                                    style={{
                                      borderRightColor:
                                        "rgba(156, 39, 176, 0.5)",
                                    }}
                                    sx={{ width: "33.3333%" }}
                                    onClick={() =>
                                      handleCartIncrement(product._id, 1)
                                    }
                                  >
                                    +
                                  </Button>
                                  <Button
                                    disabled
                                    style={{
                                      borderLeftColor: "transparent",
                                    }}
                                    sx={{ width: "33.3333%" }}
                                  >
                                    {itemsMap.get(product._id)}
                                  </Button>
                                  <Button
                                    sx={{ width: "33.3333%" }}
                                    onClick={() =>
                                      handleCartIncrement(product._id, -1)
                                    }
                                  >
                                    -
                                  </Button>
                                </ButtonGroup>
                              )}
                            {auth.role === "admin" && (
                              <Link
                                to={`/product/edit/${product._id}`}
                                style={{ width: "100%" }}
                              >
                                <Button
                                  variant="outlined"
                                  sx={{ width: "100%" }}
                                >
                                  Edit
                                </Button>
                              </Link>
                            )}
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            </CardContent>
          )}
        </Card>
        <ButtonGroup
          variant="outlined"
          color="secondary"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={handlePageChange}
            value={metrics.page - 1}
            sx={{ marginLeft: "auto" }}
          >
            {"<<"}
          </Button>
          <Button
            onClick={handlePageChange}
            value={pageInfo.currStart}
            variant={
              metrics.page === pageInfo.currStart ? "contained" : "outlined"
            }
          >
            {pageInfo.currStart}
          </Button>
          <Button
            onClick={handlePageChange}
            value={pageInfo.currStart + 1}
            variant={
              metrics.page === pageInfo.currStart + 1 ? "contained" : "outlined"
            }
          >
            {pageInfo.currStart + 1}
          </Button>
          <Button
            onClick={handlePageChange}
            value={pageInfo.currStart + 2}
            variant={
              metrics.page === pageInfo.currStart + 2 ? "contained" : "outlined"
            }
          >
            {pageInfo.currStart + 2}
          </Button>
          <Button
            onClick={handlePageChange}
            value={pageInfo.currStart + 3}
            variant={
              metrics.page === pageInfo.currStart + 3 ? "contained" : "outlined"
            }
          >
            {pageInfo.currStart + 3}
          </Button>
          <Button
            onClick={handlePageChange}
            value={pageInfo.currStart + 4}
            variant={
              metrics.page === pageInfo.currStart + 4 ? "contained" : "outlined"
            }
          >
            {pageInfo.currStart + 4}
          </Button>
          <Button onClick={handlePageChange} value={metrics.page + 1}>
            {">>"}
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

export default Products;
