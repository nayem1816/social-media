import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import useAuthCheck from "./hooks/useAuthCheck";
import Loader from "./components/Loader/Loader";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <Loader />
  ) : (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
