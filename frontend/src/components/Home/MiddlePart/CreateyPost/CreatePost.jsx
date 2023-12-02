import { useSelector } from "react-redux";
import { BsPostcardFill } from "react-icons/bs";
import { IoMdPhotos } from "react-icons/io";
import { FaFaceGrin } from "react-icons/fa6";
import React, { useState } from "react";
import CreatePostModal from "./CreatePostModal";

const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-md">
      <div className="top px-5 pt-5 pb-2 flex items-center gap-3">
        <img
          className="h-8 w-8 rounded-full"
          src={
            user.profileImage?.url ||
            "https://www.shareicon.net/data/512x512/2016/09/15/829472_man_512x512.png"
          }
          alt="user"
        />
        <div
          onClick={showModal}
          className="bg-[#F0F2F5] hover:bg-gray-200 px-4 py-2 rounded-full w-full cursor-pointer">
          <h2 className="text-gray-500">Whats on your mind ?</h2>
        </div>
      </div>
      <div class="mx-4 block border-[#CED0D4] border-b mb-2 pb-2"></div>
      <div className="bottom px-4 pb-5 flex gap-5">
        <button
          onClick={showModal}
          className="w-full hover:bg-gray-200 rounded-xl py-2 flex items-center gap-2 justify-center">
          <BsPostcardFill className="text-lg" />
          New Post
        </button>
        <button
          onClick={showModal}
          className="w-full hover:bg-gray-200 rounded-xl py-2 flex items-center gap-2 justify-center">
          <IoMdPhotos className="text-lg" /> Photo/Video
        </button>
        <button
          onClick={showModal}
          className="w-full hover:bg-gray-200 rounded-xl py-2 flex items-center gap-2 justify-center">
          <FaFaceGrin className="text-lg" /> Feeling/Activity
        </button>
      </div>
      <CreatePostModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default CreatePost;
