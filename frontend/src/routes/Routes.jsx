import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import UserRoute from "./UserRoute";
import PrivateRoute from "./PrivateRoute";
import Errorpage from "../pages/Errorpage/Errorpage";
import Dashboard from "../layouts/Dashboard";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <h2>Home</h2>,
      },
    ],
  },
  {
    path: "/private",
    element: (
      <PrivateRoute
        allowedRoles={["Super Admin", "Admin", "Moderator", "User"]}
        path={"/login"}>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/private",
        element: <h2>Private route</h2>,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <UserRoute path={"/"}>
        <h2>Login</h2>
      </UserRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <UserRoute path={"/"}>
        <h2>Register</h2>
      </UserRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute
        allowedRoles={["Super Admin", "Admin", "Moderator"]}
        path={"/login"}>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <h2>Dashboard</h2>,
      },
    ],
  },
  {
    path: "*",
    element: <Errorpage />,
  },
]);
