import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserFriends, FaLandmark } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { MdRecentActors, MdOutlineOndemandVideo } from "react-icons/md";

const LeftSide = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <section class="h-full pt-[14px]">
      <ul class="text-[15px] font-medium mx-2">
        <li>
          <Link
            to="/"
            class="flex items-center justify-start px-2 py-2 hover:bg-[#E4E6EB] rounded-lg">
            <img
              src={auth?.user?.profileImage?.url}
              width="36"
              height="36"
              alt="user"
              class="rounded-full"
            />

            <span class="pl-3">{auth?.user?.fullName}</span>
          </Link>
        </li>

        <li>
          <Link
            to="/"
            class="flex items-center justify-start px-2 py-2 hover:bg-[#E4E6EB] rounded-lg">
            <FaUserFriends className="text-xl" />

            <span class="pl-3">Friends</span>
          </Link>
        </li>

        <li>
          <Link
            to="/"
            class="flex items-center justify-start px-2 py-2 hover:bg-[#E4E6EB] rounded-lg">
            <FaLandmark className="text-xl" />

            <span class="pl-3">Marketplace</span>
          </Link>
        </li>

        <li>
          <Link
            to="/"
            class="flex items-center justify-start px-2 py-2 hover:bg-[#E4E6EB] rounded-lg">
            <HiUserGroup className="text-xl" />

            <span class="pl-3">Groups</span>
          </Link>
        </li>

        <li>
          <Link
            to="/"
            class="flex items-center justify-start px-2 py-2 hover:bg-[#E4E6EB] rounded-lg">
            <MdRecentActors className="text-xl" />

            <span class="pl-3">Most Recent</span>
          </Link>
        </li>

        <li>
          <Link
            to="/"
            class="flex items-center justify-start px-2 py-2 hover:bg-[#E4E6EB] rounded-lg">
            <MdOutlineOndemandVideo className="text-xl" />

            <span class="pl-3">Watch</span>
          </Link>
        </li>

        <li>
          <Link
            to="/"
            class="flex items-center justify-start px-2 py-2 hover:bg-[#E4E6EB] rounded-lg">
            <div class="bg-[#E4E6EB] flex items-center justify-center w-9 h-9 rounded-full">
              <svg
                fill="#050505"
                viewBox="0 0 15 15"
                width="18"
                height="18"
                class="">
                <g fill-rule="evenodd" transform="translate(-448 -544)">
                  <path
                    fill-rule="nonzero"
                    d="M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z"></path>
                </g>
              </svg>
            </div>

            <span class="pl-3">See more</span>
          </Link>
        </li>
      </ul>

      <div class="mx-4 block border-[#CED0D4] border-b mb-2 pb-2"></div>

      <h3 class="mx-4 pt-3 pb-3 text-[17px] font-semibold leading-5 text-[#65676B]">
        Your shortcuts
      </h3>

      <ul class="mx-2 text-[15px] font-medium">
        <li>
          <Link
            to="/"
            class="flex items-center justify-start px-2 py-2 hover:bg-[#E4E6EB] rounded-lg">
            <img
              src={auth?.user?.profileImage?.url}
              width="36"
              height="36"
              alt="Axolotl Lovers"
              class="rounded-lg"
            />

            <span class="pl-3">Axolotl Lovers</span>
          </Link>
        </li>

        <li>
          <Link
            to="/"
            class="flex items-center justify-start px-2 py-2 hover:bg-[#E4E6EB] rounded-lg">
            <div class="bg-[#E4E6EB] flex items-center justify-center w-9 h-9 rounded-full">
              <svg
                fill="#050505"
                viewBox="0 0 15 15"
                width="18"
                height="18"
                class="">
                <g fill-rule="evenodd" transform="translate(-448 -544)">
                  <path
                    fill-rule="nonzero"
                    d="M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z"></path>
                </g>
              </svg>
            </div>

            <span class="pl-3">See more</span>
          </Link>
        </li>
      </ul>

      <footer class="mx-4 py-4 text-[13px] text-[#65676B]">
        <Link to="/" class="hover:underline">
          Privacy
        </Link>{" "}
        ·{" "}
        <Link to="/" class="hover:underline">
          Terms
        </Link>{" "}
        ·{" "}
        <Link to="/" class="hover:underline">
          Advertising
        </Link>{" "}
        ·{" "}
        <Link to="/" class="hover:underline">
          Ad Choices{" "}
        </Link>{" "}
        ·{" "}
        <Link to="/" class="hover:underline">
          Cookies
        </Link>{" "}
        ·{" "}
        <Link to="/" class="hover:underline">
          More
        </Link>{" "}
        · <span>Meta &copy; 2023</span>
      </footer>
    </section>
  );
};

export default LeftSide;
