import React from "react";
import { useParams } from "react-router-dom";
import { useResetNewPasswordMutation } from "../../feature/auth/authApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetNewPass = () => {
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const navigate = useNavigate();

  const { userId, token } = useParams();

  const [resetNewPassword, { isLoading }] = useResetNewPasswordMutation();

  console.log(userId, token);

  const handleResetPassword = async () => {
    console.log(newPassword, confirmPassword);

    if (
      newPassword !== confirmPassword &&
      newPassword !== "" &&
      confirmPassword !== ""
    ) {
      return toast.error("Password not matched");
    }

    if (newPassword === "" || confirmPassword === "") {
      return toast.error("Password is required");
    }

    const bodyData = {
      password: newPassword,
    };

    const res = await resetNewPassword({ bodyData, userId, token });

    console.log(res);

    if (res?.data?.success) {
      toast.success("Password reset successfully, Now you can login");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      toast.error("Something went wrong");
    }

    if (res?.error?.data?.success) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div class="container mx-auto">
      <div class="flex justify-center items-center h-screen px-6">
        <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
          <div class="px-8 mb-4 text-center">
            <h3 class="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
            <p class="mb-4 text-sm text-gray-700">
              We get it, stuff happens. Just enter your email address below and
              we'll send you a link to reset your password!
            </p>
          </div>
          <div class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
            <div class="mb-4">
              <label
                class="block mb-2 text-sm font-bold text-gray-700"
                for="email">
                New Password
              </label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleResetPassword();
                  }
                }}
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="password"
                placeholder="Enter new password..."
              />
            </div>
            <div class="mb-4">
              <label
                class="block mb-2 text-sm font-bold text-gray-700"
                for="email">
                Confirm Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleResetPassword();
                  }
                }}
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="password"
                placeholder="Enter new password again..."
              />
            </div>
            <div class="mb-6 text-center">
              {isLoading ? (
                <button
                  class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                  type="button">
                  Loading...
                </button>
              ) : (
                <button
                  onClick={() => handleResetPassword()}
                  class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                  type="button">
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetNewPass;
