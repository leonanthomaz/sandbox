import { createTheme, alpha } from '@mui/material/styles';

const useMuiTheme = createTheme({
  palette: {
    primary: {
      main: '#FFEB3B', // Amarelo vibrante de volta como primary
      light: '#FFF59D',
      dark: '#FBC02D',
      contrastText: '#121212',
    },
    secondary: {
      main: '#ffffff', // Branco/cinza claro como secundário
      light: '#f5f5f5',
      dark: '#e0e0e0',
      contrastText: '#121212',
    },
    background: {
      default: '#0A0A0A',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#9E9E9E',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    h1: { fontSize: '3rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: '2rem', fontWeight: 500, lineHeight: 1.4 },
    h4: { fontSize: '1.5rem', fontWeight: 500 },
    h5: { fontSize: '1.25rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 500 },
    body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0A0A0A',
          color: '#E0E0E0',
          fontFamily: `'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '10px',
          fontWeight: 600,
          padding: '10px 28px',
          transition: 'all 0.3s ease',
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: '#FFEB3B',
            color: '#121212',
            '&:hover': {
              backgroundColor: '#FBC02D',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 15px rgba(255, 235, 59, 0.4)',
            },
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(12px)',
          color: '#FFEB3B',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1A1A1A',
          color: '#FFEB3B',
          borderRight: `1px solid ${alpha('#FFEB3B', 0.1)}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 16,
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.05)',
          transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 45px rgba(0,0,0,0.25)',
            border: '1px solid #FFEB3B',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...useMuiTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFEB3B',
      light: '#FFF59D',
      dark: '#FBC02D',
      contrastText: '#121212',
    },
    secondary: {
      main: '#1E1E1E',
      light: '#2A2A2A',
      dark: '#121212',
      contrastText: '#FFEB3B',
    },
    background: {
      default: '#0A0A0A',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#9E9E9E',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
});

export default useMuiTheme;