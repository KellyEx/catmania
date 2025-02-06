import { fireEvent, render, screen } from '@testing-library/react';

import BreedsPage from '../../../components/pages/BreedsPage';
import { useFetchBreeds } from '../../../hooks/useFetchCats';
import { useQueryModal } from '../../../hooks/useQueryModal';

jest.mock('../../../hooks/useFetchCats', () => ({
  useFetchBreeds: jest.fn(),
}));

jest.mock('../../../hooks/useQueryModal', () => ({
  useQueryModal: jest.fn(),
}));

jest.mock('../../../components/ui/LoadingGrid', () => () => <div>Loading...</div>);

jest.mock('../../../components/shared/EmptySection', () => () => <div>Nothing Here</div>);

jest.mock('../../../components/Modal/BreedModal', () => ({ onClose }: { onClose: () => void }) => (
  <div>
    <h2>Breed Modal</h2>
    <button onClick={onClose}>Close</button>
  </div>
));

jest.mock(
  '../../../components/shared/ImageCard',
  () =>
    ({ handleImageClick, caption }: { handleImageClick: () => void; caption: string }) => (
      <div onClick={handleImageClick}>{caption}</div>
    )
);

jest.mock(
  '../../../components/shared/BreedDetails',
  () =>
    ({ breed }: { breed: { name: string } }) => <span>{breed.name}</span>
);

const mockBreeds = [
  { id: '2', name: 'Bengal', image: { id: 'image2', url: 'bengal.jpg', breeds: [] } },
  { id: '1', name: 'Ragamuffin', image: { id: 'image1', url: 'ragamuffin.jpg', breeds: [] } },
];

describe('BreedsPage Component', () => {
  const mockCloseModal = jest.fn();

  beforeEach(() => {
    (useQueryModal as jest.Mock).mockReturnValue({
      paramValue: 'id',
      openModal: jest.fn(),
      closeModal: mockCloseModal,
    });
  });

  describe('When loading data', () => {
    beforeEach(() => {
      (useFetchBreeds as jest.Mock).mockReturnValue({
        data: null,
        isLoading: true,
        isError: false,
      });
      render(<BreedsPage />);
    });

    it('should render loading grid while fetching', () => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('When no data is available', () => {
    beforeEach(() => {
      (useFetchBreeds as jest.Mock).mockReturnValue({
        data: [],
        isLoading: false,
        isError: false,
      });
      render(<BreedsPage />);
    });

    it('should render the empty section with a descriptive message', () => {
      expect(screen.getByText('Nothing Here')).toBeInTheDocument();
    });
  });

  describe('When there is an error fetching data', () => {
    beforeEach(() => {
      (useFetchBreeds as jest.Mock).mockReturnValue({
        data: null,
        isLoading: false,
        isError: true,
      });
      render(<BreedsPage />);
    });

    it('should render the empty section with a descriptive message', () => {
      expect(screen.getByText('Nothing Here')).toBeInTheDocument();
    });
  });

  describe('When data is available', () => {
    beforeEach(() => {
      (useFetchBreeds as jest.Mock).mockReturnValue({
        data: mockBreeds,
        isLoading: false,
        isError: false,
      });
      render(<BreedsPage />);
    });

    it('should render the breed count', () => {
      expect(screen.getByText(`(${mockBreeds.length})`)).toBeInTheDocument();
    });

    it('should render breed names', () => {
      expect(screen.getByText('Ragamuffin')).toBeInTheDocument();
      expect(screen.getByText('Bengal')).toBeInTheDocument();
    });

    it('should open the modal when a breed is clicked', () => {
      const breedElement = screen.getByText('Ragamuffin');
      fireEvent.click(breedElement);

      expect(screen.getByText('Breed Modal')).toBeInTheDocument();
    });
  });
});
