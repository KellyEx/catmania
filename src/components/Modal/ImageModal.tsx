import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useFetchImage } from '../../hooks/useFetchCats';
import { CacheKey, CatImage } from '../../types';
import EmptySection from '../shared/EmptySection';
import ImageCard from '../shared/ImageCard';
import LoadingGrid from '../ui/LoadingGrid';
import Modal from '.';

const DEFAULT_TITLE = 'A Random Cat';

interface ImageModalProps {
  imageId?: string | null;
  onClose: () => void;
  cacheContext?: CacheKey;
}

/**
 * Wrapper modal component for displaying a single cat image
 *
 * - Retrieves the image info from the cache and fetches the image if it wasn't cached.
 * - While the image is being fetched, it shows a loading skeleton.
 * - If the image is not correctly fetched, it shows an empty message.
 * - If the image has a breed, it also displays a link to view the breed details,
 *   and uses the breed name as the modal title.
 *
 * Image retrieval:
 * To avoid refetching the image data, it first checks the cache for the specific image.
 * As a fallback, it also accepts a cache context to search in (currently supports the
 * random images and random breed images in the home page). Finally, if the image is not
 * found, it fetches it from the API. In any case, it stores it by its id for future use.
 */
const ImageModal = ({ imageId, onClose, cacheContext }: ImageModalProps) => {
  const queryClient = useQueryClient();

  const cachedImage: CatImage | undefined = useMemo(() => {
    if (!imageId) return;

    let image = queryClient.getQueryData<CatImage>(['image', imageId]);
    if (!image && cacheContext) {
      const data = queryClient.getQueryData<{ pages: CatImage[][] }>(cacheContext);
      image = data ? data.pages.flat().find((img: CatImage) => img.id === imageId) : undefined;
    }

    return image;
  }, [imageId, cacheContext, queryClient]);

  const { data: image, isLoading, isError } = useFetchImage({ imageId, image: cachedImage });
  const breed = image ? image.breeds[0] : null;

  return (
    <Modal
      onClose={onClose}
      isOpen={!!imageId}
      extraClasses="image-modal"
      header={breed?.name || DEFAULT_TITLE}
    >
      {isLoading && <LoadingGrid />}

      {!isLoading && (isError || !image) && <EmptySection type="no-cat" />}

      {!isLoading && !isError && image && (
        <>
          <ImageCard image={image} />
          {breed && (
            <Link
              className="button breed-button"
              to={`/breeds?breed=${breed?.id}`}
              aria-label="breed details"
              title="breed details"
            >
              View Breed
            </Link>
          )}
        </>
      )}
    </Modal>
  );
};

export default ImageModal;
