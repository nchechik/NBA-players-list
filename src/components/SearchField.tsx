import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Dispatch, SetStateAction } from 'react';

interface SearchFieldProps {
  setSearchText: Dispatch<SetStateAction<string>>;
  searchPlayer: () => void;
}

const SearchField = ({ setSearchText, searchPlayer }: SearchFieldProps) => {
  return (
    <Paper>
      <InputBase
        onChange={(
          event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => setSearchText(event.target.value)}
        onKeyDown={(event: React.KeyboardEvent) =>
          event.key === 'Enter' && searchPlayer()
        }
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search...'
      />
      <IconButton sx={{ p: 1.1 }} onClick={searchPlayer}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchField;
