import { Outlet } from "react-router";
import { AuthProvider } from "~/contexts/auth-context";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
