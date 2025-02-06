import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { useFetchImages } from '../../hooks/useFetchCats';
import { BreedWithDetails } from '../../types';
import BreedDetails from '../shared/BreedDetails';
import EmptySection from '../shared/EmptySection';
import ImageCard from '../shared/ImageCard';
import LoadingGrid from '../ui/LoadingGrid';
import Modal from '.';

interface BreedModalProps {
  breedId: string | null;
  onClose: () => void;
}

const IMAGES_LIMIT = 4;

/**
 * Wrapper modal component for displaying breed details and images
 *
 * - Retrieves the breed info from the cache and fetches the images for the selected breed.
 * - The image fetching is detached from the details display, so they can be displayed right
 *   away while the images are being fetched.
 * - While images are being fetched, it shows a loading skeleton. Once successfully fetched,
 *   a link to view all images for the breed is also displayed.
 *
 * NOTES:
 * Based on the assumption that this modal opens only within the context of the breeds page,
 * the breeds data should be available in the cache. For now, if the breed data is not found
 * in the cache, it will show an empty message but a fetch could be added if needed.
 */
const BreedModal = ({ breedId, onClose }: BreedModalProps) => {
  const queryClient = useQueryClient();
  const hasBreedId = !!breedId;

  // Get breed from cache, if breed id is given

  const breed = hasBreedId
    ? (queryClient.getQueryData(['breeds']) as BreedWithDetails[] | undefined)?.find(
        (breed) => breed.id === breedId
      )
    : undefined;

  // Fetch images for the breed (disable fetching if no breed id)

  const { data: breedImages, isLoading } = useFetchImages({
    breedId,
    limit: IMAGES_LIMIT,
    enabled: hasBreedId,
  });

  const hasImages = breedImages && breedImages.length > 0;

  return (
    <Modal onClose={onClose} isOpen={hasBreedId} extraClasses="breed-modal" header={breed?.name}>
      {breed ? (
        <>
          {isLoading && <LoadingGrid length={IMAGES_LIMIT} extraClasses="modal-grid" />}
          {hasImages && (
            <div className="modal-grid">
              {breedImages?.map((image, index) => (
                <ImageCard
                  key={index}
                  image={image}
                  showActions={false}
                  linkTo={`/?image=${image.id}&breed=${breedId}`}
                />
              ))}
            </div>
          )}

          <BreedDetails breed={breed} full={true} />

          {hasImages && (
            <Link
              className="button"
              to={`/?breed=${breed.id}`}
              aria-label="breed images"
              title="breed images"
            >
              View Breed Images
            </Link>
          )}
        </>
      ) : (
        <EmptySection type="no-cat" />
      )}
    </Modal>
  );
};

export default BreedModal;
