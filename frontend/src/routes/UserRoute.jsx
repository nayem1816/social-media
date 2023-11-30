import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserRoute = ({ children, path }) => {
  const isAuth = useAuth();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  return !isAuth ? (
    children
  ) : (
    <Navigate to={location?.state ? location?.state : path} replace />
  );

};
export default UserRoute;
