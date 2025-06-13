import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Avatar,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { MovieCard, MovieGrid, FilterContainer } from './styles';
import { getMovies, getStudios } from './services/api';

const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg';

function App() {
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    title: '',
    genre: '',
    studio: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesData, studiosData] = await Promise.all([
          getMovies(),
          getStudios(),
        ]);
        setMovies(moviesData);
        setStudios(studiosData);
      } catch (err) {
        setError('Error loading data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredMovies = movies.filter(movie => {
    return (
      movie.name.toLowerCase().includes(filters.title.toLowerCase()) &&
      (!filters.genre || movie.genre === filters.genre) &&
      (!filters.studio || movie.studioId === filters.studio)
    );
  });

  const uniqueGenres = [...new Set(movies.map(movie => movie.genre))];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mt: 4 }}>
        Movie Collection
      </Typography>

      <FilterContainer>
        <TextField
          label="Search by title"
          name="title"
          value={filters.title}
          onChange={handleFilterChange}
          fullWidth
        />
        <TextField
          select
          label="Filter by genre"
          name="genre"
          value={filters.genre}
          onChange={handleFilterChange}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {uniqueGenres.map(genre => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Filter by studio"
          name="studio"
          value={filters.studio}
          onChange={handleFilterChange}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {studios.map(studio => (
            <MenuItem key={studio.id} value={studio.id}>
              {studio.name}
            </MenuItem>
          ))}
        </TextField>
      </FilterContainer>

      <MovieGrid>
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id}>
            <Avatar
              alt={movie.name}
              src={movie.img || defaultAvatar}
              sx={{ width: 280, height: 280 }}
            />
            <Typography variant="h6" component="h2">
              {movie.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {movie.genre}
            </Typography>
            <Typography variant="body2">
              Studio: {studios.find(s => s.id === movie.studioId)?.name}
            </Typography>
          </MovieCard>
        ))}
      </MovieGrid>
    </Container>
  );
}

export default App; 