import { useState } from "react";
import { authActions, cartActions } from "../store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//TODO: redirect to error
const useUserForm = () => {
  const [show, setShow] = useState(false);
  //TODO: resetErrors
  const [errors, setErrors] = useState({ emailError: "", passwordError: "" });
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = () => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!inputData.email || !emailRegex.test(inputData.email)) {
      setErrors((prev) => ({ ...prev, emailError: "Must be a valid email" }));
      return false;
    }
    return true;
  };

  const handlePasswordInput = (event) => {
    setErrors({ emailError: "", passwordError: "" });
    setInputData((prev) => ({ ...prev, password: event.target.value }));
  };

  const handleEmailInput = (event) => {
    setErrors({ emailError: "", passwordError: "" });
    setInputData((prev) => ({ ...prev, email: event.target.value }));
  };

  const handleAdminInput = () => {
    setInputData((prev) => ({
      ...prev,
      role: prev.role === "admin" ? "customer" : "admin",
    }));
  };

  const handleSignIn = async () => {
    if (!validateEmail()) {
      return;
    }
    if (!inputData.password) {
      setErrors((prev) => ({
        ...prev,
        passwordError: "Must be a valid password",
      }));
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post("/login", inputData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem(
        "user",
        JSON.stringify({ token: result.data.token, role: result.data.role })
      );
      dispatch(authActions.login(result.data.role));
      // console.log(result.data.cart.cart.items);
      const userCart = result.data.cart;
      if (userCart) {
        dispatch(
          cartActions.set({
            items: userCart.cart.items,
            totalPrice: +userCart.totalPrice,
            tax: +userCart.tax,
            couponDiscount: +userCart.couponDiscount,
          })
        );
      }
      navigate("/products");
    } catch (error) {
      const errorMessage = error.response?.data.message;
      if (errorMessage && errorMessage.includes("Email")) {
        setErrors((prev) => ({ ...prev, emailError: errorMessage }));
      } else if (errorMessage && errorMessage.includes("Password")) {
        setErrors((prev) => ({ ...prev, passwordError: errorMessage }));
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validateEmail()) {
      return;
    }
    if (!inputData.password) {
      setErrors((prev) => ({
        ...prev,
        passwordError: "Must be a valid password",
      }));
    }
    setLoading(true);
    try {
      await axios.post("/user", inputData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Sign Up Success");
      navigate("/");
    } catch (error) {
      const errorMessage = error.response.data.message;
      if (errorMessage && errorMessage.includes("Email")) {
        setErrors((prev) => ({ ...prev, emailError: errorMessage }));
      } else if (errorMessage && errorMessage.includes("Password")) {
        setErrors((prev) => ({ ...prev, passwordError: errorMessage }));
      } else {
        throw error;
      }
    }
    setLoading(false);
  };

  const handleUpdatePassword = async () => {
    if (!validateEmail()) {
      return;
    }
    setLoading(true);
    try {
      await axios.put(
        "/user",
        { email: inputData.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Please check your email");
      navigate("/");
    } catch (error) {
      const errorMessage = error.response.data.message;
      if (errorMessage && errorMessage.includes("Email")) {
        setErrors((prev) => ({ ...prev, emailError: errorMessage }));
      } else {
        throw error;
      }
    }
    setLoading(false);
  };

  //TODO: clean up
  return {
    show,
    setShow,
    errors,
    inputData,
    setInputData,
    loading,
    setLoading,
    navigate,
    dispatch,
    validateEmail,
    handlePasswordInput,
    handleEmailInput,
    handleAdminInput,
    handleSignIn,
    handleSignup,
    handleUpdatePassword,
  };
};

export default useUserForm;
