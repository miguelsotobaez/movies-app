import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Filters from '../Filters';

// Create a theme instance.
const theme = createTheme();

describe('Filters Component', () => {
  const mockFilters = {
    search: '',
    genre: ''
  };

  const mockOnFiltersChange = vi.fn();

  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    mockOnFiltersChange.mockClear();
  });

  it('renders search input and genre select', () => {
    renderWithTheme(
      <Filters filters={mockFilters} onFiltersChange={mockOnFiltersChange} />
    );

    expect(screen.getByLabelText('Search by title')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays current filter values', () => {
    const filtersWithValues = {
      search: 'Test Movie',
      genre: 1
    };

    renderWithTheme(
      <Filters filters={filtersWithValues} onFiltersChange={mockOnFiltersChange} />
    );

    expect(screen.getByDisplayValue('Test Movie')).toBeInTheDocument();
  });

  it('calls onFiltersChange when search input changes', () => {
    renderWithTheme(
      <Filters filters={mockFilters} onFiltersChange={mockOnFiltersChange} />
    );

    const searchInput = screen.getByLabelText('Search by title');
    fireEvent.change(searchInput, { target: { value: 'New Search' } });

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      search: 'New Search',
      genre: ''
    });
  });

  it('calls onFiltersChange when genre select changes', () => {
    renderWithTheme(
      <Filters filters={mockFilters} onFiltersChange={mockOnFiltersChange} />
    );

    const genreSelect = screen.getByRole('combobox');
    fireEvent.mouseDown(genreSelect);
    
    const heroesOption = screen.getByText('Heroes');
    fireEvent.click(heroesOption);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      search: '',
      genre: 1
    });
  });

  it('shows clear button when filters are applied', () => {
    const filtersWithValues = {
      search: 'Test',
      genre: 1
    };

    renderWithTheme(
      <Filters filters={filtersWithValues} onFiltersChange={mockOnFiltersChange} />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not show clear button when no filters are applied', () => {
    renderWithTheme(
      <Filters filters={mockFilters} onFiltersChange={mockOnFiltersChange} />
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('clears all filters when clear button is clicked', () => {
    const filtersWithValues = {
      search: 'Test',
      genre: 1
    };

    renderWithTheme(
      <Filters filters={filtersWithValues} onFiltersChange={mockOnFiltersChange} />
    );

    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      search: '',
      genre: ''
    });
  });

  it('renders all genre options', () => {
    renderWithTheme(
      <Filters filters={mockFilters} onFiltersChange={mockOnFiltersChange} />
    );

    const genreSelect = screen.getByRole('combobox');
    fireEvent.mouseDown(genreSelect);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Heroes')).toBeInTheDocument();
    expect(screen.getByText('Animation')).toBeInTheDocument();
    expect(screen.getByText('Horror')).toBeInTheDocument();
    expect(screen.getByText('Adventures')).toBeInTheDocument();
  });

  it('shows clear button when only search filter is applied', () => {
    const filtersWithSearch = {
      search: 'Test',
      genre: ''
    };

    renderWithTheme(
      <Filters filters={filtersWithSearch} onFiltersChange={mockOnFiltersChange} />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows clear button when only genre filter is applied', () => {
    const filtersWithGenre = {
      search: '',
      genre: 1
    };

    renderWithTheme(
      <Filters filters={filtersWithGenre} onFiltersChange={mockOnFiltersChange} />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
}); 