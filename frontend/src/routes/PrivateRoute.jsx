import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const PrivateRoute = ({ children, path }) => {
  const { user } = useSelector((state) => state.auth);

  const isLoggedIn = useAuth();

  return isLoggedIn ? children : <Navigate to={path} />;
};

export default PrivateRoute;
