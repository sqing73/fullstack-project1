import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { syncCart } from "../store";


const productCatogories = [
  "Appliances",
  "Automotive",
  "Baby",
  "Beauty",
  "Books",
  "Camera and photography",
  "Cell phones",
  "Electronics",
  "Entertainment collectibles",
  "Fine art",
  "Gift cards",
  "Grocery",
  "Health",
  "Home and kitchen",
  "Musical instruments",
  "Office products",
  "Online stores",
  "Outdoors",
  "Pet supplies",
  "Sports",
  "Toys",
  "Video games",
];

const emptyInputData = {
  name: "",
  description: "",
  category: productCatogories[0],
  price: 0,
  stock: 0,
  image: "http://",
};

const useProductForm = (productId) => {
  const [inputData, setInputData] = useState(emptyInputData);
  const [errors, setErrors] = useState({
    nameError: "",
    priceError: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      if (productId) {
      setLoading(true);
      try {
          const result = await axios.get(`/product/${productId}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setInputData(() => {
            return {
              name: result.data.name,
              description: result.data.description,
              category: result.data.category,
              price: result.data.price,
              stock: result.data.stock,
              image: result.data.image
            }
          })
        } catch (error) {
          console.log(error);
          navigate("/404");
        } finally {
          setLoading(false);
        }
      }
    };
    getProduct();
  }, [navigate, productId]);

  const resetErrors = () => {
    setErrors({
      nameError: "",
    });
  };

  const handleNameInput = (event) => {
    resetErrors();
    setInputData((prev) => ({ ...prev, name: event.target.value }));
  };

  const handleDescriptionInput = (event) => {
    setInputData((prev) => ({ ...prev, description: event.target.value }));
  };

  const handleCategoryInput = (event) => {
    setInputData((prev) => ({ ...prev, category: event.target.value }));
  };

  const handlePriceInput = (event) => {
    resetErrors();
    const inputPrice = +event.target.value;
    setInputData((prev) => ({ ...prev, price: Math.max(0, inputPrice) }));
  };

  const handleStockInput = (event) => {
    const inputStock = +event.target.value;
    setInputData((prev) => ({ ...prev, stock: Math.max(0, inputStock) }));
  };

  const handleImageInput = (event) => {
    setInputData((prev) => ({ ...prev, image: event.target.value }));
  };

  const handleCreateProduct = async () => {
    if (!inputData.name) {
      return setErrors((prev) => ({
        ...prev,
        nameError: "name cannot be empty",
      }));
    }
    if (!inputData.price) {
      return setErrors((prev) => ({
        ...prev,
        priceError: "price cannot be 0",
      }));
    }
    setSubmitting(true);
    try {
      const result = await axios.post("/product", inputData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
        // await new Promise((resolve) => setTimeout(() => {resolve(1)}, 5000))
      navigate(`/product/${result.data._id}`);
    } catch (error) {
      navigate("/404");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditProduct = async () => {
    if (!inputData.name) {
      return setErrors((prev) => ({
        ...prev,
        nameError: "name cannot be empty",
      }));
    }
    if (!inputData.price) {
      return setErrors((prev) => ({
        ...prev,
        priceError: "price cannot be 0",
      }));
    }
    setSubmitting(true);
    try {
      const result = await axios.put(`/product/${productId}`, inputData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(syncCart(productId));
      // await new Promise((resolve) => setTimeout(() => {resolve(1)}, 5000))
      navigate(`/product/${result.data._id}`);
    } catch (error) {
      console.log(error);
      navigate("/404");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    inputData,
    errors,
    loading,
    submitting,
    handleNameInput,
    handleDescriptionInput,
    handleCategoryInput,
    handlePriceInput,
    handleStockInput,
    handleImageInput,
    handleCreateProduct,
    handleEditProduct,
  };
};

export default useProductForm;
export { productCatogories };
