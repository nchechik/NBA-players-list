import { useEffect, useRef, useState } from 'react';
import { Player } from '../types/commonTypes';
import { useFetch } from './useFetch';

interface FetchPlayersResult {
  allPlayers: Player[];
  searchedPlayers: Player[];
  isLoading: boolean;
  isLoadingSearch: boolean;
  fetchMorePlayers: () => void;
  searchPlayer: (text: string) => void;
}

export const useFetchPlayers = (): FetchPlayersResult => {
  const { data, isLoading, error, fetchData } = useFetch<Player>(
    'https://www.balldontlie.io/api/v1/players'
  );

  const {
    data: searchedPlayers,
    isLoading: isLoadingSearch,
    error: searchError,
    fetchData: fetchSearched,
  } = useFetch<Player>('https://www.balldontlie.io/api/v1/players');

  const [players, setPlayers] = useState<Player[]>([]);

  const pageNumber = useRef(1);

  useEffect(() => {
    fetchData(`page=1`);
  }, []);

  useEffect(() => {
    if (data?.length) {
      setPlayers((prev) => [...prev, ...data]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
    if (searchError) {
      alert(searchError);
    }
  }, [error, searchError]);

  const fetchMorePlayers = () => {
    pageNumber.current++;
    fetchData(`page=${pageNumber.current}`);
  };

  const searchPlayer = (text: string) => {
    fetchSearched(`search=${text}&per_page=100`);
  };

  return {
    allPlayers: players,
    searchedPlayers: searchedPlayers || [],
    isLoading,
    isLoadingSearch,
    fetchMorePlayers,
    searchPlayer,
  };
};
