import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  IconButton,
  Typography,
  Chip,
  Button,
  CircularProgress,
  alpha,
  useTheme,
  Tooltip,
  Fade
} from '@mui/material';
import {
  Refresh,
  OpenInNew,
  Fullscreen,
  FullscreenExit,
  Visibility,
  VisibilityOff,
  PlayArrow,
  Pause
} from '@mui/icons-material';

interface LiveDemoPreviewProps {
  projectId: string;
  demoUrl: string;
  projectTitle: string;
}

export const LiveDemoPreview: React.FC<LiveDemoPreviewProps> = ({
  projectId,
  demoUrl,
  projectTitle
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loadTime, setLoadTime] = useState<number | null>(null);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    setLoadTime(performance.now());
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const refresh = () => {
    setIsLoading(true);
    setHasError(false);
    setLoadTime(null);
  };

  const openInNewTab = () => {
    window.open(demoUrl, '_blank');
  };

  return (
    <Fade in timeout={1000}>
      <Card 
        sx={{ 
          mt: 4,
          border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`,
          backdropFilter: 'blur(10px)'
        }}
      >
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: isLoading ? '#ffd600' : hasError ? '#f44336' : '#4caf50',
                  animation: isLoading ? 'pulse 1.5s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 }
                  }
                }}
              />
              <Typography variant="h6" component="span">
                🚀 Preview ao Vivo
              </Typography>
              <Chip 
                label="Beta" 
                size="small" 
                color="primary" 
                variant="outlined"
              />
            </Box>
          }
          subheader={`Experimente o ${projectTitle} diretamente aqui`}
          action={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Recarregar">
                <IconButton onClick={refresh} size="small">
                  <Refresh />
                </IconButton>
              </Tooltip>
              <Tooltip title={isVisible ? "Ocultar preview" : "Mostrar preview"}>
                <IconButton onClick={toggleVisibility} size="small">
                  {isVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
              <Tooltip title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}>
                <IconButton onClick={toggleFullscreen} size="small">
                  {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Abrir em nova aba">
                <IconButton onClick={openInNewTab} size="small">
                  <OpenInNew />
                </IconButton>
              </Tooltip>
            </Box>
          }
        />
        
        <CardContent sx={{ p: 0 }}>
          {/* Status Bar */}
          <Box
            sx={{
              px: 3,
              py: 1,
              bgcolor: alpha(theme.palette.background.paper, 0.5),
              borderBottom: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {demoUrl}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {loadTime && (
                <Chip
                  label={`Carregado em ${(loadTime / 1000).toFixed(2)}s`}
                  size="small"
                  variant="outlined"
                />
              )}
              
              <Button
                size="small"
                startIcon={isPlaying ? <Pause /> : <PlayArrow />}
                onClick={togglePlay}
                variant="outlined"
              >
                {isPlaying ? 'Pausar' : 'Reproduzir'}
              </Button>
            </Box>
          </Box>

          {/* Preview Container */}
          <Box
            sx={{
              position: 'relative',
              height: isFullscreen ? '80vh' : 500,
              border: '2px solid',
              borderColor: 'divider',
              overflow: 'hidden',
              transition: 'height 0.3s ease'
            }}
          >
            {isLoading && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.paper',
                  zIndex: 10
                }}
              >
                <CircularProgress size={60} thickness={4} />
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                  Carregando {projectTitle}...
                </Typography>
              </Box>
            )}

            {hasError && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.paper',
                  zIndex: 10,
                  p: 3
                }}
              >
                <Typography color="error" gutterBottom>
                  ❌ Erro ao carregar o preview
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Não foi possível carregar a aplicação. Verifique se a URL está acessível.
                </Typography>
                <Button onClick={refresh} variant="outlined" sx={{ mt: 2 }}>
                  Tentar novamente
                </Button>
              </Box>
            )}

            {isVisible && !hasError && (
              <Box
                component="iframe"
                src={demoUrl}
                sx={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: isLoading ? 'none' : 'block',
                  transform: isPlaying ? 'none' : 'scale(0.98)',
                  opacity: isPlaying ? 1 : 0.7,
                  filter: isPlaying ? 'none' : 'grayscale(50%)',
                  transition: 'all 0.3s ease'
                }}
                onLoad={handleLoad}
                onError={handleError}
                title={`${projectTitle} Live Demo`}
                allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment"
                allowFullScreen
              />
            )}

            {!isVisible && (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.100',
                  backgroundImage: 'linear-gradient(45deg, #f5f5f5 25%, transparent 25%), linear-gradient(-45deg, #f5f5f5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f5f5f5 75%), linear-gradient(-45deg, transparent 75%, #f5f5f5 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <VisibilityOff sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Preview Oculto
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Clique no ícone de visibilidade para mostrar o preview
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* Controls Footer */}
          <Box
            sx={{
              px: 3,
              py: 2,
              bgcolor: alpha(theme.palette.background.paper, 0.5),
              borderTop: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {isPlaying ? 'Preview ativo' : 'Preview pausado'} • 
              {isVisible ? ' Visível' : ' Oculto'} • 
              {isFullscreen ? ' Tela cheia' : ' Tela normal'}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Este preview é uma simulação interativa">
                <Chip
                  label="Modo Sandbox"
                  size="small"
                  variant="outlined"
                  color="info"
                />
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};