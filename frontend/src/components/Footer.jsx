import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { memo } from "react";

const WhiteButton = styled(Button)({
  color: "white",
  textTransform: "none",
  padding: "0",
});

const Footer = memo(function Footer() {
  return (
    <AppBar
      position="static"
      style={{ top: "auto", bottom: "0", backgroundColor: "black" }}
    >
      <Toolbar>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "center", sm: "space-between" }}
          sx={{ width: "100%", display: { xs: "none", sm: "flex" } }}
        >
          <Typography>@2022 All Rights Reserved</Typography>
          <Box>
            <YouTubeIcon />
            <TwitterIcon />
            <FacebookIcon />
          </Box>
          <Stack direction="row" spacing={1}>
            <WhiteButton>Contact us</WhiteButton>
            <WhiteButton>Privacy Policies</WhiteButton>
            <WhiteButton>Help</WhiteButton>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          marginTop={3}
          marginBottom={1}
          sx={{ width: "100%", display: { xs: "flex", sm: "none" } }}
        >
          <Box>
            <YouTubeIcon />
            <TwitterIcon />
            <FacebookIcon />
          </Box>
          <Stack direction="row" spacing={1}>
            <WhiteButton>Contact us</WhiteButton>
            <WhiteButton>Privacy Policies</WhiteButton>
            <WhiteButton>Help</WhiteButton>
          </Stack>
          <Typography>@2022 All Rights Reserved</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
})

export default Footer;
