import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Alert
} from '@mui/material';

export default function TransferDialog({
  open,
  onClose,
  movie,
  studios,
  currentStudio,
  onTransfer,
  loading,
  error
}) {
  const [targetStudioId, setTargetStudioId] = useState('');

  // Reset selection when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setTargetStudioId('');
    }
  }, [open]);

  const handleTransfer = () => {
    onTransfer(movie.id, currentStudio.id, targetStudioId);
  };

  const availableStudios = studios.filter(studio => studio.id !== currentStudio?.id);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Transfer Movie Rights</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Movie: <strong>{movie?.name}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Current Studio: <strong>{currentStudio?.name}</strong>
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <FormControl fullWidth>
          <InputLabel>Transfer to Studio</InputLabel>
          <Select
            value={targetStudioId}
            label="Transfer to Studio"
            onChange={(e) => setTargetStudioId(e.target.value)}
            disabled={loading}
          >
            <MenuItem value="">
              <em>Select a studio</em>
            </MenuItem>
            {availableStudios.map((studio) => (
              <MenuItem key={studio.id} value={studio.id}>
                {studio.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleTransfer}
          variant="contained"
          disabled={!targetStudioId || loading}
        >
          Transfer
        </Button>
      </DialogActions>
    </Dialog>
  );
} 