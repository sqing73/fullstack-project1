import { Stack } from "@mui/material";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import useUserForm from "../hooks.jsx/useUserForm";

const UpdatePassword = () => {
  const userFormHooks = useUserForm();
  return (
    <Stack justifyContent="center" alignItems="center">
      <UpdatePasswordForm userFormHooks={userFormHooks} />
    </Stack>
  );
};

export default UpdatePassword;
