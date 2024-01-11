/* eslint-disable react/prop-types */
import {
  Card,
  TextField,
  CardContent,
  Button,
  InputAdornment,
  Typography,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import UnderlinedButton from "./ui/UnderlinedButton";

const LoginForm = ({ userFormHooks }) => {
  const {
    handleEmailInput,
    errors,
    show,
    setShow,
    handlePasswordInput,
    handleSignIn,
    loading,
  } = userFormHooks;

  return (
    <Card
      sx={{
        minWidth: 450,
        marginBottom: "10%",
      }}
    >
      <CardContent>
        <Stack
          direction="column"
          alignItems="center"
          spacing={{ xs: 4, sm: 4 }}
        >
          <Typography variant="h4">Sign in to your account</Typography>
          <TextField
            id="email"
            label="Email"
            placeholder="you@example.com"
            variant="standard"
            sx={{ width: "100%" }}
            InputLabelProps={{
              style: { fontSize: "20px" },
            }}
            InputProps={{
              style: { fontSize: "20px" },
            }}
            onChange={handleEmailInput}
            error={Boolean(errors.emailError)}
            helperText={errors.emailError}
          />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            type={show ? "" : "password"}
            sx={{ width: "100%" }}
            InputLabelProps={{
              style: { fontSize: "20px" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <UnderlinedButton
                    onClick={() => setShow((prev) => !prev)}
                    sx={{ fontSize: "20px", color: "gray" }}
                  >
                    {show ? "Hide" : "Show"}
                  </UnderlinedButton>
                </InputAdornment>
              ),
              style: { fontSize: "20px" },
            }}
            onChange={handlePasswordInput}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSignIn();
              }
            }}
            error={Boolean(errors.passwordError)}
            helperText={errors.passwordError}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "100%", textTransform: "none" }}
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? "Loading" : "Sign In"}
          </Button>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
            marginTop={2}
          >
            <Typography>
              Don&apos;t have an account?
              <Link to="/signup">
                <UnderlinedButton>Sign up</UnderlinedButton>
              </Link>
            </Typography>
            <Link to="/update-password">
              <Typography sx={{ display: { xs: "none", sm: "block" } }}>
                <UnderlinedButton>Forgot password</UnderlinedButton>
              </Typography>
            </Link>
          </Stack>
          <Link to="/update-password">
            <Typography sx={{ display: { xs: "block", sm: "none" } }}>
              <UnderlinedButton>Forgot password</UnderlinedButton>
            </Typography>
          </Link>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
