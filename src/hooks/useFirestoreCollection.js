import { useState, useEffect } from 'react';
import { fetchCollection } from '../services/firestore';

/**
 * Custom hook to subscribe to a Firestore collection.
 * Returns { data, loading, error, refresh }.
 */
export function useFirestoreCollection(collectionName, defaultData = []) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchCollection(collectionName);
      setData(result.length ? result : defaultData);
    } catch (err) {
      console.error(`[Hook] Error loading ${collectionName}:`, err);
      setError(err.message);
      setData(defaultData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [collectionName]);

  return { data, loading, error, refresh: loadData };
}

export default useFirestoreCollection;
