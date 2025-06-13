import { Typography, Chip, Box, IconButton, Tooltip } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { StyledCard, MovieImage, MovieContent } from '../styles';
import { useState } from 'react';

const GENRE_MAP = {
  1: 'Heroes',
  4: 'Animation',
  6: 'Horror',
  9: 'Adventures'
};

const FALLBACK_IMAGE = 'https://placehold.co/220x327/png';

export default function MovieCard({ movie, studio, onTransferClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <StyledCard>
      <MovieImage
        src={imgError ? FALLBACK_IMAGE : (movie.img || FALLBACK_IMAGE)}
        alt={movie.name}
        onError={() => setImgError(true)}
      />
      <MovieContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          width: '100%'
        }}>
          <Tooltip title={movie.name}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.2,
                minHeight: '2.4em'
              }}
            >
              {movie.name}
            </Typography>
          </Tooltip>
          <Tooltip title="Transfer movie rights">
            <IconButton 
              size="small" 
              onClick={() => {
                console.log('Transfer clicked for movie:', movie);
                if (!movie || !movie.id) {
                  console.error('Invalid movie data:', movie);
                  return;
                }
                onTransferClick(movie, studio);
              }}
              sx={{ 
                ml: 1,
                mt: -0.5,
                flexShrink: 0
              }}
            >
              <SwapHorizIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 0.5,
          mt: 'auto'
        }}>
          <Chip
            label={GENRE_MAP[movie.genre] || 'Unknown'}
            size="small"
            color="primary"
            sx={{ alignSelf: 'flex-start' }}
          />
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {studio?.name || 'Unknown Studio'}
          </Typography>
        </Box>
      </MovieContent>
    </StyledCard>
  );
} 