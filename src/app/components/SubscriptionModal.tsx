import React, { ReactNode } from 'react';
import { Modal, Box } from '@mui/material';
import Image from 'next/image';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
}

const SubscriptionModal: React.FC<ModalProps> = ({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          borderRadius: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: 'fit-content',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Image
          src="/images/logo.png"
          alt="SENAI Logo"
          width={110}
          height={76}
        />

        {children} 
      </Box>
    </Modal>
  );
};

export default SubscriptionModal;
