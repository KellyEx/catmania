import { fireEvent, render, screen } from '@testing-library/react';

import Modal from '../../../components/Modal';

describe('Modal Component', () => {
  let onCloseMock: jest.Mock;

  const renderModal = (isOpen: boolean, extraClasses?: string) => {
    render(
      <Modal isOpen={isOpen} onClose={onCloseMock} extraClasses={extraClasses}>
        <p>Modal Content</p>
      </Modal>
    );
  };

  beforeEach(() => {
    // Create the root element for the portal
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);

    onCloseMock = jest.fn();
  });

  afterEach(() => {
    const modalRoot = document.getElementById('modal-root');

    if (modalRoot) document.body.removeChild(modalRoot);
  });

  it('should render with a close button and the given children when isOpen is true', () => {
    renderModal(true);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByLabelText('close dialog')).toBeInTheDocument();
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={onCloseMock}>
        <p>Modal Content</p>
      </Modal>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should apply extra classes to the main area when given', () => {
    renderModal(true, 'custom-class');

    expect(screen.getByRole('dialog').querySelector('main')).toHaveClass('custom-class');
  });

  describe('Closing the modal', () => {
    it('should call onClose when clicking the backdrop', () => {
      renderModal(true);

      const backdrop = screen.getByRole('dialog').parentElement;
      backdrop?.click();

      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when clicking the close button', () => {
      renderModal(true);

      const closeButton = screen.getByLabelText('close dialog');
      fireEvent.click(closeButton);

      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });
});
