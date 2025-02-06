import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CatImage } from '../types';
import { storageUtils } from '../utils/storageUtils';

interface FavouritesState {
  images: CatImage[];
}

const STORAGE_KEY = 'favourite_images';

const initialState: FavouritesState = {
  images: storageUtils.get<CatImage[]>(STORAGE_KEY) || [],
};

/**
 * Favourites Slice
 *
 * Manages the state of the user's favourite images. Allows adding, removing and
 * clearing all favourite images, while persisting the state to the local storage,
 * in order to keep the data between sessions.

 * NOTE:
 * In a real-world scenario, favourites would likely be persisted the backend,
 * using async actions (e.g. using createAsyncThunk) to handle the requests. But
 * for the sake of this project, I'm keeping it simple and using the local storage
 * for persistence. This would also work along with the fetching, to show relevant
 * data when loading, even before fetching.
 */
const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<CatImage>) => {
      state.images.push(action.payload);
      storageUtils.set(STORAGE_KEY, state.images);
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter((cat) => cat.id !== action.payload);
      storageUtils.set(STORAGE_KEY, state.images);
    },
    clearFavourites: (state) => {
      state.images = [];
      storageUtils.remove(STORAGE_KEY);
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
