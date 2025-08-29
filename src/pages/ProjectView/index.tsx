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
  Collapse,
  alpha
} from '@mui/material';
import {
  ArrowBack,
  Launch,
  Description,
  VpnKey,
  Link as LinkIcon,
  ExpandMore,
  ExpandLess,
  Chat as ChatIcon,
  // Code as CodeIcon
  GitHub as GitHubIcon
} from '@mui/icons-material';
import { projectsData } from '../../data';
import { CredentialsModal } from '../../components/CredentialsModal/CredentialsModal';

// Banners e logos
import thomaggioBanner from '@/assets/img/banner-thomaggio.jpg';
import firecloudBanner from '@/assets/img/banner-firecloud.jpg';
import thomaggioLogo from '@/assets/img/thomaggio.png';
import firecloudLogo from '@/assets/img/firecloud.png';
import { ProjectTreeView } from '../../components/TreeView';
import { LiveDemoPreview } from '../../components/LiveDemoPreview';

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

  // Verifica se é o sandbox do chatbot
  const isChatSandbox = projectId === 'chatbot';

  if (!project && !isChatSandbox) {
    return (
      <Container>
        <Typography variant="h4" color="error">Projeto não encontrado</Typography>
      </Container>
    );
  }

  const initialCredentials = project?.credentials?.slice(0, 1) || [];
  const extraCredentials = project?.credentials?.slice(1) || [];
  const showToggle = project?.credentials && project.credentials.length > 1;

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
          backgroundImage: isChatSandbox 
            ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
            : `url(${projectBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: isChatSandbox 
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.7)} 10%, ${alpha(theme.palette.secondary.dark, 0.7)} 90%)`
              : `linear-gradient(135deg, ${theme.palette.background.default} 10%, ${theme.palette.background.paper} 90%)`,
            opacity: isChatSandbox ? 0.9 : 0.8,
            backdropFilter: 'blur(10px)',
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
              color: theme.palette.text.primary,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              backdropFilter: 'blur(10px)',
              fontWeight: 600,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              '&:hover': {
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
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
            color: theme.palette.text.primary,
            width: '100%',
            px: 3,
            zIndex: 1,
          }}
        >
          {isChatSandbox ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <ChatIcon sx={{ fontSize: 80, color: 'white' }} />
              </Box>
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  textShadow: '2px 2px 6px rgba(0,0,0,0.6)',
                  color: 'white',
                }}
              >
                Chatbot Sandbox
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  opacity: 0.9,
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                  color: 'white',
                }}
              >
                Ambiente de testes para desenvolvimento e validação de chatbots
              </Typography>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box
                  component="img"
                  src={projectLogo}
                  alt={`${project?.title} Logo`}
                  sx={{
                    height: { xs: 80, md: 150 },
                    width: 'auto',
                    borderRadius: '10%',
                    boxShadow: `0 8px 30px rgba(0,0,0,0.5)`,
                    border: `3px solid ${theme.palette.primary.main}`,
                  }}
                />
              </Box>
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  textShadow: '2px 2px 6px rgba(0,0,0,0.6)',
                  color: theme.palette.text.primary,
                }}
              >
                {project?.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  opacity: 0.8,
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                }}
              >
                {project?.description}
              </Typography>
            </>
          )}
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
                    <LinkIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="h5" fontWeight={700}>
                      Acesso Rápido
                    </Typography>
                  </Box>

                  <Stack spacing={2}>
                    {isChatSandbox ? (
                      <Button
                        variant="contained"
                        onClick={() => navigate('/sandbox/chat')}
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
                            boxShadow: '0 6px 18px rgba(105, 240, 174, 0.4)'
                          }
                        }}
                      >
                        Acessar Sandbox
                      </Button>
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
                              py: 2,
                              fontSize: '1.05rem',
                              fontWeight: 700,
                              backgroundColor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                              '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 18px rgba(105, 240, 174, 0.4)'
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
                              py: 2,
                              fontSize: '1.05rem',
                              fontWeight: 700,
                              borderWidth: 2,
                              borderColor: theme.palette.primary.light,
                              color: theme.palette.primary.light,
                              '&:hover': {
                                borderWidth: 2,
                                transform: 'translateY(-2px)',
                                borderColor: theme.palette.primary.main
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
                                py: 2,
                                fontSize: '1.05rem',
                                fontWeight: 700,
                                borderColor: theme.palette.text.primary,
                                color: theme.palette.text.primary,
                                '&:hover': {
                                  borderWidth: 2,
                                  transform: 'translateY(-2px)',
                                  borderColor: theme.palette.primary.main,
                                  color: theme.palette.primary.main
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

            {/* Card da Direita - Credenciais ou Info do Sandbox */}
            <Box sx={{ width: { xs: '100%', md: '60%' } }}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[6],
                  height: '100%'
                }}
              >
                <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                  {isChatSandbox ? (
                    // Conteúdo do Sandbox
                    <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                      <ChatIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2, mx: 'auto' }} />
                      
                      <Typography variant="h5" fontWeight={700} gutterBottom>
                        Ambiente de Desenvolvimento
                      </Typography>
                      
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Sandbox dedicado para testar e validar funcionalidades de chatbot
                        com interface dividida entre conversação e visualização de dados.
                      </Typography>

                      <Stack spacing={1} sx={{ mb: 3, textAlign: 'left' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mr: 2 }} />
                          <Typography variant="body2">Interface de chat em tempo real</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mr: 2 }} />
                          <Typography variant="body2">Visualização de logs e métricas</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mr: 2 }} />
                          <Typography variant="body2">Teste de diferentes cenários</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mr: 2 }} />
                          <Typography variant="body2">Debug e análise de performance</Typography>
                        </Box>
                      </Stack>

                     
                    </Box>
                  ) : (
                    // Credenciais (layout original)
                    <>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        {/* Lado esquerdo: ícone + título */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <VpnKey color="primary" sx={{ mr: 2 }} />
                          <Typography variant="h5" fontWeight={700}>
                            Credenciais de Teste
                          </Typography>
                        </Box>

                        {/* Lado direito: botão painel + toggle */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              if (project?.dashboardUrl) {
                                window.open(project.dashboardUrl, "_blank"); // abre em nova aba
                              } else {
                                navigate("/"); // fallback interno
                              }
                            }}
                            size="small"
                            startIcon={<Launch />}
                            sx={{
                              py: 1,
                              px: 2,
                              fontSize: "0.95rem",
                              fontWeight: 700,
                              backgroundColor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                              "&:hover": {
                                backgroundColor: theme.palette.primary.dark,
                                transform: "translateY(-2px)",
                                boxShadow: "0 6px 18px rgba(105, 240, 174, 0.4)",
                              },
                            }}
                          >
                            Ir para Adm
                          </Button>


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
                      </Box>


                      <Stack spacing={2}>
                        <Collapse in={true} timeout="auto" unmountOnExit>
                          {[...initialCredentials].map((credential) => (
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
                                  color="secondary"
                                  variant="outlined"
                                  clickable
                                />
                              </Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {credential.description}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip label="Usuário" size="small" variant="filled" color="primary" />
                                <Chip label="Senha" size="small" variant="filled" color="primary" />
                              </Box>
                            </Paper>
                          ))}
                        </Collapse>
                        <Collapse in={expandedCredentials} timeout="auto" unmountOnExit>
                          <Stack spacing={2}>
                            {extraCredentials.map((credential) => (
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
                                    color="secondary"
                                    variant="outlined"
                                    clickable
                                  />
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                  {credential.description}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                  <Chip label="Usuário" size="small" variant="filled" color="primary" />
                                  <Chip label="Senha" size="small" variant="filled" color="primary" />
                                </Box>
                              </Paper>
                            ))}
                          </Stack>
                        </Collapse>
                      </Stack>
                    </>
                  )}
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Fade>
        
        {project?.tree && (
          <Box sx={{ mt: 4 }}>
            <ProjectTreeView 
              data={project.tree} 
              projectName={project.title} 
            />
          </Box>
        )}

        {project?.demoUrl && !isChatSandbox && (
          <LiveDemoPreview
            projectId={project.id}
            demoUrl={project.demoUrl}
            projectTitle={project.title}
          />
        )}

        <CredentialsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          credentials={selectedCredential ? [selectedCredential] : []}
          projectName={project?.title || ''}
        />
      </Container>
    </Box>
  );
};