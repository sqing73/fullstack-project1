/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import SignUp from "./pages/SignUp.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import ProductCreate from "./pages/ProductCreate.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import ProductEdit from "./pages/ProductEdit.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import axios from "axios";
import storeLocal, { authActions, cartActions } from "./store/index.js";

axios.defaults.baseURL = "http://localhost:3000/api";

axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("user")) {
      const token = JSON.parse(localStorage.getItem("user")).token;
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

const storedUser = localStorage.getItem("user");

if (localStorage.getItem("user")) {
  if (storedUser) {
    storeLocal.dispatch(authActions.login(JSON.parse(storedUser).role));
    axios
      .get("/cart")
      .then((result) => {
        storeLocal.dispatch(
          cartActions.set({
            items: result.data.cart.items,
            totalPrice: +result.data.totalPrice,
            tax: +result.data.tax,
            couponDiscount: +result.data.couponDiscount,
          })
        );
      })
      .catch((error) => {
        throw error;
      });
  }
}

const isAuthenticated = () => {
  return localStorage.getItem("user");
};

const ProtectedRoute = ({ element: Element }) => {
  return isAuthenticated() ? <Element /> : <Navigate to="/" />;
};

const isAdmin = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  return auth?.role === "admin";
};

const AdminRoute = ({ element: Element }) => {
  return isAdmin() ? <Element /> : <Navigate to="/" replace />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route path="products" element={<Products />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="product">
              <Route
                path="create"
                element={<AdminRoute element={ProductCreate} />}
              />
              <Route path=":productId" element={<ProductDetail />} />
              <Route path="edit/:productId" element={<ProductEdit />} />
            </Route>
            <Route path="/404" element={<AdminRoute element={ProductEdit} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);
