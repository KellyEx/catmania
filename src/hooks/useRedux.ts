import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../store';

/**
 * Place here all generic hooks
 */

/**
 * Pre-typed hooks for redux
 *
 * NOTES:
 * - Defining these types ensures accurately inferring the state and dispatch types,
 *   even as the store gets more complex over time (adding more state or middleware).
 * - Creating pre-typed custom hooks for useSelector and useDispatch helps avoiding
 *   redundant type annotations.
 *
 * See the redux documentation for more details
 * https://react-redux.js.org/using-react-redux/usage-with-typescript
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
