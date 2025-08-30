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
import { ArrowBack } from '@mui/icons-material';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // pega a segunda parte da URL. Ex: /:projectId/credentials -> "credentials"
  const segments = location.pathname.split('/').filter(Boolean);
  const secondSegment = segments[1];
  const allowedPages = new Set(['tree', 'credentials']);
  const shouldShowBack = allowedPages.has(secondSegment || '');

  const background = backgroundImage
    ? `url(${backgroundImage})`
    : gradientColors
    ? `linear-gradient(135deg, ${gradientColors.start} 0%, ${gradientColors.end} 100%)`
    : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`;

  const overlayBackground = gradientColors
    ? `linear-gradient(135deg, ${alpha(gradientColors.start, 0.85)} 10%, ${alpha(gradientColors.end, 0.85)} 90%)`
    : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)} 10%, ${alpha(theme.palette.primary.dark, 0.8)} 90%)`;

  return (
    <Box
      sx={{
        height: { xs: '240px', md: '340px' },
        backgroundImage: background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: overlayBackground,
          opacity: isChatSandbox ? 0.92 : 0.88,
          backdropFilter: 'blur(8px)',
          zIndex: 0,
        }
      }}
    >
      {/* Botão Voltar (só aparece nas páginas mapeadas) */}
      {shouldShowBack && (
        <Fade in timeout={600}>
          <Button
            variant="contained"
            size="medium"
            onClick={backButton?.onClick || (() => backButton?.path && navigate(backButton.path))}
            startIcon={<ArrowBack />}
            sx={{
              position: 'absolute',
              top: { xs: 16, md: 24 },
              left: { xs: 16, md: 24 },
              color: theme.palette.getContrastText(theme.palette.primary.main),
              backgroundColor: alpha(theme.palette.background.paper, 0.2),
              backdropFilter: 'blur(10px)',
              fontWeight: 600,
              textTransform: 'none',
              px: 2.5,
              py: 1,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.primary.contrastText, 0.2)}`,
              zIndex: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.9),
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }
            }}
          >
            {isMobile ? 'Voltar' : backButton.text}
          </Button>
        </Fade>
      )}

      {/* Conteúdo central */}
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          color: theme.palette.getContrastText(gradientColors?.start || theme.palette.primary.main),
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
                height: { xs: 70, md: 120 },
                width: 'auto',
                borderRadius: '12%',
                boxShadow: `0 8px 32px rgba(0,0,0,0.2)`,
                border: `2px solid ${alpha(theme.palette.common.white, 0.3)}`,
                backgroundColor: alpha(theme.palette.common.white, 0.1),
                backdropFilter: 'blur(10px)',
                p: 1
              }}
            />
          </Box>
        )}

        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '3rem' },
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            color: theme.palette.common.white,
            lineHeight: 1.2,
            mb: 2
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            opacity: 0.9,
            fontSize: { xs: '1rem', md: '1.2rem' },
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            color: theme.palette.common.white,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.5
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};