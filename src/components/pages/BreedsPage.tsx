import { useFetchBreeds } from '../../hooks/useFetchCats';
import { useQueryModal } from '../../hooks/useQueryModal';
import BreedModal from '../Modal/BreedModal';
import BreedDetails from '../shared/BreedDetails';
import EmptySection from '../shared/EmptySection';
import ImageCard from '../shared/ImageCard';
import LoadingGrid from '../ui/LoadingGrid';

const IMAGES_LIMIT = 12;

/**
 * Breeds page component for displaying all cat breeds
 *
 * - Fetches cat breeds and displays them in a grid. While fetching, it shows a loading grid.
 * - If no breeds are fetched, either due to an error or because of an empty response, it shows
 *   an 'empty message'.
 * - When clicking on a breed, it opens a modal with the breed details and sample images.
 * - All the breeds are fetched at once, since the number of breeds is relatively small.
 */
const BreedsPage = () => {
  // Modal handling

  const { paramValue: breedId, openModal, closeModal } = useQueryModal('breed');

  // Data fetching

  const { data: breeds, isLoading, isError } = useFetchBreeds();

  return (
    <main className="page breeds-page">
      <h1 className="main-title">
        Cat Breeds
        {breeds && <span>({breeds.length})</span>}
      </h1>

      {isLoading && <LoadingGrid length={IMAGES_LIMIT} extraClasses="images-grid" />}

      {!isLoading && (isError || breeds?.length === 0) && <EmptySection />}

      {!isLoading && !isError && breeds && (
        <>
          <section className="images-grid">
            {breeds.map((breed) => (
              <ImageCard
                key={breed.id}
                showActions={false}
                caption={<BreedDetails breed={breed} />}
                image={{ ...breed.image, breeds: [breed] }} // Convert to CatImage shape
                handleImageClick={() => openModal(breed.id)}
              />
            ))}
          </section>
          <BreedModal breedId={breedId} onClose={closeModal} />
        </>
      )}
    </main>
  );
};

export default BreedsPage;
