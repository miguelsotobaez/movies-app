import { Box, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const GENRE_MAP = {
  1: 'Heroes',
  4: 'Animation',
  6: 'Horror',
  9: 'Adventures'
};

export default function Filters({ filters, onFiltersChange }) {
  const handleChange = (field) => (event) => {
    onFiltersChange({
      ...filters,
      [field]: event.target.value
    });
  };

  const handleClear = () => {
    onFiltersChange({
      search: '',
      genre: ''
    });
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 2, 
      mb: 4, 
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      <TextField
        label="Search by title"
        variant="outlined"
        size="small"
        value={filters.search}
        onChange={handleChange('search')}
        sx={{ minWidth: 200 }}
      />
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={filters.genre}
          label="Genre"
          onChange={handleChange('genre')}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {Object.entries(GENRE_MAP).map(([id, name]) => (
            <MenuItem key={id} value={Number(id)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {(filters.search || filters.genre) && (
        <IconButton 
          onClick={handleClear}
          size="small"
          sx={{ ml: 1 }}
        >
          <ClearIcon />
        </IconButton>
      )}
    </Box>
  );
} 