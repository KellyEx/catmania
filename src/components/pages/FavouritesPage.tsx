import { useState } from 'react';

import { useQueryModal } from '../../hooks/useQueryModal';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { clearFavourites } from '../../store/favouritesSlice';
import ImageModal from '../Modal/ImageModal';
import EmptySection from '../shared/EmptySection';
import ImageCard from '../shared/ImageCard';

/**
 * Favourite images page component
 *
 * - Displays a grid of favourite images. Supports image modal for detailed view.
 * - Allows removing images from favourites, but keeps the initially displayed images
 *   in the grid until the page is refreshed, in case the user wants to undo the action.
 * - If there are no favourite images, it shows an empty message.
 * - Supports clearing all favourites at once, with a confirmation dialog if there are any.
 */
const FavouritesPage = () => {
  const dispatch = useAppDispatch();

  // Favourites data

  const favouritesFromState = useAppSelector((state) => state.favourites.images);

  const [displayedFavourites] = useState(favouritesFromState);

  // Modal Handling

  const { paramValue: imageId, openModal, closeModal } = useQueryModal('image');

  // Clearing

  const handleClearFavourites = () => {
    if (confirm('Are you sure?')) dispatch(clearFavourites());
  };

  return (
    <main className="page favourites-page">
      <h1 className="main-title">My Favourite Images</h1>

      {displayedFavourites.length > 0 ? (
        <>
          <button
            className="button-link clear-favourites"
            title="clear favourites"
            aria-label="clear favourites"
            onClick={handleClearFavourites}
            disabled={favouritesFromState.length === 0}
          >
            Clear Favourites
          </button>

          <section className="images-grid">
            {displayedFavourites.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                caption={image.breeds[0]?.name}
                handleImageClick={() => openModal(image.id)}
              />
            ))}
          </section>

          <ImageModal imageId={imageId} onClose={closeModal} />
        </>
      ) : (
        <EmptySection type="no-favourites" />
      )}
    </main>
  );
};

export default FavouritesPage;
