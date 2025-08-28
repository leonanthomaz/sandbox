import { createTheme } from '@mui/material/styles';

// Paleta de cores moderna e profissional
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',       // Azul vibrante
      light: '#7c8de8',      // Azul claro
      dark: '#5a6fd8',       // Azul escuro
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#764ba2',       // Roxo elegante
      light: '#8a5fb5',      // Roxo claro
      dark: '#684190',       // Roxo escuro
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9ff',    // Fundo claro azulado
      paper: '#ffffff',      // Fundo de cards/paper
    },
    text: {
      primary: '#2d3748',    // Texto escuro
      secondary: '#718096',  // Texto cinza
    },
    grey: {
      50: '#f7fafc',
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#171923',
    },
    success: {
      main: '#48bb78',       // Verde
      light: '#68d391',
      dark: '#38a169',
    },
    warning: {
      main: '#ed8936',       // Laranja
      light: '#f6ad55',
      dark: '#dd6b20',
    },
    error: {
      main: '#f56565',       // Vermelho
      light: '#fc8181',
      dark: '#e53e3e',
    },
    info: {
      main: '#4299e1',       // Azul info
      light: '#63b3ed',
      dark: '#3182ce',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(''),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none', // Remove uppercase dos botões
    },
  },
  shape: {
    borderRadius: 8,         // Bordas arredondadas modernas
  },
  spacing: 8,                // Base de 8px para espaçamentos
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '3px solid #667eea',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
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