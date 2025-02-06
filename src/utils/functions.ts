const BASE_URL = 'https://api.thecatapi.com/v1/images';

interface BuildImagesApiUrlParams {
  endpoint?: string;
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * Builds the image fetching API URL with the given parameters
 *
 * This is a more generic url builder, since any passed query param can be added
 * to the URL. Therefore the caller should be responsible for passing the needed
 * params, based on the context.
 *
 * @param {Object} params - The parameters to build the URL
 * @param {string} params.endpoint - The endpoint to fetch from (e.g search, image_id)
 * @param {Object} params.params - The query parameters to add to the URL (e.g limit, breed_id)
 * @returns {string} - The images API URL
 */
export const buildImagesApiUrl = ({
  endpoint = 'search',
  params = {},
}: BuildImagesApiUrlParams): string => {
  const url = new URL(`${BASE_URL}/${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.append(key, String(value)); // Skip undefined
  });

  return url.toString();
};
