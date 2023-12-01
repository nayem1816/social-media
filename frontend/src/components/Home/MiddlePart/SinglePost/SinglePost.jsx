import React from "react";
import { Link } from "react-router-dom";

const SinglePost = ({ post }) => {
  return (
    <div className="bg-white rounded-md ">
      <div className="px-5 py-3">
        <div className="">
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
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
