import { Route } from "../types/route";
import HomePage from "../pages/Home";
import RegisterPage from "../pages/auth/Register";
import LoginPage from "../pages/auth/Login";
import ChangePasswordPage from "../pages/auth/ChangePassword";
import LogoutPage from "../pages/auth/Logout/LogoutPage";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import ResetPasswordPage from "../pages/auth/ResetPassword";

const routes: Route[] = [
  {
    path: "/",
    component: HomePage,
    name: "Home Page",
    protected: true,
  },
  {
    path: "/register",
    component: RegisterPage,
    name: "Register Page",
    protected: false,
  },
  {
    path: "/login",
    component: LoginPage,
    name: "Login Page",
    protected: false,
  },
  {
    path: "/update-password",
    component: ChangePasswordPage,
    name: "Change password Page",
    protected: true,
  },
  {
    path: "/logout",
    component: LogoutPage,
    name: "Logout Page",
    protected: true,
  },
  {
    path: "/password-reset",
    component: ForgotPasswordPage,
    name: "Password reset",
    protected: false,
  },
  {
    path: "/reset",
    component: ResetPasswordPage,
    name: "Reset request",
    protected: false,
  },
];

export default routes;
