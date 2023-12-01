import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseURL = `http://localhost:5050/api/v1`;

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseURL,
  }),

  tagTypes: ["user", "POST"],
  endpoints: (builder) => ({}),
});
