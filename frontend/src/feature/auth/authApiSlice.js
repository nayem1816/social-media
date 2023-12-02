import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => {
        const { bodyData } = data;
        return {
          url: `/auth/login`,
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              access_token: result?.data?.data?.accessToken,
              user: result?.data?.data?.user,
            })
          );
          dispatch(
            userLoggedIn({
              access_token: result?.data?.data?.accessToken,
              user: result?.data?.data?.user,
            })
          );
        } catch (error) {
          // do nothing
        }
      },
      providesTags: [""],
    }),
    signupUser: builder.mutation({
      query: (data) => {
        const { bodyData } = data;

        return {
          url: `/user`,
          method: "POST",
          preparedHeaders: (headers) => {
            headers.set("Content-type", "multipart/form-data");
            return headers;
          },
          body: bodyData,
          formData: true,
        };
      },
    }),
    userDetails: builder.query({
      query: (access_token) => {
        return {
          url: `/api/v1/my-profile`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: [""],
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        const { bodyData } = data;
        return {
          url: `/auth/reset-password`,
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      providesTags: [""],
    }),
    resetNewPassword: builder.mutation({
      query: (data) => {
        const { bodyData, userId, token } = data;
        return {
          url: `/auth/reset-password/${userId}/${token}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      providesTags: [""],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useUserDetailsQuery,
  useResetPasswordMutation,
  useResetNewPasswordMutation,
} = authApiSlice;
