import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  header?: string;
  extraClasses?: string;
  onClose: () => void;
}

/**
 * Portalized modal component that renders a dialog with the given content
 *
 * - Includes a close button, a click-to-close backdrop and an optional header.
 * - Allows for custom classes to be passed to the main area, if needed.
 * - The visibility of the modal is managed by the parent, by the isOpen prop,
 *   and the onClose handler.
 *
 * NOTES:
 * - The modal is portalized so that it is rendered outside the main app DOM, to
 *   avoid styling issues such as z-index conflicts.
 * - It handles its own visibility depending on the passed isOpen prop, to keep things
 *   self-contained. Could rethink if rerenders become a concern, and conditionally
 *   render in the parent, but unmounting handling wound be needed (e.g body overflow).
 */
const Modal = ({ children, header, isOpen, onClose, extraClasses = '' }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'; // Disallow scroll when open
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <section role="dialog" className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          {header && <h2 className="modal-title">{header}</h2>}
          <button className="modal-close-button" aria-label="close dialog" onClick={onClose}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </header>

        <main className={`modal-main ${extraClasses}`.trim()}>{children}</main>
      </section>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default Modal;
