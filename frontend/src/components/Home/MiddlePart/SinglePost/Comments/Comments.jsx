import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateNewCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentsQuery,
} from "../../../../../feature/post/postSlice";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";
import { Dropdown } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";

const Comments = ({ post }) => {
  const [comment, setComment] = useState("");
  const { user, access_token } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetAllCommentsQuery({
    access_token,
    postId: post?._id,
  });

  const [deleteComment, { isLoading: deleteLoading }] =
    useDeleteCommentMutation();

  const [createNewComment, { isLoading: commentLoading }] =
    useCreateNewCommentMutation();

  const handleSubmitComment = async () => {
    if (!comment) {
      return toast.error("Comment can't be empty");
    }

    const bodyData = new FormData();

    bodyData.append("postId", post?._id);

    bodyData.append("commentText", comment);

    await createNewComment({ bodyData, access_token });

    setComment("");
  };

  const handleCommentDelete = async (commentId) => {
    const res = await deleteComment({ commentId, access_token });

    if (res?.data?.success) {
      toast.success("Comment deleted successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="grid gap-3">
        {data?.data?.map((comment) => (
          <div key={comment?._id} className="flex gap-2">
            <img
              className="w-8 h-8 rounded-full mt-2"
              src={comment?.commentCreator?.profileImage?.url}
              alt="img"
            />
            <div className="bg-gray-300 p-2 rounded-xl">
              <div className="flex items-center gap-10">
                <h2 className="text-sm font-semibold">
                  {comment?.commentCreator?.fullName}
                </h2>
                {comment?.commentCreator?._id === user._id && (
                  <div className="">
                    <Dropdown
                      trigger={["click"]}
                      menu={{
                        items: [
                          // {
                          //   label: "Edit",
                          //   onClick: () => console.log("Edit"),
                          // },
                          {
                            label: "Delete",
                            onClick: () => handleCommentDelete(comment?._id),
                          },
                        ],
                      }}
                      placement="bottomRight"
                      arrow>
                      <div className="bg-gray-200 w-6 h-6 rounded-full text-gray-800 hover:bg-gray-300 cursor-pointer select-none flex justify-center items-center">
                        <BsThreeDotsVertical />
                      </div>
                    </Dropdown>
                  </div>
                )}
              </div>
              <p className="text-sm">{comment?.commentText}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="new-comment flex items-center gap-3 mt-5">
        <img
          className="w-10 h-10 rounded-full"
          src={user?.profileImage?.url}
          alt=""
        />
        <div class="group w-full">
          <div class="relative flex items-center">
            <input
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmitComment();
                }
              }}
              type="text"
              value={comment}
              placeholder="Write a comment..."
              class="peer relative border h-10 w-full rounded-md bg-gray-50 pl-4 pr-20 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
            />
            <button
              onClick={() => handleSubmitComment()}
              class={`absolute right-2 h-7 w-16 rounded-md bg-blue-500 text-xs font-semibold text-white transition-all duration-200 ease-in-out group-focus-within:bg-blue-400 group-focus-within:hover:bg-blue-600 flex justify-center items-center ${
                commentLoading ? "disabled" : null
              }`}>
              {commentLoading ? (
                <div className="flex justify-center items-center">
                  <div className="w-4 h-4 border-2 border-t-2 border-gray-100 rounded-full animate-spin"></div>
                </div>
              ) : (
                <IoSend className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
