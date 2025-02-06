import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

interface FavouriteButtonProps {
  isFavourite: boolean;
  onClick: () => void;
  extraClasses?: string;
}

/**
 * A UI componet for favouriting an item
 *
 * - Displays heart icon, filled or outlined, based on the isFavourite prop.
 * - Accepts an onClick handler to toggle the favourite state.
 */
const FavouriteButton = ({ isFavourite, onClick, extraClasses }: FavouriteButtonProps) => {
  const favouriteButtonText = isFavourite ? 'remove from favourites' : 'add to favourites';
  const favouriteButtonIcon = isFavourite ? faHeartSolid : faHeart;

  return (
    <button
      className={`favourite ${extraClasses}`.trim()}
      title={favouriteButtonText}
      aria-label={favouriteButtonText}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={favouriteButtonIcon} />
    </button>
  );
};

export default memo(FavouriteButton);
