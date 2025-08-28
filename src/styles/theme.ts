import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0f62fe',      // Azul IBM / moderno
      light: '#4d8dff',
      dark: '#0043ce',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00bfa5',      // Verde esmeralda
      light: '#5df2d6',
      dark: '#008e76',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f4f6f8',   // Cinza bem claro
      paper: '#ffffff',
    },
    text: {
      primary: '#212529',   // Quase preto
      secondary: '#5f6c80', // Cinza profissional
    },
    success: {
      main: '#2ecc71',      // Verde sucesso
    },
    warning: {
      main: '#f39c12',      // Laranja queimado
    },
    error: {
      main: '#e74c3c',      // Vermelho mais sério
    },
    info: {
      main: '#3498db',      // Azul claro pra info
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2 },
    h2: { fontWeight: 600, fontSize: '2rem', lineHeight: 1.3 },
    h3: { fontWeight: 600, fontSize: '1.75rem', lineHeight: 1.4 },
    h4: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.4 },
    h5: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.5 },
    h6: { fontWeight: 600, fontSize: '1.125rem', lineHeight: 1.5 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 16px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            boxShadow: '0 5px 12px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
          },
        },
      },
    },
  },
});


// Tema escuro (opcional para futuras implementações)
export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c8de8',
      light: '#939fea',
      dark: '#667eea',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8a5fb5',
      light: '#9d77c2',
      dark: '#764ba2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121826',
      paper: '#1a202c',
    },
    text: {
      primary: '#edf2f7',
      secondary: '#a0aec0',
    },
  },
});

export default theme;