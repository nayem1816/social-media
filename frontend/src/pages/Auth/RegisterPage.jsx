import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSignupUserMutation } from "../../feature/auth/authApiSlice";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [signupUser, { isLoading }] = useSignupUserMutation();

  const onSubmit = async (data) => {
    console.log(data);

    const bodyData = new FormData();

    bodyData.append("fullName", data.fullName);
    bodyData.append("email", data.email);
    bodyData.append("password", data.password);

    const res = await signupUser({ bodyData });

    console.log(res);

    if (res.data.success) {
      toast.success("Your account has been created! Please login");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      toast.error("Failed to register user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto md:w-[600px]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">
                Register to your account
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5">
                  <div className="relative mb-7 lg:col-span-2">
                    <input
                      id="fullName"
                      type="text"
                      {...register("fullName", { required: true })}
                      className={`peer placeholder-transparent h-10 w-full border-b-2  focus:outline-none focus:borer-rose-600 ${
                        errors.fullName ? "border-red-500" : "text-gray-900"
                      }}`}
                      placeholder="Enter your full name"
                    />
                    <label
                      htmlFor="fullName"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Full Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="email"
                      type="text"
                      {...register("email", { required: true })}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Email Address
                    </label>
                  </div>
                  <div className="relative mt-8 lg:mt-0">
                    <input
                      id="password"
                      type="password"
                      {...register("password", { required: true })}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Password
                    </label>
                  </div>
                </div>
                <div className="mt-2 mb-5 flex gap-2 items-center justify-end">
                  <p className="text-xs text-end">
                    Don you have an account?{" "}
                    <Link to="/login" className="hover:underline text-blue-500">
                      Login
                    </Link>
                  </p>
                  <p>|</p>
                  <p className="mb-1">
                    <Link
                      to="/reset-password"
                      className="hover:underline text-blue-500 text-xs">
                      Forgot password?
                    </Link>
                  </p>
                </div>
                <div className="relative">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md px-4 py-1">
                    {isLoading ? "Loading..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
