import { useCallback } from 'react';

import { useQueryParams } from './useQueryParams';

/**
 * Hook to manage a modal state in the URL query params
 *
 * - Gets the value from the given query param (e.g. 'breed' or 'image').
 * - Provides functions to open and close the modal by updating the URL.
 */
export const useQueryModal = (paramKey: string) => {
  const { getParam, setParam, removeParam } = useQueryParams();
  const paramValue = getParam(paramKey);

  const openModal = useCallback((id: string) => setParam(paramKey, id), [setParam, paramKey]);
  const closeModal = useCallback(() => removeParam(paramKey), [removeParam, paramKey]);

  return { paramValue, openModal, closeModal };
};
