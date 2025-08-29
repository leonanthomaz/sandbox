import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  useTheme,
  Stack,
  alpha,
  IconButton,
  Tooltip,
  Chip,
  Divider
} from '@mui/material';
import {
  Launch,
  GitHub,
  Description,
  ZoomIn,
  ZoomOut,
  Link as LinkIcon
} from '@mui/icons-material';
import { projectsData } from '../../data';
import { useGlobal } from '../../context/GlobalContext';
import { ProjectTreeView } from '../../components/TreeView';
import { ProjectHeader } from '../../components/Header';
import { TreeNotFoundError } from '../../components/ErrorDisplay';

// Componente para a página da árvore do projeto
export const ProjectTreePage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { setLoading } = useGlobal();
  const [zoom, setZoom] = useState(1);

  const project = projectId ? projectsData[projectId as keyof typeof projectsData] : null;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!project) {
    return (
      <Container>
        <Typography variant="h4" color="error">Projeto não encontrado</Typography>
      </Container>
    );
  }

  if (!project.tree) {
    return <TreeNotFoundError projectId={projectId ?? ''} />;
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(1.5, prev + 0.1));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(0.7, prev - 0.1));
  };

  // Função auxiliar para contar itens por tipo
  const countItems = (nodes: any[], type: string): number => {
    return nodes.reduce((count, node) => {
      if (node.type === type) count++;
      if (node.children) count += countItems(node.children, type);
      return count;
    }, 0);
  };

  // Função auxiliar para contar todos os itens
  const countTotalItems = (nodes: any[]): number => {
    return nodes.reduce((count, node) => {
      count++;
      if (node.children) count += countTotalItems(node.children);
      return count;
    }, 0);
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
        title="Arquitetura do Projeto"
        description={`${project.title} - Visualização da estrutura de arquivos e componentes`}
        backgroundImage={project.bannerImg}
        logo={project.logoImg}
        gradientColors={{
            start: theme.palette.secondary.main,
            end: theme.palette.secondary.dark
        }}
        backButton={{ 
            text: 'Voltar ao Projeto', 
            onClick: () => navigate(-1) // volta uma página no histórico
        }}
    />

      {/* Conteúdo Principal */}
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          {/* Coluna de Informações */}
          <Box sx={{ width: { xs: '100%', md: '35%' } }}>
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
                  <LinkIcon color="primary" sx={{ mr: 2 }} />
                  <Typography variant="h5" fontWeight={700}>
                    Informações do Projeto
                  </Typography>
                </Box>

                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Nome do Projeto
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {project.title}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Descrição
                    </Typography>
                    <Typography variant="body1">
                      {project.description}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Tecnologias Principais
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {project.tree
                        .flatMap(node => node.technologies || [])
                        .filter((tech, index, arr) => arr.indexOf(tech) === index)
                        .slice(0, 5)
                        .map(tech => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        ))}
                    </Box>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={2}>
                  {project.githubUrl && (
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<GitHub />}
                      href={project.githubUrl}
                      target="_blank"
                      sx={{
                        justifyContent: 'flex-start',
                        borderRadius: 2,
                      }}
                    >
                      Ver Repositório
                    </Button>
                  )}

                  {project.demoUrl && (
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Launch />}
                      href={project.demoUrl}
                      target="_blank"
                      sx={{
                        justifyContent: 'flex-start',
                        borderRadius: 2,
                      }}
                    >
                      Acessar Demo
                    </Button>
                  )}

                  {project.apiDocs && (
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Description />}
                      href={project.apiDocs}
                      target="_blank"
                      sx={{
                        justifyContent: 'flex-start',
                        borderRadius: 2,
                      }}
                    >
                      Documentação da API
                    </Button>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Box>

          {/* Coluna da Árvore */}
          <Box sx={{ width: { xs: '100%', md: '65%' } }}>
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
                {/* Cabeçalho da Árvore */}
                <Box sx={{ 
                  p: 3, 
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LinkIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="h5" fontWeight={700}>
                      Estrutura do Projeto
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Zoom Out">
                      <IconButton 
                        size="small" 
                        onClick={handleZoomOut}
                        disabled={zoom <= 0.7}
                        sx={{ 
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: 1
                        }}
                      >
                        <ZoomOut />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Zoom In">
                      <IconButton 
                        size="small" 
                        onClick={handleZoomIn}
                        disabled={zoom >= 1.5}
                        sx={{ 
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: 1
                        }}
                      >
                        <ZoomIn />
                      </IconButton>
                    </Tooltip>

                    <Chip
                      label={`${Math.round(zoom * 100)}%`}
                      variant="outlined"
                      size="small"
                      sx={{ minWidth: 60 }}
                    />
                  </Box>
                </Box>

                {/* Árvore */}
                <Box sx={{ 
                  p: 3, 
                  flex: 1, 
                  overflow: 'auto',
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left',
                  transition: 'transform 0.3s ease',
                  minHeight: '500px'
                }}>
                  <ProjectTreeView 
                    data={project.tree} 
                    projectName={project.title} 
                  />
                </Box>

                {/* Rodapé com Estatísticas */}
                <Box sx={{ 
                  p: 2, 
                  borderTop: `1px solid ${theme.palette.divider}`,
                  bgcolor: alpha(theme.palette.primary.main, 0.03)
                }}>
                  <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap">
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Pastas
                      </Typography>
                      <Typography variant="h6" fontWeight={700} color="primary">
                        {countItems(project.tree, 'folder')}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Arquivos
                      </Typography>
                      <Typography variant="h6" fontWeight={700} color="secondary">
                        {countItems(project.tree, 'file')}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Serviços
                      </Typography>
                      <Typography variant="h6" fontWeight={700} color="info.main">
                        {countItems(project.tree, 'service')}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Total
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        {countTotalItems(project.tree)}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};