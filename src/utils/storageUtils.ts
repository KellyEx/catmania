/**
 * Storage Utilities
 *
 * Groups and encapsulates utility functions for interacting with the localStorage,
 * including methods for getting, setting, and removing items. Each method handles
 * and logs any errors, to fail gracefully, and ensures type safety by using generics,
 * where needed.
 */
export const storageUtils = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading localStorage key '${key}':`, error);
      return null;
    }
  },
  set: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key '${key}':`, error);
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key '${key}':`, error);
    }
  },
};
