import { ReactElement, useRef, UIEvent } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import DeleteIcon from '@mui/icons-material/Delete';
import { Player } from '../types/commonTypes';
import { yellow, grey } from '@mui/material/colors';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';

const ListContainer = styled(Box)<{ background: string }>(({ background }) => ({
  flex: 1,
  height: '95%',
  margin: 10,
  backgroundColor: background,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}));

const StyledTableHead = styled(Box)(({ theme }) => ({
  padding: 10,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  height: '7%',
}));

interface PlayerListProps {
  listName: string;
  players: Player[];
  customBackground?: string;
  isLoading: boolean;
  children?: ReactElement;
  toggleFavorite: (player: Player) => void;
  handleScrollEnd?: () => void;
}

const PlayersList = ({
  listName,
  players,
  toggleFavorite,
  handleScrollEnd,
  customBackground = '#b2f3fc',
  isLoading,
  children,
}: PlayerListProps) => {
  const lastScrollPosition = useRef<number>(0);

  const handleScroll = (e: UIEvent) => {
    const element = e.target as HTMLDivElement;
    const isBottomReached =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 5;
    const isScrollingDown = element.scrollTop > lastScrollPosition.current;
    if (isBottomReached && isScrollingDown) {
      handleScrollEnd && handleScrollEnd();
    }
    lastScrollPosition.current = element.scrollTop;
  };

  return (
    <ListContainer background={customBackground}>
      <StyledTableHead>
        <Typography padding={1}>{listName}</Typography>

        {children}
      </StyledTableHead>
      <List
        sx={{
          overflow: 'auto',
          height: '88%',
        }}
        onScroll={handleScroll}
      >
        {players.map((player) => (
          <ListItem key={player.id}>
            <ListItemAvatar>
              <SportsBasketballIcon color={'warning'} />
            </ListItemAvatar>
            <ListItemText
              primary={`${player.first_name} ${player.last_name}`}
              secondary={player.team.name}
            />

            <IconButton edge='end' onClick={() => toggleFavorite(player)}>
              {listName === 'Favorites' ? (
                <DeleteIcon />
              ) : (
                <StarTwoToneIcon
                  sx={{ color: player.isFavorite ? yellow[800] : grey[500] }}
                />
              )}
            </IconButton>
          </ListItem>
        ))}
        {listName !== 'Favorites' && isLoading && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}
      </List>
    </ListContainer>
  );
};

export default PlayersList;
