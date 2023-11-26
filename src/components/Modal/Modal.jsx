import { useEffect } from 'react';
import { Overlay } from './Modal.styled';

export const Modal = ({ url, tags, close }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      close();
    }
  };

  const handleClick = e => {
    if (e.target === e.currentTarget) {
      close();
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

// export class Modal extends Component {
//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.closeModal();
//     }
//   };

//   render() {
//     return (
//       <Overlay onClick={this.handleClick}>
//         <img src={this.props.url} alt="modal_img" />
//       </Overlay>
//     );
//   }
// }
