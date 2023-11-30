import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn, userLoggedOut } from "../feature/auth/authSlice";
import { useGetMyProfileInfoQuery } from "../feature/user/userSlice";

export default function useAuthCheck() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authToken, setAuthToken] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      setAuthToken(auth?.access_token);
    } else {
      dispatch(userLoggedOut());
      localStorage.removeItem("auth");
    }
  }, []);

  const { data, isLoading, isError, isSuccess, error } =
    useGetMyProfileInfoQuery(authToken, {
      skip: !authToken,
      refetchOnReconnect: true,
    }) || {};

  useEffect(() => {
    if (!isLoading && isSuccess && !isError && authToken) {
      dispatch(
        userLoggedIn({
          access_token: authToken,
          user: data?.data,
        })
      );
    }

    if (!isLoading && error) {
      dispatch(userLoggedOut());
      localStorage.removeItem("auth");
    }

    setTimeout(() => {
      if (!isLoading) {
        setAuthChecked(true);
      }
    }, 1000);
  }, [
    dispatch,
    setAuthChecked,
    authToken,
    isError,
    isSuccess,
    data?.user,
    isLoading,
    error,
  ]);

  return authChecked;
}
