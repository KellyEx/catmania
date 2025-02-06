import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useFavourites } from '../../hooks/useFavourite';
import { CatImage } from '../../types';
import FavouriteButton from '../ui/FavouriteButton';
import ShareButton from '../ui/ShareButton';

interface BaseProps {
  image: CatImage;
  showActions?: boolean;
  caption?: React.ReactNode; // TODO: Consider restricting to some html elements to ensure valid figcaption content
}

type ClickableProps =
  | { handleImageClick: () => void; linkTo?: never }
  | { linkTo: string; handleImageClick?: never }
  | { handleImageClick?: never; linkTo?: never };

type ImageCardProps = BaseProps & ClickableProps;

const FALLBACK_IMAGE_URL = './logo.svg';

/**
 * Display an image card with optional caption, actions and click handling
 *
 * This is a reusable component, to be used in various contexts, like images, breed images,
 * and favourites so it is designed to be highly customizable:
 *
 * - Displays an image with optionally displayed actions like sharing and favouriting, and
 *   optional caption, either as a string or a React node (be aware of figcaption content).
 * - Can be clickable to navigate to a different page or to trigger an action. Only one of
 *   handleImageClick or linkTo should be provided, to display the correct clickable element.
 * - Handles the image loading state and fallback image display. While loading, it will show
 *   a loading skeleton. Moreover, If no image url or invalid url is provided, it will
 *   display a fallback image.
 */
const ImageCard = ({
  image,
  caption,
  handleImageClick,
  linkTo,
  showActions = true,
}: ImageCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>(image.url || FALLBACK_IMAGE_URL);

  const isFallback = imageUrl === FALLBACK_IMAGE_URL;
  const imageClassName = isFallback ? 'image-fallback' : isLoading ? 'image-loading' : '';

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageUrl(FALLBACK_IMAGE_URL);
  };

  const { isFavourite, toggleFavourite } = useFavourites(image);

  return (
    <div className="image-card">
      {/* Don't show image actions if image does not exist */}
      {showActions && !isLoading && !isFallback && (
        <div className="actions">
          <ShareButton
            url={imageUrl}
            title={'Check this cat out!'}
            text={'cool cat'}
            extraClasses={'action-button'}
          />
          <FavouriteButton
            isFavourite={isFavourite}
            onClick={toggleFavourite}
            extraClasses={'action-button'}
          />
        </div>
      )}
      <figure className="image-wrapper">
        <img
          loading="lazy"
          src={imageUrl}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`image ${imageClassName}`.trim()}
          alt={typeof caption === 'string' ? caption : 'Cat image'}
        />

        {caption && <figcaption className="image-caption">{caption}</figcaption>}
      </figure>

      {handleImageClick && (
        <button
          className="clickable"
          title="view details"
          aria-label="view details"
          onClick={() => handleImageClick()}
        />
      )}

      {linkTo && (
        <Link to={linkTo} className="clickable" title="view details" aria-label="view details" />
      )}
    </div>
  );
};

export default ImageCard;
