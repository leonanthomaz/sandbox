import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  useTheme,
  Fade,
  Stack,
  alpha,
} from '@mui/material';
import {
  Launch,
  Description,
  Link as LinkIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material';
import { projectsData } from '../../data';
import { useGlobal } from '../../context/GlobalContext';
import { ProjectActionsCard } from '../../components/ProjectActionsCard';
import { ProjectHeader } from '../../components/Header';
import chatbotBanner from '@/assets/img/banner-chatbot.jpg';

export const ProjectView: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { isLoading } = useGlobal();
  
  const project = projectId ? projectsData[projectId as keyof typeof projectsData] : null;
  const isChatSandbox = projectId === 'chatbot';

  if (!project && !isChatSandbox && isLoading) {
    return (
      <Container sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <Typography variant="h4" color="textSecondary">
          Carregando projeto...
        </Typography>
      </Container>
    );
  }

  if (!project && !isChatSandbox) {
    return (
      <Container sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        textAlign: 'center'
      }}>
        <Typography variant="h4" color="error" gutterBottom>
          Projeto não encontrado
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Voltar ao Início
        </Button>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.98)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
      }}
    >
      {/* Header Component */}
      {isChatSandbox ? (
        <ProjectHeader
          title="Chatbot Sandbox"
          description="Ambiente de testes para desenvolvimento e validação de chatbots"
          backgroundImage={chatbotBanner}
          gradientColors={{
            start: theme.palette.primary.light,
            end: theme.palette.primary.dark
          }}
          isChatSandbox={true}
          backButton={{ text: 'Início', path: '/' }}
        />
      ) : project ? (
        <ProjectHeader
          title={project.title}
          description={project.description}
          backgroundImage={project.bannerImg}
          logo={project.logoImg}
          gradientColors={{
            start: theme.palette.primary.main,
            end: theme.palette.primary.dark
          }}
          backButton={{ 
              text: 'Voltar ao Projeto', 
              onClick: () => navigate(-1)
          }}
        />
      ) : null}

      {/* Conteúdo */}
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 4, md: 6 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Fade in timeout={800}>
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
                elevation={2}
                sx={{
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.background.paper, 0.8),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LinkIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
                    <Typography variant="h5" fontWeight={600}>
                      Acesso Rápido
                    </Typography>
                  </Box>

                  <Stack spacing={2}>
                    {isChatSandbox ? (
                      <>
                        <Button
                          variant="contained"
                          onClick={() => navigate('/sandbox/chat')}
                          fullWidth
                          size="large"
                          startIcon={<Launch />}
                          sx={{
                            py: 1.8,
                            fontSize: '1rem',
                            fontWeight: 600,
                            borderRadius: 2,
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: theme.palette.primary.dark,
                              transform: 'translateY(-2px)',
                              boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`
                            }
                          }}
                        >
                          Acessar Sandbox
                        </Button>
                        {
                          project?.githubUrl && (
                            <Button
                              variant="outlined"
                              href={`${project.githubUrl}`}
                              target="_blank"
                              fullWidth
                              size="large"
                              startIcon={<GitHubIcon />}
                              sx={{
                                py: 1.8,
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                borderWidth: 1.5,
                                borderColor: alpha(theme.palette.text.primary, 0.3),
                                color: theme.palette.text.primary,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  borderWidth: 1.5,
                                  transform: 'translateY(-2px)',
                                  borderColor: theme.palette.primary.main,
                                  color: theme.palette.primary.main,
                                  backgroundColor: alpha(theme.palette.primary.main, 0.04)
                                },
                              }}
                            >
                              Acessar Repositório
                            </Button>
                          )
                        }
                      </>
                      
                    ) : (
                      <>
                        {project?.demoUrl && (
                          <Button
                            variant="contained"
                            href={project.demoUrl}
                            target="_blank"
                            fullWidth
                            size="large"
                            startIcon={<Launch />}
                            sx={{
                              py: 1.8,
                              fontSize: '1rem',
                              fontWeight: 600,
                              borderRadius: 2,
                              backgroundColor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: theme.palette.secondary.main,
                                color: theme.palette.primary.contrastText,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`
                              }
                            }}
                          >
                            Acessar Site
                          </Button>
                        )}

                        {project?.apiDocs && (
                          <Button
                            variant="outlined"
                            href={project.apiDocs}
                            target="_blank"
                            fullWidth
                            size="large"
                            startIcon={<Description />}
                            sx={{
                              py: 1.8,
                              fontSize: '1rem',
                              fontWeight: 600,
                              borderRadius: 2,
                              borderWidth: 1.5,
                              borderColor: alpha(theme.palette.primary.light, 0.5),
                              color: theme.palette.primary.light,
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                borderWidth: 1.5,
                                transform: 'translateY(-2px)',
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                                backgroundColor: alpha(theme.palette.primary.main, 0.04)
                              }
                            }}
                          >
                            API Documentation
                          </Button>
                        )}

                        {
                          project?.githubUrl && (
                            <Button
                              variant="outlined"
                              href={`${project.githubUrl}`}
                              target="_blank"
                              fullWidth
                              size="large"
                              startIcon={<GitHubIcon />}
                              sx={{
                                py: 1.8,
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                borderWidth: 1.5,
                                borderColor: alpha(theme.palette.text.primary, 0.3),
                                color: theme.palette.text.primary,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  borderWidth: 1.5,
                                  transform: 'translateY(-2px)',
                                  borderColor: theme.palette.primary.main,
                                  color: theme.palette.primary.main,
                                  backgroundColor: alpha(theme.palette.primary.main, 0.04)
                                },
                              }}
                            >
                              Acessar Repositório
                            </Button>
                          )
                        }
                      </>
                    )}
                  </Stack>
                </CardContent>
              </Card>            
            </Box>

            {/* Card da Direita - Painel de Ações */}
            <Box sx={{ width: { xs: '100%', md: '60%' } }}>
              {projectId && (
                <ProjectActionsCard 
                  projectId={projectId} 
                  credentials={!isChatSandbox} 
                />
              )}
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};