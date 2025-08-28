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

// Importando os banners
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

  // Selecionar banner e logo baseado no projeto
  const projectBanner = projectId === 'thomaggio' ? thomaggioBanner : firecloudBanner;
  const projectLogo = projectId === 'thomaggio' ? thomaggioLogo : firecloudLogo;

  const handleCredentialClick = (credential: any) => {
    setSelectedCredential(credential);
    setModalOpen(true);
  };

  const toggleCredentials = () => {
    setExpandedCredentials(!expandedCredentials);
  };

  if (!project) {
    return (
      <Container>
        <Typography variant="h4">Projeto não encontrado</Typography>
      </Container>
    );
  }

  // Determinar quantas credenciais mostrar inicialmente
  const initialCredentials = project.credentials.slice(0, 1);
  const extraCredentials = project.credentials.slice(1);
  const showToggle = project.credentials.length > 1; // trocar > 2 por > 1


  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #e8edff 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Banner do Projeto */}
      <Box sx={{
        height: { xs: '200px', md: '300px' },
        backgroundImage: `url(${projectBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
          opacity: 0.9
        }
      }}>
        {/* Botão Voltar */}
        <Fade in={true} timeout={500}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            sx={{
              position: 'absolute',
              top: { xs: 16, md: 24 },
              left: { xs: 16, md: 24 },
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)'
              }
            }}
          >
            Voltar
          </Button>
        </Fade>

        {/* Logo e Título no Banner */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
          width: '100%',
          px: 3
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
            opacity: 0.9
          }}>
            <Box
              component="img"
              src={projectLogo}
              alt={`${project.title} Logo`}
              sx={{
                height: { xs: 80, md: 80 },
                width: 'auto',
                borderRadius: '50%'
              }}
            />
          </Box>

          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {project.title}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.1rem' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            {project.description}
          </Typography>
        </Box>
      </Box>

      {/* Conteúdo Principal */}
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Fade in={true} timeout={700}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mb: 4,
            alignItems: 'flex-start' // Alinha os cards ao topo
          }}>
            {/* Card de Acesso Rápido */}
            <Box sx={{
              width: { xs: '100%', md: '40%' },
            }}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Link color="primary" sx={{ mr: 2 }} />
                    <Typography variant="h5" fontWeight={600}>
                      Acesso Rápido
                    </Typography>
                  </Box>

                  <Stack spacing={2} sx={{ flex: 1, justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      href={project.demoUrl}
                      target="_blank"
                      fullWidth
                      size="large"
                      startIcon={<Launch />}
                      sx={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        py: 2,
                        fontSize: '1.1rem',
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
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
                          borderWidth: 2,
                          py: 2,
                          fontSize: '1.1rem',
                          '&:hover': {
                            borderWidth: 2
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

            {/* Card de Credenciais */}
            <Box sx={{
              width: { xs: '100%', md: '60%' },
            }}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <VpnKey color="primary" sx={{ mr: 2 }} />
                      <Typography variant="h5" fontWeight={600}>
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

                  <Stack spacing={2} sx={{ flex: 1 }}>
                    {/* Credenciais iniciais (sempre visíveis) */}
                    {initialCredentials.map((credential) => (
                      <Paper
                        key={credential.id}
                        elevation={1}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          border: `1px solid ${theme.palette.divider}`,
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[4],
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
                          <Chip
                            label="Usuário"
                            size="small"
                            variant="filled"
                            color="success"
                          />
                          <Chip
                            label="Senha"
                            size="small"
                            variant="filled"
                            color="success"
                          />
                        </Box>
                      </Paper>
                    ))}

                    {/* Credenciais extras (expandíveis) */}
                    {extraCredentials.length > 0 && (
                      <Collapse in={expandedCredentials}>
                        <Stack spacing={2}>
                          {extraCredentials.map((credential) => (
                            <Paper
                              key={credential.id}
                              elevation={1}
                              sx={{
                                p: 3,
                                borderRadius: 2,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                border: `1px solid ${theme.palette.divider}`,
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: theme.shadows[4],
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
                                <Chip
                                  label="Usuário"
                                  size="small"
                                  variant="filled"
                                  color="success"
                                />
                                <Chip
                                  label="Senha"
                                  size="small"
                                  variant="filled"
                                  color="success"
                                />
                              </Box>
                            </Paper>
                          ))}
                        </Stack>
                      </Collapse>
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