import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const PrivateRoute = ({ children, allowedRoles, path }) => {
  const { user } = useSelector((state) => state.auth);

  const isLoggedIn = useAuth();

  return isLoggedIn && allowedRoles.includes(user?.role) ? (
    children
  ) : (
    <Navigate to={path} />
  );
};

export default PrivateRoute;
