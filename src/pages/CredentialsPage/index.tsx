import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  useTheme,
  Paper,
  Stack,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Launch,
  VpnKey,
  Visibility,
  VisibilityOff,
  ContentCopy,
  CheckCircle,
  AdminPanelSettings,
  Public,
  Refresh
} from '@mui/icons-material';
import { projectsData } from '../../data';
import { useGlobal } from '../../context/GlobalContext';
import { ProjectHeader } from '../../components/Header';
import Loading from '../../components/Loading';

export const CredentialsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { isLoading } = useGlobal();
  const [activeTab, setActiveTab] = useState(0);
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});
  const [viewMode, setViewMode] = useState<'site' | 'admin'>('site');
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({});

  const project = projectId ? projectsData[projectId as keyof typeof projectsData] : null;

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (!project) {
    return (
      <Container>
        <Typography variant="h4" color="error">Projeto não encontrado</Typography>
      </Container>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    console.log(event)
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({...copiedStates, [id]: true});
    setTimeout(() => {
      setCopiedStates({...copiedStates, [id]: false});
    }, 2000);
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords({...showPasswords, [id]: !showPasswords[id]});
  };

  const getDemoUrl = () => {
    return viewMode === 'site' ? project.demoUrl : project.dashboardUrl;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Cabeçalho */}
      <ProjectHeader
        title="Testar Credenciais"
        description={`${project.title} - Acesse o ambiente com as credenciais de teste`}
        backgroundImage={project.bannerImg}
        logo={project.logoImg}
        gradientColors={{
          start: theme.palette.primary.main,
          end: theme.palette.primary.dark
        }}
        backButton={{ 
            text: 'Voltar ao Projeto', 
            onClick: () => navigate(-1) // volta uma página no histórico
        }}
      />

      {/* Conteúdo Principal */}
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          {/* Coluna de Credenciais */}
          <Box sx={{ width: { xs: '100%', md: '41.6667%' } }}>
            <Card
              elevation={4}
              sx={{
                borderRadius: 3,
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                position: 'sticky',
                top: 20,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <VpnKey color="primary" sx={{ mr: 2, fontSize: 32 }} />
                  <Typography variant="h5" fontWeight={700}>
                    Credenciais de Teste
                  </Typography>
                </Box>

                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{ mb: 3 }}
                >
                  {project.credentials?.map((credential) => (
                    <Tab 
                      key={credential.id} 
                      label={credential.role} 
                      sx={{ 
                        fontWeight: 600,
                        borderRadius: 1,
                        '&.Mui-selected': {
                          color: theme.palette.primary.main
                        }
                      }}
                    />
                  ))}
                </Tabs>

                {project.credentials?.map((credential, index) => (
                  <Box 
                    key={credential.id} 
                    sx={{ 
                      display: activeTab === index ? 'block' : 'none',
                      animation: 'fadeIn 0.5s ease-in'
                    }}
                  >
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      {credential.description}
                    </Typography>

                    <Stack spacing={2}>
                      {/* Usuário */}
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: `1px solid ${theme.palette.divider}`,
                          bgcolor: theme.palette.background.default,
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" fontWeight={600} color="text.secondary">
                            Usuário
                          </Typography>
                          <Tooltip title={copiedStates[`user-${credential.id}`] ? "Copiado!" : "Copiar usuário"}>
                            <IconButton
                              size="small"
                              onClick={() => handleCopy(credential.username, `user-${credential.id}`)}
                              sx={{ color: theme.palette.primary.main }}
                            >
                              {copiedStates[`user-${credential.id}`] ? <CheckCircle fontSize="small" /> : <ContentCopy fontSize="small" />}
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Typography variant="body1" fontWeight={600}>
                          {credential.username}
                        </Typography>
                      </Paper>

                      {/* Senha */}
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: `1px solid ${theme.palette.divider}`,
                          bgcolor: theme.palette.background.default,
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" fontWeight={600} color="text.secondary">
                            Senha
                          </Typography>
                          <Box>
                            <Tooltip title={showPasswords[credential.id] ? "Ocultar senha" : "Mostrar senha"}>
                              <IconButton
                                size="small"
                                onClick={() => togglePasswordVisibility(credential.id)}
                                sx={{ color: theme.palette.primary.main, mr: 1 }}
                              >
                                {showPasswords[credential.id] ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={copiedStates[`pass-${credential.id}`] ? "Copiado!" : "Copiar senha"}>
                              <IconButton
                                size="small"
                                onClick={() => handleCopy(credential.password, `pass-${credential.id}`)}
                                sx={{ color: theme.palette.primary.main }}
                              >
                                {copiedStates[`pass-${credential.id}`] ? <CheckCircle fontSize="small" /> : <ContentCopy fontSize="small" />}
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                        <Typography variant="body1" fontWeight={600} fontFamily="Monospace">
                          {showPasswords[credential.id] ? credential.password : '•'.repeat(12)}
                        </Typography>
                      </Paper>
                    </Stack>

                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      startIcon={<Launch />}
                      onClick={() => window.open(getDemoUrl(), '_blank')}
                      sx={{
                        mt: 3,
                        py: 1.5,
                        fontWeight: 700,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 6px 18px ${theme.palette.primary.main}60`,
                        },
                      }}
                    >
                      Acessar com estas Credenciais
                    </Button>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>

          {/* Coluna de Visualização ao Vivo */}
          <Box sx={{ width: { xs: '100%', md: '58.3333%' } }}>
            <Card
              elevation={4}
              sx={{
                borderRadius: 3,
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <CardContent sx={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Cabeçalho da Visualização */}
                <Box sx={{ 
                  p: 3, 
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Visibility color="primary" sx={{ mr: 2 }} />
                    <Typography variant="h5" fontWeight={700}>
                      Visualização ao Vivo
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Recarregar visualização">
                      <IconButton 
                        onClick={() => {
                          const iframe = document.getElementById('live-preview') as HTMLIFrameElement | null;
                          iframe?.contentWindow?.location.reload();
                        }}
                        sx={{ color: theme.palette.primary.main }}
                      >
                        <Refresh />
                      </IconButton>
                    </Tooltip>
                    <Button
                      variant={viewMode === 'site' ? 'contained' : 'outlined'}
                      size="small"
                      startIcon={<Public />}
                      onClick={() => setViewMode('site')}
                      sx={{ 
                        borderRadius: 2,
                        fontWeight: 600,
                        ...(viewMode === 'site' ? {
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        } : {})
                      }}
                    >
                      Site
                    </Button>
                    <Button
                      variant={viewMode === 'admin' ? 'contained' : 'outlined'}
                      size="small"
                      startIcon={<AdminPanelSettings />}
                      onClick={() => setViewMode('admin')}
                      sx={{ 
                        borderRadius: 2,
                        fontWeight: 600,
                        ...(viewMode === 'admin' ? {
                          background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                        } : {})
                      }}
                    >
                      Administração
                    </Button>
                  </Box>
                </Box>

                {/* Iframe de Visualização */}
                <Box sx={{ 
                  flex: 1, 
                  position: 'relative',
                  minHeight: '500px'
                }}>
                  {getDemoUrl() ? (
                    <iframe
                      id="live-preview"
                      src={getDemoUrl()}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        minHeight: '500px'
                      }}
                      title="Visualização ao vivo"
                    />
                  ) : (
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '100%',
                      p: 4,
                      textAlign: 'center'
                    }}>
                      <VisibilityOff sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        Visualização não disponível
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {viewMode === 'site' 
                          ? 'O URL de demonstração não está configurado para este projeto.' 
                          : 'O painel administrativo não está configurado para este projeto.'}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => navigate(`/${projectId}`)}
                        sx={{ borderRadius: 2 }}
                      >
                        Voltar para o projeto
                      </Button>
                    </Box>
                  )}
                </Box>

                {/* Rodapé com ações */}
                <Box sx={{ 
                  p: 2, 
                  borderTop: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    {viewMode === 'site' ? 'Visualizando o site' : 'Visualizando o painel administrativo'}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Launch />}
                      href={getDemoUrl() || '#'}
                      target="_blank"
                      disabled={!getDemoUrl()}
                      sx={{ borderRadius: 2 }}
                    >
                      Abrir em Nova Janela
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<VpnKey />}
                      onClick={() => {
                        const credential = project.credentials?.[activeTab];
                        if (credential) {
                          navigator.clipboard.writeText(
                            `Usuário: ${credential.username}\nSenha: ${credential.password}`
                          );
                        }
                      }}
                      sx={{ 
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                      }}
                    >
                      Copiar Credenciais
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
};