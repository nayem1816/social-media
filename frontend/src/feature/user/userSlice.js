import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfileInfo: builder.query({
      query: (access_token) => {
        return {
          url: `/user/my-profile`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["user"],
    }),

    getAllUsers: builder.query({
      query: (access_token) => {
        return {
          url: `/user`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const { useGetMyProfileInfoQuery, useGetAllUsersQuery } = userApiSlice;
