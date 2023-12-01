import { apiSlice } from "../api/apiSlice";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => {
        const { bodyData, access_token } = data;

        return {
          url: `/post`,
          method: "POST",
          preparedHeaders: (headers) => {
            headers.set("Content-type", "multipart/form-data");
            return headers;
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: bodyData,
          formData: true,
        };
      },
      invalidatesTags: ["POST"],
    }),

    getAllPosts: builder.query({
      query: (data) => {
        const { access_token } = data;

        return {
          url: `/post`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["POST"],
    }),
  }),
});

export const { useCreatePostMutation, useGetAllPostsQuery } = courseApiSlice;
