/* eslint-disable react/prop-types */
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { memo } from "react";

const Header = memo(function Header({
  cart,
  authenticated,
  handleSignout,
  handleCartOpen,
}) {
  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Toolbar sx={{ paddingLeft: { sm: 10 }, paddingRight: { sm: 10 } }}>
        <Link to="/products" style={{ color: "white", textDecoration: "none" }}>
          <Box display="flex" alignItems="flex-end">
            <Typography
              variant="h4"
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Management
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              M
            </Typography>
            <Typography
              marginLeft={{ xs: 0, sm: 1 }}
              marginRight={8}
              variant="h6"
              component="div"
            >
              Chuwa
            </Typography>
          </Box>
        </Link>

        <Box sx={{ width: "40%", display: { xs: "none", sm: "block" } }}>
          <TextField
            id="search"
            placeholder="Search"
            sx={{
              backgroundColor: "white",
              marginTop: "5px",
              marginBottom: "5px",
              outline: "none",
              borderStyle: "none",
              width: "100%",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{
              style: { padding: "10px", fontSize: "20px" },
            }}
          />
        </Box>
        <Box marginLeft="auto">
          <Link to="/">
            {!authenticated && (
              <IconButton sx={{ color: "white", padding: 0 }}>
                <PersonIcon />
                <Typography
                  marginLeft={1}
                  marginRight={3}
                  display={{ xs: "none", sm: "block" }}
                >
                  Sign In
                </Typography>
              </IconButton>
            )}
            {authenticated && (
              <IconButton
                sx={{ color: "white", padding: 0 }}
                onClick={handleSignout}
              >
                <PersonIcon />
                <Typography
                  marginLeft={1}
                  marginRight={3}
                  display={{ xs: "none", sm: "block" }}
                >
                  Sign Out
                </Typography>
              </IconButton>
            )}
          </Link>
          <IconButton
            color="inherit"
            sx={{ padding: 0, marginLeft: { xs: 3, sm: 0 } }}
            onClick={handleCartOpen}
          >
            <ShoppingCartIcon />
            <Typography marginLeft={1}>{(cart.totalPrice == 0) ? "Cart":"$"+cart.totalPrice}</Typography>
          </IconButton>
        </Box>
      </Toolbar>
      <Box
        marginLeft={2}
        marginRight={2}
        marginBottom={1}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <TextField
          id="searchXS"
          placeholder="Search"
          sx={{
            backgroundColor: "white",
            marginTop: "5px",
            marginBottom: "5px",
            outline: "none",
            borderStyle: "none",
            width: "100%",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{
            style: { padding: "10px", fontSize: "25px" },
          }}
        />
      </Box>
    </AppBar>
  );
});

export default Header;
