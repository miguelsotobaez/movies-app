import { useState, useEffect, useMemo } from 'react'
import { 
  Typography, 
  Box, 
  Grid, 
  CircularProgress,
  Chip,
  Stack,
  Snackbar,
  Alert
} from '@mui/material'
import { StyledCard, StyledContainer, MovieImage, MovieContent } from './styles'
import { fetchMovies, fetchStudios, transferMovie } from './services/api.js'
import Filters from './components/Filters'
import MovieCard from './components/MovieCard'
import TransferDialog from './components/TransferDialog'

const GENRE_MAP = {
  1: 'Heroes',
  4: 'Animation',
  6: 'Horror',
  9: 'Adventures'
};

function App() {
  const [movies, setMovies] = useState([])
  const [studios, setStudios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    genre: ''
  });

  // Transfer state
  const [transferDialog, setTransferDialog] = useState({
    open: false,
    movie: null,
    studio: null,
    loading: false,
    error: null
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesData, studiosData] = await Promise.all([
          fetchMovies(),
          fetchStudios()
        ]);
        setMovies(moviesData);
        setStudios(studiosData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      // Filter by title
      const matchesSearch = movie.name.toLowerCase().includes(filters.search.toLowerCase());
      
      // Filter by genre
      const matchesGenre = !filters.genre || movie.genre === filters.genre;

      return matchesSearch && matchesGenre;
    });
  }, [movies, filters]);

  const handleTransferClick = (movie, studio) => {
    console.log('Transfer clicked:', { movie, studio });
    if (!movie || !studio) {
      setNotification({
        open: true,
        message: 'Cannot transfer movie: Missing movie or studio information',
        severity: 'error'
      });
      return;
    }
    setTransferDialog({
      open: true,
      movie,
      studio,
      loading: false,
      error: null
    });
  };

  const handleTransferClose = () => {
    setTransferDialog(prev => ({
      ...prev,
      open: false,
      error: null
    }));
  };

  const handleTransfer = async (movieId, fromStudioId, toStudioId) => {
    console.log('Handling transfer:', { movieId, fromStudioId, toStudioId });
    
    // Validate required parameters
    if (!movieId || !fromStudioId || !toStudioId) {
      const error = 'Missing required transfer information';
      console.error(error, { movieId, fromStudioId, toStudioId });
      setTransferDialog(prev => ({
        ...prev,
        error,
        loading: false
      }));
      return;
    }

    setTransferDialog(prev => ({ ...prev, loading: true, error: null }));
    try {
      await transferMovie(movieId, fromStudioId, toStudioId);
      
      // Refresh data after transfer
      const [moviesData, studiosData] = await Promise.all([
        fetchMovies(),
        fetchStudios()
      ]);
      setMovies(moviesData);
      setStudios(studiosData);

      // Close dialog and show success notification
      setTransferDialog(prev => ({ ...prev, open: false, loading: false }));
      setNotification({
        open: true,
        message: 'Movie rights transferred successfully',
        severity: 'success'
      });
    } catch (err) {
      console.error('Transfer failed:', err);
      setTransferDialog(prev => ({
        ...prev,
        loading: false,
        error: err.message
      }));
    }
  };

  const handleNotificationClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const getStudioName = (studioId) => {
    const studio = studios.find(s => s.id === studioId);
    return studio ? studio.name : 'Unknown Studio';
  };

  const getStudioForMovie = (studioId) => {
    return studios.find(s => s.id === studioId);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <StyledContainer maxWidth={false}>
        <Typography 
          variant="h3" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 4,
            pt: 2
          }}
        >
          Movies Collection
        </Typography>

        <Filters 
          filters={filters}
          onFiltersChange={setFilters}
        />

        {filteredMovies.length === 0 ? (
          <Box display="flex" justifyContent="center" py={4}>
            <Typography color="text.secondary">
              No movies found matching your filters
            </Typography>
          </Box>
        ) : (
          <Grid 
            container 
            spacing={2}
            justifyContent="center"
            sx={{ 
              width: '100%',
              margin: '0 auto',
              px: { xs: 1, sm: 2, md: 3 }
            }}
          >
            {filteredMovies.map((movie) => (
              <Grid 
                key={movie.id}
                sx={{
                  width: {
                    xs: '50%',    // 2 cards por fila en móvil
                    sm: '33.33%', // 3 cards por fila en tablet
                    md: '25%',    // 4 cards por fila en desktop pequeño
                    lg: '20%',    // 5 cards por fila en desktop
                    xl: '16.66%'  // 6 cards por fila en pantallas grandes
                  },
                  maxWidth: '220px'
                }}
              >
                <MovieCard
                  movie={movie}
                  studio={getStudioForMovie(movie.studioId)}
                  onTransferClick={handleTransferClick}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <TransferDialog
          open={transferDialog.open}
          onClose={handleTransferClose}
          movie={transferDialog.movie}
          studios={studios}
          currentStudio={transferDialog.studio}
          onTransfer={handleTransfer}
          loading={transferDialog.loading}
          error={transferDialog.error}
        />

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleNotificationClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleNotificationClose} 
            severity={notification.severity}
            variant="filled"
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </StyledContainer>
    </Box>
  )
}

export default App
