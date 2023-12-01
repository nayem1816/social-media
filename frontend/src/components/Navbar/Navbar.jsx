import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdHome, MdOutlineOndemandVideo } from "react-icons/md";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaGamepad } from "react-icons/fa6";
import toast from "react-hot-toast";
import { TiPlus } from "react-icons/ti";
import { FaFacebookMessenger, FaUserAlt } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import CreatePostModal from "../Home/MiddlePart/CreateyPost/CreatePostModal";

const Navbar = () => {
  const handleDisableMessage = () => {
    toast.error("This feature is not available yet!");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <header className="bg-white shadow fixed z-20 w-full h-14 grid grid-cols-3 justify-between items-center">
      <section className="h-full flex items-center justify-start px-4">
        <Link to="/" className="text-xl">
          Social <span className="text-[#1B74E4]">Media</span>
        </Link>
      </section>

      <section className="center-menu h-full ">
        <ul className="h-full flex justify-between items-center">
          <li className="h-full lg:w-full w-[50%]">
            <Link
              to="/"
              className="h-full border-y-[3px] border-t-transparent border-[#1b74e4] flex items-center justify-center"
              title="Home">
              <MdHome className="text-2xl text-[#1B74E4]" />
            </Link>
          </li>
          <li className="h-full w-full hidden lg:block">
            <Link
              onClick={handleDisableMessage}
              className="h-full border-x-8 border-y-4 border-transparent rounded-2xl hover:bg-[#f0f2f5] hover:border-white flex items-center justify-center"
              title="Watch">
              <MdOutlineOndemandVideo className="text-2xl text-[#65676B]" />
            </Link>
          </li>
          <li className="h-full w-full hidden lg:block">
            <Link
              onClick={handleDisableMessage}
              className="h-full border-x-8 border-y-4 border-transparent rounded-2xl hover:bg-[#f0f2f5] hover:border-white flex items-center justify-center"
              title="Groups">
              <HiMiniUserGroup className="text-2xl text-[#65676B]" />
            </Link>
          </li>
          <li className="h-full w-full hidden lg:block">
            <Link
              onClick={handleDisableMessage}
              className="h-full border-x-8 border-y-4 border-transparent rounded-2xl hover:bg-[#f0f2f5] hover:border-white flex items-center justify-center"
              title="Gaming">
              <FaGamepad className="text-2xl text-[#65676B]" />
            </Link>
          </li>
        </ul>
      </section>

      <section className="h-full">
        <ul className="h-full flex justify-end items-center gap-2">
          <li className="w-[49px] h-full flex items-center justify-center border-x-8 border-y-8 border-transparent">
            <button
              onClick={showModal}
              className="bg-[#E4E6EB] hover:bg-[#d5d8e0] p-2.5 rounded-full"
              title="Create">
              <TiPlus className="text-xl text-[#050505]" />
            </button>
            <CreatePostModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </li>

          <li className="w-[49px] h-full flex items-center justify-center border-x-8 border-y-8 border-transparent">
            <button
              className="bg-[#E4E6EB] hover:bg-[#d5d8e0] p-2.5 rounded-full"
              title="Messenger">
              <FaFacebookMessenger className="text-xl text-[#050505]" />
            </button>
          </li>

          <li className="w-[49px] h-full flex items-center justify-center border-x-8 border-y-8 border-transparent">
            <button
              className="bg-[#E4E6EB] hover:bg-[#d5d8e0] p-2.5 rounded-full"
              title="Notifications">
              <IoNotifications className="text-xl text-[#050505]" />
            </button>
          </li>

          <li className="w-[49px] h-full flex items-center justify-center border-x-8 border-y-8 border-transparent">
            <button
              className="bg-[#E4E6EB] hover:bg-[#d5d8e0] p-2.5 rounded-full"
              title="Notifications">
              <FaUserAlt className="text-xl text-[#050505]" />
            </button>
          </li>
        </ul>
      </section>
    </header>
  );
};

export default Navbar;
