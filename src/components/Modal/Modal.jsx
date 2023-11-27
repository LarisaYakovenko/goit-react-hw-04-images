import { useEffect } from 'react';
import { Overlay } from './Modal.styled';

export const Modal = ({ url, tags, closeModal }) => {
  const handleClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);
  return (
    <Overlay onClick={handleClick}>
      <img src={url} alt={tags} />
    </Overlay>
  );
};
