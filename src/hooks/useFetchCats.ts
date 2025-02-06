import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchData } from '../services/api';
import { BreedWithDetails, CatImage } from '../types';
import { buildImagesApiUrl } from '../utils/functions';

const PAGE_SIZE = 12; // Number of images per page
const MAX_PAGES = 30; // Arbitrary limit to avoid infinite scrolling

const CACHE_TIME_LONG = 1000 * 60 * 60 * 24; // 24 hours
const CACHE_TIME_SHORT = 1000 * 60 * 5; // 5 minutes
const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';

interface FetchImageParams {
  imageId?: string | null;
  image?: CatImage;
}

interface FetchImagesParams {
  breedId?: string | null;
  limit?: number;
  enabled?: boolean;
}

interface FetchPaginatedImagesParams {
  breedId?: string | null;
  pageSize?: number;
}

/**
 * Custom hooks for fetching cat breeds and images with react-query
 */

/**
 * Fetches cat breeds with details
 *
 * All breeds are fetched at once and stored in the cache, as the list of breeds is
 * relatively small, and they are cached under the same key, for a long time, as they
 * are unlikely to change frequently. Fetches only if the data is not already in the cache.
 */
export const useFetchBreeds = () => {
  const queryClient = useQueryClient();
  const url = BREEDS_URL;

  return useQuery<BreedWithDetails[]>({
    queryKey: ['breeds'],
    queryFn: () => fetchData<BreedWithDetails[]>(url),
    staleTime: CACHE_TIME_LONG,
    enabled: !queryClient.getQueryData(['breeds']), // Fetch only if data doesn't exist
  });
};

/**
 * Fetches a single cat image by id
 *
 * Allows passing an existing image object to avoid fetching if the image is already available.
 * If the image is provided, it stores it in the image cache with the imageId as the key,
 * so it can be accessed directly.
 *
 * The image id is optional, to handle the case where this hook runs in a render cycle where
 * the imageId is not yet available. In this case, the fetching is disabled.
 *
 * The image is stored in the cache for a long time, as the image is unlikely to change frequently.
 */
export const useFetchImage = ({ imageId, image }: FetchImageParams) => {
  const queryClient = useQueryClient();
  const url = buildImagesApiUrl({ endpoint: `${imageId}` });

  if (image && imageId) queryClient.setQueryData(['image', imageId], image); // Store if given

  return useQuery<CatImage>({
    queryKey: ['image', imageId || 'no-id'], // Use image id as the key or a placeholder if empty
    queryFn: async () => {
      const data = await fetchData<CatImage>(url);
      return { ...data, breeds: data.breeds ?? [] }; // Ensure breeds is always an array
    },
    staleTime: CACHE_TIME_LONG,
    enabled: Boolean(imageId), // Dont fetch if no image id provided
  });
};

/**
 * Fetches cat images with optional breed filtering
 *
 * Allows for limiting the number of images fetched and enabling / disabling the fetching,
 * e.g to avoid fetching if the breed data is not yet available.
 *
 * Is stored for a short time in the cache, as the images are likely to change frequently.
 */
export const useFetchImages = ({
  breedId,
  limit = PAGE_SIZE,
  enabled = true,
}: FetchImagesParams) => {
  const baseUrl = breedId
    ? buildImagesApiUrl({ params: { limit, breed_ids: breedId } })
    : buildImagesApiUrl({ params: { limit } });

  return useQuery<CatImage[], Error>({
    queryKey: breedId ? ['breedImages', breedId, limit] : ['images', limit],
    queryFn: () => fetchData<CatImage[]>(baseUrl),
    staleTime: CACHE_TIME_SHORT,
    enabled,
  });
};

/**
 * Fetches cat images with optional breed filtering in a paginated way
 *
 * Fetches images in pages, with a default but configurable page size. The query key
 * changes based on the breedId, to avoid conflicts between random and breed images.
 *
 * The getNextPageParam function is used to determine if the last page is reached, based
 * on the number of pages fetched so far. If the last page is reached or the maximum number
 * of pages is reached, it stops fetching more pages.
 *
 * NOTES:
 * - A sane limit on the number of pages is set to avoid DOM exploding, since there is no
 *   virtualization or windowing in the current implementation.
 * - Disabling the query when data is already in the cache is done to avoid refetching e.g.
 *   when navigating back.
 * - The `isLastPage` flag disables the button when the last page is reached, mainly for breed
 *   images. It is determined using a basic check on page size and the last page’s image count,
 *   not always precise but good enough to mimic API behavior.
 */
export const useFetchPaginatedImages = ({
  breedId,
  pageSize = PAGE_SIZE,
}: FetchPaginatedImagesParams) => {
  const queryClient = useQueryClient();
  const cacheKey: [string, string?] = breedId ? ['randomBreedImages', breedId] : ['randomImages'];
  const hasData = Boolean(queryClient.getQueryData(cacheKey));

  const url = breedId
    ? buildImagesApiUrl({ params: { limit: pageSize, breed_ids: breedId } })
    : buildImagesApiUrl({ params: { limit: pageSize } });

  return useInfiniteQuery<CatImage[], Error>({
    queryKey: cacheKey,
    queryFn: ({ pageParam = 1 }) => fetchData(`${url}&page=${pageParam}`), // Add page to the URL
    enabled: !hasData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const length = allPages.length + 1;
      const isMaxPages = length > MAX_PAGES;
      const isLastPage = lastPage.length < pageSize;
      return isLastPage || isMaxPages ? undefined : length;
    },
  });
};
