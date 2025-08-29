import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Typography,
  Button,
  Box,
  useTheme,
  Fade,
  alpha,
  useMediaQuery
} from '@mui/material';

interface BackButtonProps {
  text: string;
  path?: string;
  onClick?: () => void;
}

interface ProjectHeaderProps {
  title: string;
  description: string;
  logoImg?: string;
  bannerImg?: string;
  backgroundImage?: string;
  logo?: string;
  logoAlt?: string;
  backButton?: BackButtonProps;
  gradientColors?: {
    start: string;
    end: string;
  };
  isChatSandbox?: boolean;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  description,
  backgroundImage,
  logo,
  logoAlt,
  backButton = { text: 'Início', path: '/' },
  gradientColors,
  isChatSandbox = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // ✅ detecta mobile


  // pega a segunda parte da URL. Ex: /:projectId/credentials -> "credentials"
  const segments = location.pathname.split('/').filter(Boolean);
  const secondSegment = segments[1]; // [projectId, secondSegment, ...]
  const allowedPages = new Set(['tree', 'credentials']);
  const shouldShowBack = allowedPages.has(secondSegment || '');

  const background = backgroundImage
    ? `url(${backgroundImage})`
    : gradientColors
    ? `linear-gradient(135deg, ${gradientColors.start} 0%, ${gradientColors.end} 100%)`
    : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`;

  const overlayBackground = gradientColors
    ? `linear-gradient(135deg, ${alpha(gradientColors.start, 0.7)} 10%, ${alpha(gradientColors.end, 0.7)} 90%)`
    : `linear-gradient(135deg, ${theme.palette.background.default} 10%, ${theme.palette.background.paper} 90%)`;

  return (
    <Box
      sx={{
        height: { xs: '200px', md: '320px' },
        backgroundImage: background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: overlayBackground,
          opacity: isChatSandbox ? 0.9 : 0.8,
          backdropFilter: 'blur(10px)',
          zIndex: 0,
        }
      }}
    >

      
      {/* Botão Início (só aparece nas páginas mapeadas) */}
      {shouldShowBack && (
        <Fade in timeout={500}>
          <Button
            // botão pequeno e discreto
            variant="text"
            size="small"
            onClick={backButton?.onClick || (() => backButton?.path && navigate(backButton.path))}
            sx={{
              position: 'absolute',
              top: { xs: 12, md: 16 },
              left: { xs: 12, md: 16 },
              color: theme.palette.getContrastText(theme.palette.primary.main),
              border: `1px solid ${alpha(theme.palette.primary.dark, 0.5)}`,
              backgroundColor: theme.palette.primary.main, // ✅ cor sólida
              fontWeight: 600,
              textTransform: 'none',
              px: 1.25,
              minWidth: 'auto',
              lineHeight: 1.2,
              zIndex: 2,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                transform: 'translateY(-2px)'
              }
            }}
          >
            {isMobile ? 'Início' : 'Voltar ao início'}
          </Button>
        </Fade>
      )}

      {/* Logo e título */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: theme.palette.text.primary,
          width: '100%',
          px: 3,
          zIndex: 1,
        }}
      >
        {logo && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box
              component="img"
              src={logo}
              alt={logoAlt || `${title} Logo`}
              sx={{
                height: { xs: 80, md: 150 },
                width: 'auto',
                borderRadius: '10%',
                boxShadow: `0 8px 30px rgba(0,0,0,0.5)`,
                border: `3px solid ${theme.palette.primary.main}`,
              }}
            />
          </Box>
        )}

        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.8rem' },
            textShadow: '2px 2px 6px rgba(0,0,0,0.6)',
            color: isChatSandbox ? 'white' : theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            opacity: isChatSandbox ? 0.9 : 0.8,
            fontSize: { xs: '1rem', md: '1.15rem' },
            textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
            color: isChatSandbox ? 'white' : theme.palette.text.primary,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
