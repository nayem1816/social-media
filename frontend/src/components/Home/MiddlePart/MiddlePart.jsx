import React from "react";
import CreatePost from "./CreateyPost/CreatePost";
import { useGetAllPostsQuery } from "../../../feature/post/postSlice";
import { useSelector } from "react-redux";
import SinglePost from "./SinglePost/SinglePost";

const MiddlePart = () => {
  const { user, access_token } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetAllPostsQuery({ access_token });

  return (
    <div className="mx-0 lg:mx-10 grid gap-5 mt-5 ">
      <div className="post">
        <CreatePost />
      </div>
      <div className="grid gap-5">
        {data?.data?.map((post) => (
          <SinglePost key={post?._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MiddlePart;
