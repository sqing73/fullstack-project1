/* eslint-disable react/prop-types */
import {
  Modal,
  List,
  ListItem,
  Avatar,
  Stack,
  Typography,
  Button,
  ButtonGroup,
  Divider,
  AppBar,
  Toolbar,
  Box,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: { xs: "18%", sm: 0 },
  right: 0,
  width: { xs: "100%", sm: 500 },
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 36,
  // p: 4,
};

const Cart = ({
  cart,
  cartOpen,
  handleCartClose,
  handleCartRemove,
  handleCartIncrement,
  handleCouponSubmit,
  couponInputValue,
  handleCouponInput,
  errors,
  status,
}) => {
  return (
    <Modal
      open={cartOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleCartClose}
    >
      <Box sx={style}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography>
              Cart ({cart.items.reduce((acc, item) => acc + item.quantity, 0)})
            </Typography>
          </Toolbar>
        </AppBar>
        <Stack direction="column" spacing={3} padding={4}>
          <List>
            {cart.items.map((item) => {
              return (
                <ListItem key={item.product._id} sx={{ height: "100px" }}>
                  <Avatar
                    src={item.product.image}
                    sx={{ height: "100%", width: "84px", aspectRatio: "1 / 1" }}
                    variant="square"
                    alt={item.product.name}
                  />
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    height="100%"
                    width={200}
                    marginLeft={2}
                    alignItems="flex-start"
                  >
                    <Typography>{item.product.name}</Typography>
                    <ButtonGroup
                      variant="outlined"
                      color="secondary"
                      disableRipple
                      disableFocusRipple
                    >
                      <Button
                        style={{ borderRightColor: "rgba(156, 39, 176, 0.5)" }}
                        onClick={() =>
                          handleCartIncrement(item.product._id, 1)
                        }
                      >
                        +
                      </Button>
                      <Button
                        disabled
                        style={{ borderLeftColor: "transparent" }}
                      >
                        {item.quantity}
                      </Button>
                      <Button
                        onClick={() =>
                          handleCartIncrement(item.product._id, -1)
                        }
                      >
                        -
                      </Button>
                    </ButtonGroup>
                  </Stack>
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    height="100%"
                    width="100%"
                    alignItems="flex-end"
                  >
                    <Typography color="secondary">
                      ${item.product.price.toFixed(2)}
                    </Typography>

                    <Button
                      sx={{ textTransform: "none" }}
                      disableFocusRipple
                      disableRipple
                      onClick={() => handleCartRemove(item.product._id)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </ListItem>
              );
            })}
          </List>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={5}>
            <TextField
              label="Discount code"
              variant="standard"
              fullWidth
              value={couponInputValue}
              onChange={handleCouponInput}
              error={Boolean(errors.couponError)}
              helperText={errors.couponError}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ textTransform: "none", height: 37, width: 110}}
              onClick={handleCouponSubmit}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Submitting" : "Apply"}
            </Button>
          </Stack>
          <Divider />
          {/* show cart cost information */}
          <Stack direction="column" spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Subtotal:</Typography>
              <Typography>
                ${(cart.totalPrice - cart.tax + cart.couponDiscount).toFixed(2)}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography>Tax:</Typography>
              <Typography>${cart.tax.toFixed(2)}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography>Discount:</Typography>
              <Typography>${cart.couponDiscount.toFixed(2)}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography>Estimated total:</Typography>
              <Typography>${cart.totalPrice.toFixed(2)}</Typography>
            </Stack>
          </Stack>

          <Button variant="contained" color="secondary">
            Continue to checkout
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default Cart;
