import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import UserRoute from "./UserRoute";
import PrivateRoute from "./PrivateRoute";
import Errorpage from "../pages/Errorpage/Errorpage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import Home from "../pages/Home/Home";
import ResetPage from "../pages/ResetPassword/ResetPage";
import ResetNewPass from "../pages/ResetPassword/ResetNewPass";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute path={"/login"}>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <UserRoute path={"/"}>
        <LoginPage />
      </UserRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <UserRoute path={"/"}>
        <RegisterPage />
      </UserRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <UserRoute path={"/"}>
        <ResetPage />
      </UserRoute>
    ),
  },
  {
    path: "/reset-password/:userId/:token",
    element: (
      <UserRoute path={"/"}>
        <ResetNewPass />
      </UserRoute>
    ),
  },
  {
    path: "*",
    element: <Errorpage />,
  },
]);
