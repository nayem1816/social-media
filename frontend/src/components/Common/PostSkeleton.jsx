import React from "react";
import { Skeleton } from "antd";

const PostSkeleton = () => {
  return (
    <div className="">
      <div className="my-5">
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      </div>
      <div className="my-5">
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      </div>
      <div className="my-5">
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      </div>
    </div>
  );
};

export default PostSkeleton;
