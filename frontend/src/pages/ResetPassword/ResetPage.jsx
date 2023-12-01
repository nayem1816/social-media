import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useResetPasswordMutation } from "../../feature/auth/authApiSlice";

const ResetPage = () => {
  const [email, setEmail] = React.useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword = async () => {
    if (email === "") {
      return toast.error("Email is required");
    }

    const bodyData = {
      email,
    };

    const res = await resetPassword({ bodyData });

    console.log(res);
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
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleResetPassword();
                  }
                }}
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter Email Address..."
              />
            </div>
            <div class="mb-6 text-center">
              <button
                onClick={() => handleResetPassword()}
                class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                type="button">
                Reset Password
              </button>
            </div>
            <hr class="mb-6 border-t" />
            <div class="text-center">
              <Link
                class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                to="/register">
                Create an Account!
              </Link>
            </div>
            <div class="text-center">
              <Link
                class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                to="/login">
                Already have an account? Login!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
