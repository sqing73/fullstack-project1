import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialProductListMetricsState = {
  page: 1,
  size: 10,
  sort: "price",
  order: "asc",
  optionName: "priceLowToHigh",
};

const metricsSlice = createSlice({
  name: "metrics",
  initialState: initialProductListMetricsState,
  reducers: {
    set(state, action) {
      (state.page = action.payload.page || state.page),
        (state.size = action.payload.size || state.size),
        (state.sort = action.payload.sort || state.sort),
        (state.order = action.payload.order || state.order);
      state.optionName = action.payload.optionName || state.optionName;
    },
  },
});

const initialAuthState = {
  isAuthenticated: false,
  role: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.role = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

const initialCartState = {
  items: [],
  totalPrice: 0,
  tax: 0,
  couponDiscount: 0,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    set(state, action) {
      return { ...state, ...action.payload };
    },
    increment(state, action) {
      const idx = state.items.findIndex(
        (product) => product.product._id === action.payload.productId
      );
      if (idx < 0) {
        return state;
      }
      state.items[idx] = {
        ...state.items[idx],
        quantity: state.items[idx].quantity + action.payload.amount,
      };
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addItem(state, action) {
      console.log(action.payload.product);
      state.items = [
        ...state.items,
        { product: action.payload.product, quantity: 1 },
      ];
    },
  },
});

export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async (productId, { dispatch, getState }) => {
    try {
      const quantity = getState().cart.items.find(
        (item) => item.product._id === productId
      )?.quantity;
      if (!quantity) {
        throw new Error("product not found");
      }
      const result = await axios.put("/cart", { productId, quantity });
      dispatch(
        cartSlice.actions.set({
          items: result.data.cart.items,
          totalPrice: +result.data.totalPrice,
          tax: +result.data.tax,
          couponDiscount: +result.data.couponDiscount,
        })
      );
    } catch (error) {
      dispatch(cartSlice.actions.setError(error.message));
    }
  }
);

const store = configureStore({
  reducer: {
    metrics: metricsSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export const metricsActions = metricsSlice.actions;
export const authActions = authSlice.actions;
export const cartActions = cartSlice.actions;

export default store;
