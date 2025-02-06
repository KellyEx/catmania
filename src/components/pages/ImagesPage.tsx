import { Fragment } from 'react';

import { useBreedFilter } from '../../hooks/useBreedFilter';
import { useFetchPaginatedImages } from '../../hooks/useFetchCats';
import { useQueryModal } from '../../hooks/useQueryModal';
import { CacheKey } from '../../types';
import ImageModal from '../Modal/ImageModal';
import EmptySection from '../shared/EmptySection';
import ImageCard from '../shared/ImageCard';
import LoadingGrid from '../ui/LoadingGrid';
import LoadMoreButton from '../ui/LoadMoreButton';
import TagList from '../ui/TagList';
import ToastMessage from '../ui/ToastMessage';

const IMAGES_LIMIT = 12;

/**
 * Home page component for displaying random cat images
 *
 * Fetches random cat images and displays them in a grid layout. Supports infinite image
 * fetching, breed filtering tags and image modal for a detailed view of an image.
 *
 * Data fetching:
 * During the initial load, it shows a loading grid. If no data is fetched during the initial
 * loading, either due to an error or because of an empty response, it shows an 'empty message'.
 * If an error occurs while fetching more images, it shows an error message along with the
 * Load More button. If at any point an error while fetching occurs, it shows a toast message.
 *
 * Breed filtering:
 * Supports filtering images by breed through a custom hook, by using the url query params
 * for the breed ids. Allows removing any selected breeds by clicking on the cloasble tags.
 * Currently there is no way to add breeds (only when navigating from the breeds page), and
 * the breed tags use the id instead of the name, but it does support multiple breed filtering
 * if passed manually (e.g. try passing in the url `/?breed=tang,beng`).
 */
const HomePage = () => {
  // Breed filtering

  const { formattedBreeds, removeBreed, breedIds } = useBreedFilter();

  // Modal handling

  const { paramValue: imageId, openModal, closeModal } = useQueryModal('image');

  const modalCacheContext: CacheKey = breedIds ? ['randomBreedImages', breedIds] : ['randomImages'];

  // Data fetching

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useFetchPaginatedImages({ breedId: breedIds });

  const isEmpty = !data?.pages?.[0]?.length; // At least the 1st page should have some data

  return (
    <main className="page images-page">
      <h1>Random Cat Images</h1>

      {/* Removable tags for selected breeds */}
      {formattedBreeds.length > 0 && (
        <TagList title="Selected Breeds" tags={formattedBreeds} onRemove={removeBreed} />
      )}

      {/* Floating toast message */}
      {isError && <ToastMessage message={`Error: ${error}`} />}

      {/* First page loading */}
      {isLoading && <LoadingGrid length={IMAGES_LIMIT} extraClasses="images-grid" />}

      {/* No fisrt page data was fetched, either due to error or empty */}
      {!isLoading && isEmpty && <EmptySection />}

      {/* Data for at least the first page is fetched */}
      {!isLoading && !isEmpty && (
        <>
          <section className="images-grid">
            {data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.map((image) => (
                  <ImageCard
                    key={image.id}
                    image={image}
                    caption={image.breeds[0]?.name}
                    handleImageClick={() => openModal(image.id)}
                  />
                ))}
              </Fragment>
            ))}
          </section>

          <LoadMoreButton
            isError={isError}
            onClick={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />

          <ImageModal imageId={imageId} onClose={closeModal} cacheContext={modalCacheContext} />
        </>
      )}
    </main>
  );
};

export default HomePage;
