import React, { createContext, useContext, useState, useCallback } from 'react';
import ImageVideoModal from '../components/ImageVideoModal';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalProps, setModalProps] = useState({ open: false });

  const showModal = useCallback(({ title, description, media, initialIndex }) => {
    setModalProps({
      open: true,
      title,
      description,
      media,
      initialIndex: initialIndex || 0,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalProps((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      <ImageVideoModal {...modalProps} onClose={closeModal} />
    </ModalContext.Provider>
  );
};
