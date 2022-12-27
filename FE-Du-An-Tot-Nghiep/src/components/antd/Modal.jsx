import { Button, Modal } from 'antd';
import React, { useState } from 'react';
const BaseModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (props) => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      
      </Modal>
    </>
  );
};
export default BaseModal;