import {
  Stack,
  Typography,
  Card,
  TextField,
  styled,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  InputAdornment,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import useProductForm, { productCatogories } from "../hooks.jsx/useProductForm";
import { useRef } from "react";

const LargeOutlinedInput = styled(TextField)({
  "& .MuiInputLabel-root": {
    fontSize: "16px",
  },
  "& .MuiInputBase-input": {
    fontSize: "16px",
  },
});

const ProductCreate = () => {
  const {
    inputData,
    errors,
    submitting,
    handleNameInput,
    handleDescriptionInput,
    handleCategoryInput,
    handlePriceInput,
    handleStockInput,
    handleImageInput,
    handleCreateProduct,
  } = useProductForm();
  const imgRef = useRef(null);

  const handImagePreview = () => {
    imgRef.current.src = inputData.image;
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      marginX={{ xs: "6.5%", sm: "30%" }}
      marginY="3%"
      width={{ xs: 434, sm: 630 }}
      spacing={3}
    >
      <Stack
        width="100%"
        direction={{ xs: "row", sm: "column" }}
        justifyContent="center"
      >
        <Typography variant="h5" noWrap sx={{ marginTop: { xs: 3, sm: 0 } }}>
          Create Product
        </Typography>
      </Stack>
      <Card sx={{ minWidth: "100%" }}>
        <Stack direction="column" padding={4} spacing={3}>
          <LargeOutlinedInput
            id="name"
            value={inputData.name}
            label="Product name"
            variant="outlined"
            onChange={handleNameInput}
            error={Boolean(errors.nameError)}
            helperText={errors.nameError}
          />

          <LargeOutlinedInput
            id="description"
            label="Product description"
            rows={4}
            variant="outlined"
            multiline
            value={inputData.description}
            onChange={handleDescriptionInput}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={{ xs: 3, sm: 1 }}
          >
            <FormControl sx={{ flex: 1 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inputData.category}
                onChange={handleCategoryInput}
                label="Category"
              >
                {productCatogories.map((category) => {
                  return (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <LargeOutlinedInput
              id="price"
              label="Price"
              variant="outlined"
              type="number"
              sx={{ flex: 1 }}
              onChange={handlePriceInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              error={Boolean(errors.priceError)}
              helperText={errors.priceError}
            />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={{ xs: 3, sm: 1 }}
          >
            <LargeOutlinedInput
              id="stock"
              label="In Stock Quantity"
              variant="outlined"
              type="number"
              sx={{ flex: 1 }}
              onChange={handleStockInput}
            />
            <LargeOutlinedInput
              id="price"
              label="Add Image Link"
              variant="outlined"
              sx={{ flex: 2 }}
              value={inputData.image}
              onChange={handleImageInput}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handImagePreview}
                    sx={{ textTransform: "none" }}
                  >
                    Preview
                  </Button>
                ),
              }}
            />
          </Stack>
          <Stack justifyContent="center" alignItems="center">
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                width: 388,
                height: 200,
                border: "dashed gray 1px",
              }}
            >
              <ImageIcon sx={{ width: 40, height: 40 }}></ImageIcon>
              <Typography>image preview!</Typography>
              <img
                ref={imgRef}
                width="388px"
                height="200px"
                style={{ position: "absolute" }}
              />
            </Stack>
          </Stack>
          <Stack
            width="100%"
            direction={{ xs: "row", sm: "column" }}
            justifyContent="center"
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: "30%", textTransform: "none" }}
              onClick={handleCreateProduct}
              disabled={submitting}
            >
              {submitting ? "Submitting" : "Add Product"}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default ProductCreate;
