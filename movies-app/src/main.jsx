import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import App from './App.jsx'
import './index.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7B9EBF', // Soft steel blue
      light: '#A5C0DB',
      dark: '#567A9B',
    },
    secondary: {
      main: '#BF7B93', // Dusty rose
      light: '#D6A5B7',
      dark: '#8F5C6E',
    },
    background: {
      default: '#0A1929', // Deep midnight blue
      paper: '#132F4C', // Lighter midnight blue
    },
    text: {
      primary: '#E3E8EC', // Light blue-grey
      secondary: '#B2BAC2', // Muted blue-grey
    },
    divider: 'rgba(194, 224, 255, 0.08)',
    action: {
      active: '#8BB4DE',
      hover: 'rgba(139, 180, 222, 0.08)',
      selected: 'rgba(139, 180, 222, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#132F4C',
          '&:hover': {
            backgroundColor: '#173A5E',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0A1929',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#234567',
        },
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
