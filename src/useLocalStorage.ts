import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook to manage localStorage with React state.
 * @template T
 * @param {string} key - The key to store the value under in localStorage.
 * @param {T} defaultValue - The default value to use if the key is not found in localStorage.
 * @returns {{ value: T, setValue: React.Dispatch<React.SetStateAction<T>>, removeItem: () => void }}
 */

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  removeItem: () => void;
}

const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): UseLocalStorageReturn<T> => {
  const getStoredValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return defaultValue;
    }
  }, [key, defaultValue]);

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeItem = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, defaultValue]);

  return {
    value: storedValue,
    setValue: setStoredValue,
    removeItem,
  };
};

export default useLocalStorage;
