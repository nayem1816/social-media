import { useSelector } from "react-redux";
import React from "react";
import { Modal } from "antd";
import SinglePost from "../Home/MiddlePart/SinglePost/SinglePost";

const SinglePostModal = ({ isModalOpen, setIsModalOpen, post }) => {
  const { user, access_token } = useSelector((state) => state.auth);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      className="w-1/2"
      style={{ top: 20 }}
      footer={null}
      title={
        <>
          <h2 className="text-xl font-semibold text-center mb-2">View Post</h2>
          <hr />
        </>
      }
      open={isModalOpen}
      onCancel={handleCancel}>
      <div className="mt-2">
        <SinglePost post={post} modal={true} />
      </div>
    </Modal>
  );
};

export default SinglePostModal;
