import React, { useState } from "react";
import { Popover } from "antd";
import {
  LikeOutlined,
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
  LikeFilled,
  HeartFilled,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { FaRegFaceLaughBeam, FaRegFaceSadTear } from "react-icons/fa6";
import {
  useCreateReactionMutation,
  useGetMyReactionQuery,
} from "../../../../../feature/post/postSlice";
import { useSelector } from "react-redux";
import SinglePostModal from "../../../../Common/SinglePostModal";

const SinglePostReaction = ({ post, modal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, access_token } = useSelector((state) => state.auth);

  const { data, isLoading: myLoading } = useGetMyReactionQuery({
    access_token,
    postId: post?._id,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [createReaction, { isLoading }] = useCreateReactionMutation();

  const handleReaction = async (reaction) => {
    const bodyData = {
      postId: post?._id,
      reactType: reaction,
    };

    await createReaction({ bodyData, access_token });
  };

  return (
    <div className="flex justify-between items-center gap-5">
      <Popover
        content={
          <div className="flex gap-5">
            <div
              onClick={() => handleReaction("like")}
              className={`flex items-center gap-1 bg-gray-100 cursor-pointer hover:bg-gray-300 p-1 rounded ${
                isLoading && "disabled"
              }`}>
              <LikeOutlined className="text-[#0C7DFE]" />
              Like
            </div>
            <div
              onClick={() => handleReaction("love")}
              className={`flex items-center gap-1 bg-gray-100 cursor-pointer hover:bg-gray-300 p-1 rounded ${
                isLoading && "disabled"
              }`}>
              <HeartOutlined className="text-[#F82F3F]" />
              Love
            </div>
            <div
              onClick={() => handleReaction("laugh")}
              className={`flex items-center gap-1 bg-gray-100 cursor-pointer hover:bg-gray-300 p-1 rounded ${
                isLoading && "disabled"
              }`}>
              <FaRegFaceLaughBeam className="text-yellow-500" />
              Laugh
            </div>
            <div
              onClick={() => handleReaction("sad")}
              className={`flex items-center gap-1 bg-gray-100 cursor-pointer hover:bg-gray-300 p-1 rounded ${
                isLoading && "disabled"
              }`}>
              <FaRegFaceSadTear className="text-yellow-700" />
              Sad
            </div>
          </div>
        }>
        <button
          onClick={() => handleReaction(data?.data?.reactType || "like")}
          className="w-full hover:bg-gray-200 hover:rounded-xl py-1 flex items-center gap-2 justify-center">
          {data?.data?.reactType === "like" ? (
            <LikeFilled className="text-[#0C7DFE]" />
          ) : data?.data?.reactType === "love" ? (
            <HeartFilled className="text-[#F82F3F]" />
          ) : data?.data?.reactType === "laugh" ? (
            <FaRegFaceLaughBeam className="text-yellow-500" />
          ) : data?.data?.reactType === "sad" ? (
            <FaRegFaceSadTear className="text-yellow-700" />
          ) : (
            <LikeOutlined className="" />
          )}
          {data?.data?.reactType || "Like"}
        </button>
      </Popover>
      <button
        onClick={modal !== true ? showModal : null}
        className="w-full hover:bg-gray-200 hover:rounded-xl py-1 flex items-center gap-2 justify-center">
        <CommentOutlined />
        Comment
      </button>
      <SinglePostModal
        post={post}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Tooltip title="Coming soon this feature" placement="top">
        <button className="w-full hover:bg-gray-200 hover:rounded-xl py-1 flex items-center gap-2 justify-center">
          <ShareAltOutlined />
          Share
        </button>
      </Tooltip>
    </div>
  );
};

export default SinglePostReaction;
