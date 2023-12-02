import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseURL = `https://social-media-mocha-rho.vercel.app/api/v1`;

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseURL,
  }),

  tagTypes: ["user", "POST", "COMMENT"],
  endpoints: (builder) => ({}),
});
