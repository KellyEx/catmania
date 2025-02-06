import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ImageCard from '../../../components/shared/ImageCard';
import { useFavourites } from '../../../hooks/useFavourite';

jest.mock('../../../hooks/useFavourite', () => ({
  useFavourites: jest.fn(),
}));

const renderWithRouter = (ui: React.ReactNode) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('ImageCard Component', () => {
  const mockToggleFavourite = jest.fn();

  beforeEach(() => {
    (useFavourites as jest.Mock).mockReturnValue({
      isFavourite: false,
      toggleFavourite: mockToggleFavourite,
    });
  });

  describe('when image URL is invalid or missing', () => {
    it('should display fallback image', () => {
      render(<ImageCard image={{ id: '1', url: '', breeds: [] }} />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', './logo.svg');
    });
  });

  describe('when image URL is valid', () => {
    it('should display the correct image', () => {
      render(<ImageCard image={{ id: '1', url: 'cat.jpg', breeds: [] }} />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'cat.jpg');
    });
  });

  describe('when showActions is true and image is not loading or fallback', () => {
    it('should display action buttons (share & favourite)', () => {
      render(<ImageCard image={{ id: '1', url: 'cat.jpg', breeds: [] }} showActions={true} />);

      const image = screen.getByRole('img'); // Image should be loaded
      fireEvent.load(image);

      expect(screen.getByRole('button', { name: /favourite/i })).toBeInTheDocument();
    });
  });

  describe('when handleImageClick is provided', () => {
    it('should trigger handleImageClick when image is clicked', () => {
      const handleImageClick = jest.fn();
      render(
        <ImageCard
          image={{ id: '1', url: 'cat.jpg', breeds: [] }}
          handleImageClick={handleImageClick}
        />
      );

      const clickableButton = screen.getByRole('button', { name: /view details/i });
      fireEvent.click(clickableButton);

      expect(handleImageClick).toHaveBeenCalled();
    });
  });

  describe('when linkTo is provided', () => {
    it('should render a link to the specified URL', () => {
      const linkTo = '/cat_1';
      renderWithRouter(
        <ImageCard image={{ id: '1', url: 'cat.jpg', breeds: [] }} linkTo={linkTo} />
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', linkTo);
    });
  });

  describe('when caption is provided', () => {
    it('should display the caption text', () => {
      const caption = 'Cute cat';
      render(<ImageCard image={{ id: '1', url: 'cat.jpg', breeds: [] }} caption={caption} />);

      expect(screen.getByText(caption)).toBeInTheDocument();
    });
  });
});
