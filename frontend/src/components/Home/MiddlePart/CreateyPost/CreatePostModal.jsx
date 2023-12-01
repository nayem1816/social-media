import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Modal } from "antd";
import { MdAddToPhotos } from "react-icons/md";
import toast from "react-hot-toast";
import { useCreatePostMutation } from "../../../../feature/post/postSlice";

const CreatePostModal = ({ isModalOpen, setIsModalOpen }) => {
  const { user, access_token } = useSelector((state) => state.auth);

  const [content, setContent] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async () => {
    if (!content && !selectedFile) {
      return toast.error("Please write something or select an image");
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("postImage", selectedFile);

    const res = await createPost({ bodyData: formData, access_token });

    if (res.data.success) {
      toast.success("Post created successfully");
      setIsModalOpen(false);
      setSelectedFile(null);
      setContent("");
      setImagePreview(null);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal
      footer={null}
      title={
        <>
          <h2 className="text-xl font-semibold text-center mb-2">
            Create Post
          </h2>
          <hr />
        </>
      }
      open={isModalOpen}
      onCancel={handleCancel}>
      <div className="mt-2">
        <div className="flex items-center gap-2">
          <img
            className="h-10 w-10 rounded-full shadow"
            src={user?.profileImage?.url}
            alt="user"
          />
          <h2 className="font-semibold">{user?.fullName}</h2>
        </div>
        <div className="input-box w-full my-4 h-[250px] overflow-y-auto">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind ?"
            class="peer w-full h-16  border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
          />
          <div className="border p-2 rounded-lg">
            <label htmlFor="file-upload">
              {imagePreview ? (
                <img
                  className="h-48 w-full rounded-lg"
                  src={imagePreview}
                  alt="img"
                />
              ) : (
                <div className="bg-gray-100 hover:bg-gray-200 rounded-lg py-8 px-3 grid justify-center items-center cursor-pointer">
                  <div className="flex justify-center">
                    <button
                      className="bg-gray-300 hover:bg-[#d5d8e0] p-2.5 rounded-full"
                      title="Notifications">
                      <MdAddToPhotos className="text-xl text-[#050505]" />
                    </button>
                  </div>
                  <div className="text-center">
                    <h2 className="text-lg">Add Photos/Videos</h2>
                    <p>or drag and drop</p>
                  </div>
                </div>
              )}
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => handleFileUpload(e)}
              />
            </label>
          </div>
        </div>
        {isLoading ? (
          <button className="bg-blue-500 w-full text-white rounded-md px-4 py-2 mb-4">
            Posting...
          </button>
        ) : (
          <button
            onClick={() => handleCreatePost()}
            className="bg-blue-500 w-full text-white rounded-md px-4 py-2 mb-4">
            Post
          </button>
        )}
      </div>
    </Modal>
  );
};

export default CreatePostModal;
