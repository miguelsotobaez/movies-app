import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import TransferDialog from '../TransferDialog';

// Create a theme instance.
const theme = createTheme();

describe('TransferDialog Component', () => {
  const mockMovie = {
    id: '1',
    name: 'Test Movie'
  };

  const mockCurrentStudio = {
    id: '1',
    name: 'Current Studio'
  };

  const mockStudios = [
    { id: '1', name: 'Current Studio' },
    { id: '2', name: 'Target Studio 1' },
    { id: '3', name: 'Target Studio 2' }
  ];

  const mockOnClose = vi.fn();
  const mockOnTransfer = vi.fn();

  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnTransfer.mockClear();
  });

  it('renders dialog when open is true', () => {
    renderWithTheme(
      <TransferDialog
        open={true}
        onClose={mockOnClose}
        movie={mockMovie}
        studios={mockStudios}
        currentStudio={mockCurrentStudio}
        onTransfer={mockOnTransfer}
        loading={false}
        error={null}
      />
    );

    expect(screen.getByText('Transfer Movie Rights')).toBeInTheDocument();
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Current Studio')).toBeInTheDocument();
  });

  it('does not render dialog when open is false', () => {
    renderWithTheme(
      <TransferDialog
        open={false}
        onClose={mockOnClose}
        movie={mockMovie}
        studios={mockStudios}
        currentStudio={mockCurrentStudio}
        onTransfer={mockOnTransfer}
        loading={false}
        error={null}
      />
    );

    expect(screen.queryByText('Transfer Movie Rights')).not.toBeInTheDocument();
  });

  it('displays movie and current studio information', () => {
    renderWithTheme(
      <TransferDialog
        open={true}
        onClose={mockOnClose}
        movie={mockMovie}
        studios={mockStudios}
        currentStudio={mockCurrentStudio}
        onTransfer={mockOnTransfer}
        loading={false}
        error={null}
      />
    );

    expect(screen.getByText('Movie:')).toBeInTheDocument();
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Current Studio:')).toBeInTheDocument();
    expect(screen.getByText('Current Studio')).toBeInTheDocument();
  });

  it('shows available studios in select dropdown', async () => {
    renderWithTheme(
      <TransferDialog
        open={true}
        onClose={mockOnClose}
        movie={mockMovie}
        studios={mockStudios}
        currentStudio={mockCurrentStudio}
        onTransfer={mockOnTransfer}
        loading={false}
        error={null}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    await waitFor(() => {
      expect(screen.getByText('Target Studio 1')).toBeInTheDocument();
      expect(screen.getByText('Target Studio 2')).toBeInTheDocument();
      // Check that we have the correct number of options (Select a studio + 2 target studios)
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(3); // "Select a studio" + 2 target studios
    });
  });

  it('calls onClose when Cancel button is clicked', () => {
    renderWithTheme(
      <TransferDialog
        open={true}
        onClose={mockOnClose}
        movie={mockMovie}
        studios={mockStudios}
        currentStudio={mockCurrentStudio}
        onTransfer={mockOnTransfer}
        loading={false}
        error={null}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('disables Transfer button when no studio is selected', () => {
    renderWithTheme(
      <TransferDialog
        open={true}
        onClose={mockOnClose}
        movie={mockMovie}
        studios={mockStudios}
        currentStudio={mockCurrentStudio}
        onTransfer={mockOnTransfer}
        loading={false}
        error={null}
      />
    );

    const transferButton = screen.getByText('Transfer');
    expect(transferButton).toBeDisabled();
  });

  it('enables Transfer button when studio is selected', async () => {
    renderWithTheme(
      <TransferDialog
        open={true}
        onClose={mockOnClose}
        movie={mockMovie}
        studios={mockStudios}
        currentStudio={mockCurrentStudio}
        onTransfer={mockOnTransfer}
        loading={false}
        error={null}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const targetStudio = await screen.findByText('Target Studio 1');
    fireEvent.click(targetStudio);

    const transferButton = screen.getByText('Transfer');
    expect(transferButton).not.toBeDisabled();
  });

  it('calls onTransfer with correct parameters when Transfer button is clicked', async () => {
    renderWithTheme(
      <TransferDialog
        open={true}
        onClose={mockOnClose}
        movie={mockMovie}
        studios={mockStudios}
        currentStudio={mockCurrentStudio}
        onTransfer={mockOnTransfer}
        loading={false}
        error={null}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const targetStudio = await screen.findByText('Target Studio 1');
    fireEvent.click(targetStudio);

    const transferButton = screen.getByText('Transfer');
    fireEvent.click(transferButton);

    expect(mockOnTransfer).toHaveBeenCalledWith('1', '1', '2');
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'Transfer failed';

    renderWithTheme(
      <TransferDialog
        open={true}
        onClose={mockOnClose}
        movie={mockMovie}
        studios={mockStudios}
        currentStudio={mockCurrentStudio}
        onTransfer={mockOnTransfer}
        loading={false}
        error={errorMessage}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('disables buttons and select when loading is true', () => {
    renderWithTheme(
      <TransferDialog
        open={true}
        onClose={mockOnClose}
        movie={mockMovie}
        studios={mockStudios}
        currentStudio={mockCurrentStudio}
        onTransfer={mockOnTransfer}
        loading={true}
        error={null}
      />
    );

    expect(screen.getByText('Cancel')).toBeDisabled();
    expect(screen.getByText('Transfer')).toBeDisabled();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true');
  });

  it('handles missing movie gracefully', () => {
    renderWithTheme(
      <TransferDialog
        open={true}
        onClose={mockOnClose}
        movie={null}
        studios={mockStudios}
        currentStudio={mockCurrentStudio}
        onTransfer={mockOnTransfer}
        loading={false}
        error={null}
      />
    );

    expect(screen.getByText('Transfer Movie Rights')).toBeInTheDocument();
  });

  it('handles missing current studio gracefully', () => {
    renderWithTheme(
      <TransferDialog
        open={true}
        onClose={mockOnClose}
        movie={mockMovie}
        studios={mockStudios}
        currentStudio={null}
        onTransfer={mockOnTransfer}
        loading={false}
        error={null}
      />
    );

    expect(screen.getByText('Transfer Movie Rights')).toBeInTheDocument();
  });

  it('resets selection when dialog closes and reopens', async () => {
    const { rerender } = renderWithTheme(
      <TransferDialog
        open={true}
        onClose={mockOnClose}
        movie={mockMovie}
        studios={mockStudios}
        currentStudio={mockCurrentStudio}
        onTransfer={mockOnTransfer}
        loading={false}
        error={null}
      />
    );

    // Select a studio
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    const targetStudio = await screen.findByText('Target Studio 1');
    fireEvent.click(targetStudio);

    // Close dialog
    rerender(
      <TransferDialog
        open={false}
        onClose={mockOnClose}
        movie={mockMovie}
        studios={mockStudios}
        currentStudio={mockCurrentStudio}
        onTransfer={mockOnTransfer}
        loading={false}
        error={null}
      />
    );

    // Reopen dialog
    rerender(
      <TransferDialog
        open={true}
        onClose={mockOnClose}
        movie={mockMovie}
        studios={mockStudios}
        currentStudio={mockCurrentStudio}
        onTransfer={mockOnTransfer}
        loading={false}
        error={null}
      />
    );

    // Transfer button should be disabled again
    const transferButton = screen.getByText('Transfer');
    expect(transferButton).toBeDisabled();
  });
}); 