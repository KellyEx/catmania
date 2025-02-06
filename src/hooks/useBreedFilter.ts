import { useCallback, useMemo } from 'react';

import { useQueryParams } from './useQueryParams';

/**
 * Hook to manage the breed filtering
 *
 * - Gets the selected breeds from the URL query params as comma-separated values.
 * - Extracts the selected breeds as an array of strings and formats them as an array'
 *   of objects with id and display label.
 * - Provides a function for removing a breed from the selected breeds and updating
 *   the URL accordingly.
 *
 * Future enhancements:
 * - The breeds could be fetched and accessed here to get the display labels, and
 *   possibly provide search or multi-select functionality.
 */
export const useBreedFilter = () => {
  const { getParam, setParam, removeParam } = useQueryParams();

  const breedIds = getParam('breed');

  const breeds = useMemo(() => breedIds?.split(',') || [], [breedIds]);

  const formattedBreeds = useMemo(
    () => breeds.map((breed) => ({ id: breed, label: breed })),
    [breeds]
  );

  const removeBreed = useCallback(
    (breedToRemove: string) => {
      const updatedBreeds = breeds.filter((breed) => breed !== breedToRemove);

      if (updatedBreeds.length > 0) {
        setParam('breed', updatedBreeds.join(','));
      } else {
        removeParam('breed');
      }
    },
    [breeds, setParam, removeParam]
  );

  return { formattedBreeds, removeBreed, breedIds };
};
