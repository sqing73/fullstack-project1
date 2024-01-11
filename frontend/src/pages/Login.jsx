import { Stack } from "@mui/material";
import LoginForm from "../components/LoginForm";
import useUserForm from "../hooks.jsx/useUserForm";

const Login = () => {
  const userFormHooks = useUserForm();
  return (
    <Stack justifyContent="center" alignItems="center">
      <LoginForm userFormHooks={userFormHooks}></LoginForm>
    </Stack>
  );
};

export default Login;
