import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface ToastMessageProps {
  message: string | undefined;
  delay?: number;
}

const DELAY = 5000; // 5 sec

/**
 * Auto-closing, portalized toast message component to show temp messages
 *
 * - Opens when a message is passed and closes after a delay or when manually closed.
 * - Optionally, a delay duration in milliseconds can be passed to override the default.
 *
 * Future enhancements:
 * - Add a type prop to change the message style (error, warning, success, info)
 */
const ToastMessage = ({ message, delay = DELAY }: ToastMessageProps) => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null); // Store without causing rerender

  useEffect(() => {
    setShowMessage(Boolean(message));

    if (message) {
      timerIdRef.current = setTimeout(() => {
        setShowMessage(false);
      }, delay);
    }

    return () => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current); // Clear timeout on unmount
    };
  }, [message, delay]);

  if (!showMessage) return null;

  const handleClose = () => {
    if (timerIdRef.current) clearTimeout(timerIdRef.current); // Clear timeout on manual close
    setShowMessage(false);
  };

  return ReactDOM.createPortal(
    <div className="toast-message">
      <span>{message}</span>
      <button className="close-button" onClick={handleClose} aria-label="close message">
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>,
    document.getElementById('toast-message-root')!
  );
};

export default ToastMessage;
