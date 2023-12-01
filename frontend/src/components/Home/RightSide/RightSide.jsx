import React from "react";
import { useGetAllUsersQuery } from "../../../feature/user/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserFriends, FaLandmark } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { MdRecentActors, MdOutlineOndemandVideo } from "react-icons/md";
const RightSide = () => {
  const { user, access_token } = useSelector((state) => state.auth);

  const { data } = useGetAllUsersQuery(access_token);

  return (
    <div>
      <h2 className="text-xl mt-2">Users</h2>
      <div className="user-list mt-3">
        {data?.data?.data.map((user) => (
          <Link
            key={user?._id}
            to={user?._id}
            class="flex items-center justify-start px-2 py-2 hover:bg-[#E4E6EB] rounded-lg">
            <img
              src={
                user?.profileImage?.url ||
                "https://www.shareicon.net/data/512x512/2016/09/15/829472_man_512x512.png"
              }
              alt="user"
              className="w-10 h-10 rounded-full"
            />

            <span class="pl-3">{user?.fullName}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RightSide;
