import { useEffect } from 'react';
import { Overlay } from './Modal.styled';

export const Modal = ({ url, tags, closeModal }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
  return (
    <Overlay onClick={handleClick}>
      <img src={url} alt={tags} />
    </Overlay>
  );
};
