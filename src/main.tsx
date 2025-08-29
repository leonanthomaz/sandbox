import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.tsx'
import theme from './styles/theme'
import './styles/global.css'
import { GlobalProvider } from './context/GlobalContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ThemeProvider>
  </StrictMode>,
)