import { apiSlice } from "../api/apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
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

    updatePost: builder.mutation({
      query: (data) => {
        const { bodyData, access_token, postId } = data;

        return {
          url: `/post/${postId}`,
          method: "PATCH",
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

    deletePost: builder.mutation({
      query: (data) => {
        const { postId, access_token } = data;

        return {
          url: `/post/${postId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
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

    createReaction: builder.mutation({
      query: (data) => {
        const { bodyData, access_token } = data;

        return {
          url: `/reaction`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["POST"],
    }),

    getAllReactions: builder.query({
      query: (data) => {
        const { access_token, postId } = data;

        return {
          url: `/reaction/${postId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["POST"],
    }),

    getMyReaction: builder.query({
      query: (data) => {
        const { access_token, postId } = data;

        return {
          url: `/reaction/my-reaction/${postId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["POST"],
    }),

    getAllComments: builder.query({
      query: (data) => {
        const { access_token, postId } = data;

        return {
          url: `/comment/${postId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["POST", "COMMENT"],
    }),

    createNewComment: builder.mutation({
      query: (data) => {
        const { bodyData, access_token } = data;

        return {
          url: `/comment`,
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
      invalidatesTags: ["POST", "COMMENT"],
    }),

    deleteComment: builder.mutation({
      query: (data) => {
        const { commentId, access_token } = data;

        return {
          url: `/comment/${commentId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["POST", "COMMENT"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useCreateReactionMutation,
  useGetAllReactionsQuery,
  useGetMyReactionQuery,
  useGetAllCommentsQuery,
  useCreateNewCommentMutation,
  useDeleteCommentMutation,
} = postApiSlice;
