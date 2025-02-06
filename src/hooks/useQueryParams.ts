import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Hook to manage query parameters in the URL
 *
 * - Provides stabilized functions to get, set and remove query params from the URL.
 * - Navigates to the updated URL after setting or removing a query param.
 */
export const useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const getParam = useCallback((key: string) => queryParams.get(key), [queryParams]);

  const setParam = useCallback(
    (key: string, value: string) => {
      queryParams.set(key, value);
      navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    },
    [location.pathname, queryParams, navigate]
  );

  const removeParam = useCallback(
    (key: string) => {
      queryParams.delete(key);
      navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    },
    [location.pathname, queryParams, navigate]
  );

  return { getParam, setParam, removeParam };
};
