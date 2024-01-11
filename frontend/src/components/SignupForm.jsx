/* eslint-disable react/prop-types */
import {
  Card,
  TextField,
  CardContent,
  Button,
  InputAdornment,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import UnderlinedButton from "./ui/UnderlinedButton";

const SignupForm = ({ userFormHooks }) => {
  const {
    handleEmailInput,
    errors,
    show,
    setShow,
    handlePasswordInput,
    handleAdminInput,
    handleSignup,
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
          <Typography variant="h4">Sign up an account</Typography>
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
                handleSignup();
              }
            }}
            error={Boolean(errors.passwordError)}
            helperText={errors.passwordError}
          />
          <FormControlLabel
            control={<Checkbox onChange={handleAdminInput} />}
            label="Admin"
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "100%", textTransform: "none" }}
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Loading" : "Sign Up"}
          </Button>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
            marginTop={2}
          >
            <Typography>
              Already have an account?
              <Link to="/">
                <UnderlinedButton>Sign in</UnderlinedButton>
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
