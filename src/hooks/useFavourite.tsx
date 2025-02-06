import { useCallback } from 'react';

import { addFavourite, removeFavourite } from '../store/favouritesSlice';
import { CatImage } from '../types';
import { useAppDispatch, useAppSelector } from './useRedux';

/**
 * Hook to manage favourite status of an image
 *
 * - Provides the current favourite status of the image and a function to toggle it.
 */
export const useFavourites = (image: CatImage) => {
  const dispatch = useAppDispatch();
  const isFavourite = useAppSelector((state) =>
    state.favourites.images.some((favourite) => favourite.id === image.id)
  );

  const toggleFavourite = useCallback(() => {
    if (isFavourite) {
      dispatch(removeFavourite(image.id));
    } else {
      dispatch(addFavourite(image));
    }
  }, [dispatch, image, isFavourite]);

  return { isFavourite, toggleFavourite };
};
