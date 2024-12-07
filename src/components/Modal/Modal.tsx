import { PropsWithChildren } from "react";
import "./Modal.css";

interface ModalProps {
  title?: string;
}

const Modal: React.FC<PropsWithChildren & ModalProps> = ({
  children,
  title = "",
}) => {
  return (
    <div className='modal-container'>
      <div className='modal-display'>
        {title && <h2 className='modal-header'>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
