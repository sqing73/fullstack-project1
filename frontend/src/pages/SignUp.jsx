import SignupForm from "../components/SignupForm";
import { Stack } from "@mui/material";
import useUserForm from "../hooks.jsx/useUserForm";

const SignUp = () => {
  const userFormHooks = useUserForm();
  return (
    <Stack justifyContent="center" alignItems="center">
      <SignupForm userFormHooks={userFormHooks} />
    </Stack>
  );
};

export default SignUp;
