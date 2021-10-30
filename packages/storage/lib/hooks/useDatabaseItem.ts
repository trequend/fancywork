import { useDatabase } from 'lib/components';
import { Database } from 'lib/database';
import { useEffect, useRef, useState } from 'react';

export function useDatabaseItem<T>(query: (database: Database) => Promise<T>) {
  const database = useDatabase();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [item, setItem] = useState<T>();

  const queryRef = useRef(query);

  useEffect(() => {
    const action = async () => {
      setLoading(true);
      try {
        const item = await queryRef.current(database);
        setLoading(false);
        setItem(item);
      } catch (error) {
        setLoading(false);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error');
        }
      }
    };

    action();
  }, [database]);

  return {
    item,
    error,
    loading,
  };
}