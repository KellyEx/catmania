/**
 * Fetches data from the API
 *
 * Uses the fetch API to fetch data from the cat API. Since this is the central place for
 * fetching data, the key is hardcoded here for simplicity.
 * The function is generic, so it can be used to fetch any type of data from the API.
 *
 * Future enhancements:
 * - A try / catch block could be added to handle the error in a centralized place,
 *   e.g. for logging, and then propagate the error to the caller to be handled in the UI.
 * - The API key should be stored in a more secure way, e.g. in an environment variable.
 */
const API_KEY = 'live_HDKB1Eer2enLhJmdb8YhR4opJpM9sb8rgRgWpmd9kvoBf96FfiRjw27aorv0FaT3';

export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      'x-api-key': API_KEY,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch');

  const data: T = await response.json();

  return data;
};
