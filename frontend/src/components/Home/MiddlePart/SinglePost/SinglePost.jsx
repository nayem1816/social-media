import React from "react";
import { Link } from "react-router-dom";
import { Divider, Dropdown, Popover } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LikeOutlined, HeartOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import SinglePostReaction from "./SinglePostReaction/SinglePostReaction";
import { useGetAllReactionsQuery } from "../../../../feature/post/postSlice";
import { useSelector } from "react-redux";
import { FaRegFaceLaughBeam, FaRegFaceSadTear } from "react-icons/fa6";

const SinglePost = ({ post }) => {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];

  const { user, access_token } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetAllReactionsQuery({
    access_token,
    postId: post?._id,
  });

  const totalReactions = data?.data?.reduce((acc, curr) => {
    return acc + curr?.count;
  }, 0);

  return (
    <div className="bg-white rounded-md ">
      <div className="px-5 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-full shadow"
              src={
                post?.postCreator?.profileImage?.url ||
                "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
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
          <div className="">
            <Dropdown
              trigger={["click"]}
              menu={{
                items,
              }}
              placement="bottomRight"
              arrow>
              <div className="bg-gray-200 p-2 rounded-full text-gray-800 hover:bg-gray-300 cursor-pointer select-none">
                <BsThreeDotsVertical />
              </div>
            </Dropdown>
          </div>
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
              src={post?.postImage?.url}
              alt=""
            />
          </div>
        )}

        <div className="">
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
        </div>
        <Divider className="mt-4 mb-2" />
        <SinglePostReaction post={post} />
      </div>
    </div>
  );
};

export default SinglePost;
