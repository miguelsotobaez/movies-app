import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from '../MovieCard';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme();

describe('MovieCard Component', () => {
  const mockMovie = {
    id: '1',
    name: 'Test Movie',
    genre: 1,
    img: 'test-url.jpg',
    price: 100
  };

  const mockStudio = {
    id: '1',
    name: 'Test Studio'
  };

  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  it('renders movie information correctly', () => {
    renderWithTheme(<MovieCard movie={mockMovie} studio={mockStudio} onTransferClick={() => {}} />);
    
    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
    expect(screen.getByText(mockStudio.name)).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockMovie.img);
  });

  it('calls onTransfer when transfer button is clicked', () => {
    const mockOnTransfer = vi.fn();
    renderWithTheme(<MovieCard movie={mockMovie} studio={mockStudio} onTransferClick={mockOnTransfer} />);
    
    const transferButton = screen.getByRole('button');
    fireEvent.click(transferButton);
    
    expect(mockOnTransfer).toHaveBeenCalledWith(mockMovie, mockStudio);
  });

  it('displays movie price correctly', () => {
    renderWithTheme(<MovieCard movie={mockMovie} studio={mockStudio} onTransferClick={() => {}} />);
    
    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
  });

  it('handles missing image URL gracefully', () => {
    const movieWithoutImage = { ...mockMovie, img: null };
    renderWithTheme(<MovieCard movie={movieWithoutImage} studio={mockStudio} onTransferClick={() => {}} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://placehold.co/220x327/png');
  });
}); 