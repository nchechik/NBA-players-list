import { useEffect, useState } from 'react';
import { Player } from '../types/commonTypes';
import PlayersList from './PlayersList';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SearchField from './SearchField';
import { useFetchPlayers } from '../hooks/useFetchPlayers';
import { MuiColorInput } from 'mui-color-input';

const StyledMainContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#e4e4e4d4',
  width: '100%',
  display: 'flex',
  height: window.innerHeight,
  overflow: 'hidden',
}));

const MainView = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [favoritesPlayers, setFavoritesPlayers] = useState<Player[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [backgroundColor, setBackroundColor] = useState<string>('#dd831bad');

  const {
    allPlayers,
    searchedPlayers,
    isLoading,
    fetchMorePlayers,
    searchPlayer,
  } = useFetchPlayers();

  useEffect(() => {
    setPlayers(
      (searchText ? searchedPlayers : allPlayers).map((player) => ({
        ...player,
        isFavorite: favoritesPlayers.some(
          (favoritePlayer) => player.id === favoritePlayer.id
        ),
      }))
    );
  }, [favoritesPlayers, allPlayers, searchText, searchedPlayers]);

  useEffect(() => {
    !searchText && searchPlayer('not_existing_player_for_reset');
  }, [searchText]);

  const toggleFavoritePlayer = (player: Player) => {
    setFavoritesPlayers((prev) =>
      player.isFavorite
        ? prev.filter((favoritePlayer) => player.id !== favoritePlayer.id)
        : [...prev, { ...player, isFavorite: true }]
    );
  };

  return (
    <StyledMainContainer>
      <PlayersList
        players={players}
        isLoading={isLoading}
        handleScrollEnd={fetchMorePlayers}
        toggleFavorite={toggleFavoritePlayer}
        listName='NBA Players'
      >
        <SearchField
          setSearchText={setSearchText}
          searchPlayer={() => searchPlayer(searchText)}
        />
      </PlayersList>
      <PlayersList
        listName='Favorites'
        customBackground={backgroundColor}
        isLoading={isLoading}
        players={favoritesPlayers}
        toggleFavorite={toggleFavoritePlayer}
      >
        <MuiColorInput
          value={backgroundColor}
          onChange={setBackroundColor}
          sx={{ backgroundColor: '#b2f3fc63' }}
        />
      </PlayersList>
    </StyledMainContainer>
  );
};

export default MainView;
