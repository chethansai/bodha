import { useEffect, useState } from 'react';

interface AsyncState<T> {
  data: T;
  error: string | null;
  loading: boolean;
  reload: () => Promise<void>;
}

export function useAsyncState<T>(
  factory: () => Promise<T>,
  deps: ReadonlyArray<unknown>,
  initialValue: T,
  fallbackError = 'Unable to load data.'
): AsyncState<T> {
  const [data, setData] = useState<T>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      setData(await factory());
    } catch {
      setError(fallbackError);
      setData(initialValue);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, deps);

  return {
    data,
    error,
    loading,
    reload: load,
  };
}