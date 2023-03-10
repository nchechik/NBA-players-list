import { useState } from 'react';

interface FetchResult<T> {
  data: T[] | null;
  error: string;
  isLoading: boolean;
  fetchData: (params: string) => void;
}

export const useFetch = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = (params?: string) => {
    setIsLoading(true);
    fetch(params ? `${url}?${params}` : url)
      .then((res) => {
        res.json().then(({ data }: { data: T[] }) => {
          setData(data);
        });
      })
      .catch((err) => {
        setError(err || 'Unknown Error');
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { data, isLoading, error, fetchData };
};
