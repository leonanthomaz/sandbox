import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Chip,
  useTheme,
  Fade,
  Paper,
  Stack,
  Collapse
} from '@mui/material';
import {
  ArrowBack,
  Launch,
  Description,
  VpnKey,
  Link,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { projectsData } from '../../utils';
import { CredentialsModal } from '../../components/CredentialsModal/CredentialsModal';

// Banners e logos
import thomaggioBanner from '@/assets/img/banner-thomaggio.jpg';
import firecloudBanner from '@/assets/img/banner-firecloud.jpg';
import thomaggioLogo from '@/assets/img/thomaggio.png';
import firecloudLogo from '@/assets/img/firecloud.png';

export const ProjectView: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState<any>(null);
  const [expandedCredentials, setExpandedCredentials] = useState(false);

  const project = projectId ? projectsData[projectId as keyof typeof projectsData] : null;

  const projectBanner = projectId === 'thomaggio' ? thomaggioBanner : firecloudBanner;
  const projectLogo = projectId === 'thomaggio' ? thomaggioLogo : firecloudLogo;

  const handleCredentialClick = (credential: any) => {
    setSelectedCredential(credential);
    setModalOpen(true);
  };

  const toggleCredentials = () => setExpandedCredentials(!expandedCredentials);

  if (!project) {
    return (
      <Container>
        <Typography variant="h4" color="error">Projeto não encontrado</Typography>
      </Container>
    );
  }

  const initialCredentials = project.credentials.slice(0, 1);
  const extraCredentials = project.credentials.slice(1);
  const showToggle = project.credentials.length > 1;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Banner */}
      <Box
        sx={{
          height: { xs: '200px', md: '320px' },
          backgroundImage: `url(${projectBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            opacity: 0.85
          }
        }}
      >
        {/* Botão Voltar */}
        <Fade in timeout={500}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            sx={{
              position: 'absolute',
              top: { xs: 16, md: 24 },
              left: { xs: 16, md: 24 },
              color: theme.palette.primary.contrastText,
              backgroundColor: 'rgba(51, 245, 245, 0.69)',
              backdropFilter: 'blur(6px)',
              fontWeight: 600,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.6)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Início
          </Button>
        </Fade>

        {/* Logo e título */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: theme.palette.primary.contrastText,
            width: '100%',
            px: 3
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box
              component="img"
              src={projectLogo}
              alt={`${project.title} Logo`}
              sx={{
                height: { xs: 80, md: 90 },
                width: 'auto',
                borderRadius: '50%',
                boxShadow: `0 8px 24px rgba(0,0,0,0.5)`
              }}
            />
          </Box>

          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.8rem' },
              textShadow: '2px 2px 6px rgba(0,0,0,0.6)'
            }}
          >
            {project.title}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.15rem' },
              textShadow: '1px 1px 3px rgba(0,0,0,0.6)'
            }}
          >
            {project.description}
          </Typography>
        </Box>
      </Box>

      {/* Conteúdo */}
      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Fade in timeout={700}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              mb: 4,
              alignItems: 'flex-start'
            }}
          >
            {/* Acesso Rápido */}
            <Box sx={{ width: { xs: '100%', md: '40%' } }}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[6]
                }}
              >
                <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Link color="primary" sx={{ mr: 2 }} />
                    <Typography variant="h5" fontWeight={700}>
                      Acesso Rápido
                    </Typography>
                  </Box>

                  <Stack spacing={2}>
                    <Button
                      variant="contained"
                      href={project.demoUrl}
                      target="_blank"
                      fullWidth
                      size="large"
                      startIcon={<Launch />}
                      sx={{
                        py: 2,
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 18px rgba(255,235,59,0.3)'
                        }
                      }}
                    >
                      Acessar Site
                    </Button>

                    {project.apiDocs && (
                      <Button
                        variant="outlined"
                        href={project.apiDocs}
                        target="_blank"
                        fullWidth
                        size="large"
                        startIcon={<Description />}
                        sx={{
                          py: 2,
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          borderWidth: 2,
                          '&:hover': {
                            borderWidth: 2,
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        API Documentation
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Box>

            {/* Credenciais */}
            <Box sx={{ width: { xs: '100%', md: '60%' } }}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[6]
                }}
              >
                <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <VpnKey color="primary" sx={{ mr: 2 }} />
                      <Typography variant="h5" fontWeight={700}>
                        Credenciais de Teste
                      </Typography>
                    </Box>

                    {showToggle && (
                      <Button
                        onClick={toggleCredentials}
                        sx={{
                          color: theme.palette.primary.main,
                          textTransform: 'none',
                          fontWeight: 600,
                          '&:hover': { backgroundColor: 'transparent' }
                        }}
                        endIcon={expandedCredentials ? <ExpandLess /> : <ExpandMore />}
                      >
                        {expandedCredentials ? 'Ver menos' : 'Ver mais'}
                      </Button>
                    )}
                  </Box>

                  <Stack spacing={2}>
                    {[...initialCredentials, ...(expandedCredentials ? extraCredentials : [])].map(
                      (credential) => (
                        <Paper
                          key={credential.id}
                          elevation={2}
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                            border: `1px solid ${theme.palette.divider}`,
                            bgcolor: theme.palette.background.default,
                            '&:hover': {
                              transform: 'translateY(-3px)',
                              boxShadow: theme.shadows[6],
                              borderColor: theme.palette.primary.light
                            }
                          }}
                          onClick={() => handleCredentialClick(credential)}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                            <Typography variant="h6" fontWeight={600}>
                              {credential.role}
                            </Typography>
                            <Chip
                              label="Ver credenciais"
                              size="small"
                              color="primary"
                              variant="outlined"
                              clickable
                            />
                          </Box>

                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {credential.description}
                          </Typography>

                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip label="Usuário" size="small" variant="filled" color="success" />
                            <Chip label="Senha" size="small" variant="filled" color="success" />
                          </Box>
                        </Paper>
                      )
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Fade>

        <CredentialsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          credentials={selectedCredential ? [selectedCredential] : []}
          projectName={project.title}
        />
      </Container>
    </Box>
  );
};
