import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Alert, Stack } from "@mui/material";
import { authActions, cartActions, syncCart } from "./store";
import { useDispatch, useSelector } from "react-redux";
import ErrorBoundary from "./pages/ErrorBoundary";
import { useCallback, useEffect, useState } from "react";
import Cart from "./components/Cart";
import axios from "axios";

let timer;

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [cartOpen, setCartOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({
    couponError: "",
  });
  //TODO: maybe lift input to redux
  useEffect(() => {
    if (cart.couponDiscount === 0) {
      setCouponInput("");
    }
  }, [cart]);

  const handleSignout = useCallback(() => {
    localStorage.removeItem("user");
    dispatch(authActions.logout());
  }, [dispatch]);

  const handleCartOpen = useCallback(() => {
    setCartOpen(() => true);
  }, []);

  const handleCartClose = useCallback(() => {
    setCartOpen(() => false);
  }, []);

  const handleCartRemove = async (productId) => {
    setCouponInput("");
    try {
      const result = await axios.put("/cart", { productId, quantity: 0 });
      dispatch(
        cartActions.set({
          items: result.data.cart.items,
          totalPrice: +result.data.totalPrice,
          tax: +result.data.tax,
          couponDiscount: +result.data.couponDiscount,
        })
      );
    } catch (error) {
      console.log(error);
    }
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
    setCouponInput("");
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

  const resetErrors = () => {
    setErrors({
      couponError: "",
    });
  };

  const handleCouponSubmit = async () => {
    if (couponInput === "") {
      setErrors((prev) => ({ ...prev, couponError: "coupon cannot be empty" }));
      return;
    }
    try {
      setStatus("submitting");
      const result = await axios.get("/cart", {
        params: { coupon: couponInput },
      });
      if (result.data.couponMessage !== "Coupon applied successfully") {
        throw new Error(result.data.couponMessage);
      }
      dispatch(
        cartActions.set({
          items: result.data.cart.items,
          totalPrice: +result.data.totalPrice,
          tax: +result.data.tax,
          couponDiscount: +result.data.couponDiscount,
        })
      );
    } catch (error) {
      setErrors((prev) => ({ ...prev, couponError: error.message }));
    } finally {
      setStatus("");
    }
  };

  return (
    <ErrorBoundary>
      {cart.error && (
        <Alert
          severity="error"
          onClose={() => dispatch(cartActions.setError(null))}
        >
          {cart.error}
        </Alert>
      )}
      <Cart
        cart={cart}
        cartOpen={cartOpen}
        handleCartClose={handleCartClose}
        handleCartRemove={handleCartRemove}
        handleCartIncrement={handleCartIncrement}
        handleCouponInput={(e) => {
          resetErrors();
          setCouponInput(e.target.value);
        }}
        handleCouponSubmit={handleCouponSubmit}
        couponInputValue={couponInput}
        errors={errors}
        status={status}
      />
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{ minHeight: "100vh" }}
        alignItems="center"
      >
        <Header
          cart={cart}
          authenticated={auth.isAuthenticated}
          handleSignout={handleSignout}
          handleCartOpen={handleCartOpen}
          handleCartClose={handleCartClose}
        />
        <Outlet />
        <Footer />
      </Stack>
    </ErrorBoundary>
  );
}

export default App;
