import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Divider, Dropdown, Popover } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LikeOutlined, HeartOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import SinglePostReaction from "./SinglePostReaction/SinglePostReaction";
import {
  useDeletePostMutation,
  useGetAllReactionsQuery,
} from "../../../../feature/post/postSlice";
import { useSelector } from "react-redux";
import { FaRegFaceLaughBeam, FaRegFaceSadTear } from "react-icons/fa6";
import Comments from "./Comments/Comments";
import CreatePostModal from "../CreateyPost/CreatePostModal";
import toast from "react-hot-toast";

const SinglePost = ({ post, modal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, access_token } = useSelector((state) => state.auth);

  const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation();

  const { data, isLoading } = useGetAllReactionsQuery({
    access_token,
    postId: post?._id,
  });

  const totalReactions = data?.data?.reduce((acc, curr) => {
    return acc + curr?.count;
  }, 0);

  const handleDeletePost = async (postId) => {
    const res = await deletePost({ postId, access_token });

    if (res?.data?.success) {
      toast.success("Post deleted successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  if (deleteLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-md ">
      <div className="px-5 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-full shadow"
              src={
                post?.postCreator?.profileImage?.url ||
                "https://www.shareicon.net/data/512x512/2016/09/15/829472_man_512x512.png"
              }
              alt="user"
            />
            <div className="">
              <Link to="/" className="hover:underline">
                {post?.postCreator?.fullName}
              </Link>
              <p className="text-xs">
                {new Date(post?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          {post.postCreator._id === user._id && (
            <div className="">
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: [
                    {
                      label: "Edit",
                      onClick: () => setIsModalOpen(true),
                    },
                    {
                      label: "Delete",
                      onClick: () => handleDeletePost(post?._id),
                    },
                  ],
                }}
                placement="bottomRight"
                arrow>
                <div className="bg-gray-200 p-2 rounded-full text-gray-800 hover:bg-gray-300 cursor-pointer select-none">
                  <BsThreeDotsVertical />
                </div>
              </Dropdown>
              <CreatePostModal
                post={post}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          )}
        </div>
        {post?.content && (
          <div className="my-3">
            <p>{post?.content}</p>
          </div>
        )}
        {post?.postImage?.url && (
          <div className="my-3">
            <img
              className="w-full h-full rounded-md"
              src={
                post?.postImage?.url ||
                "https://www.shareicon.net/data/512x512/2016/09/15/829472_man_512x512.png"
              }
              alt=""
            />
          </div>
        )}

        <div className="flex justify-between">
          <Avatar.Group
            maxCount={5}
            maxPopoverTrigger="click"
            size="small"
            maxStyle={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              cursor: "pointer",
            }}>
            {data?.data?.map((reaction) =>
              reaction?._id === "like" ? (
                <Tooltip
                  key={reaction?._id}
                  title={reaction?.count}
                  placement="top">
                  <Avatar
                    className="cursor-pointer text-sm bg-[#0C7DFE]"
                    icon={<LikeOutlined className="text-white" />}
                  />
                </Tooltip>
              ) : reaction?._id === "love" ? (
                <Tooltip
                  key={reaction?._id}
                  title={reaction?.count}
                  placement="top">
                  <Avatar
                    className="cursor-pointer text-sm bg-[#F82F3F]"
                    icon={<HeartOutlined className="text-white" />}
                  />
                </Tooltip>
              ) : reaction?._id === "sad" ? (
                <Tooltip
                  key={reaction?._id}
                  title={reaction?.count}
                  placement="top">
                  <Avatar
                    className="cursor-pointer text-sm bg-yellow-700 flex justify-center items-center"
                    icon={<FaRegFaceSadTear className="text-white" />}
                  />
                </Tooltip>
              ) : reaction?._id === "laugh" ? (
                <Tooltip
                  key={reaction?._id}
                  title={reaction?.count}
                  placement="top">
                  <Avatar
                    className="cursor-pointer text-sm bg-yellow-600 flex justify-center items-center"
                    icon={
                      <FaRegFaceLaughBeam className="text-white text-center" />
                    }
                  />
                </Tooltip>
              ) : null
            )}
            {totalReactions === 0 ? null : (
              <p className="ml-1">{totalReactions}</p>
            )}
          </Avatar.Group>
          {post?.totalComments === 0 ? null : (
            <div className="total-comments">{post?.totalComments} Comments</div>
          )}
        </div>
        <Divider className="mt-4 mb-2" />
        <SinglePostReaction post={post} modal={modal} />
        {modal === true && (
          <>
            <Divider className="mt-4 mb-2" />
            <div className="comments">
              <Comments post={post} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
