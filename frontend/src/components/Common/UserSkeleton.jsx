import React from "react";
import { Skeleton } from "antd";

const UserSkeleton = () => {
  return (
    <div>
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
      />
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
      />
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
      />
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
      />
    </div>
  );
};

export default UserSkeleton;
