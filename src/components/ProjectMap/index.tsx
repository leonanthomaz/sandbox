import React from 'react';
import {
  Box,
  Paper,
  Typography,
  useTheme,
  Fade,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Folder,
  Code,
  Storage,
  Api,
  Psychology,
  DesignServices,
  ZoomIn,
  ZoomOut
} from '@mui/icons-material';

interface ProjectNode {
  id: string;
  label: string;
  type: 'folder' | 'file' | 'service' | 'api' | 'ai' | 'design';
  children?: ProjectNode[];
  description?: string;
  tech?: string[];
}

interface ProjectTreeProps {
  projectId: string;
}

export const ProjectTree: React.FC<ProjectTreeProps> = ({ projectId }) => {
  const theme = useTheme();
  const [zoom, setZoom] = React.useState(1);

  // Dados da árvore do projeto (exemplo para Thomaggio)
  const projectStructure: Record<string, ProjectNode> = {
    thomaggio: {
      id: 'root',
      label: 'Thomaggio',
      type: 'folder',
      description: 'Plataforma de delivery premium',
      children: [
        {
          id: 'frontend',
          label: 'Frontend',
          type: 'folder',
          tech: ['React', 'TypeScript', 'Material-UI'],
          children: [
            {
              id: 'components',
              label: 'Components',
              type: 'folder',
              children: [
                { id: 'header', label: 'Header.tsx', type: 'file' },
                { id: 'product-card', label: 'ProductCard.tsx', type: 'file' },
                { id: 'cart', label: 'Cart.tsx', type: 'file' }
              ]
            },
            {
              id: 'pages',
              label: 'Pages',
              type: 'folder',
              children: [
                { id: 'home', label: 'Home.tsx', type: 'file' },
                { id: 'menu', label: 'Menu.tsx', type: 'file' },
                { id: 'checkout', label: 'Checkout.tsx', type: 'file' }
              ]
            }
          ]
        },
        {
          id: 'backend',
          label: 'Backend',
          type: 'folder',
          tech: ['Node.js', 'Express', 'PostgreSQL'],
          children: [
            {
              id: 'api',
              label: 'API Routes',
              type: 'api',
              children: [
                { id: 'auth', label: 'auth.ts', type: 'file' },
                { id: 'products', label: 'products.ts', type: 'file' },
                { id: 'orders', label: 'orders.ts', type: 'file' }
              ]
            },
            {
              id: 'services',
              label: 'Services',
              type: 'service',
              children: [
                { id: 'payment', label: 'paymentService.ts', type: 'file' },
                { id: 'email', label: 'emailService.ts', type: 'file' }
              ]
            }
          ]
        },
        {
          id: 'ai',
          label: 'Sistema de Recomendação',
          type: 'ai',
          tech: ['Python', 'TensorFlow'],
          description: 'Recomenda pratos baseado no histórico do usuário'
        },
        {
          id: 'design',
          label: 'Design System',
          type: 'design',
          tech: ['Figma', 'Storybook'],
          description: 'Componentes e guidelines de design'
        }
      ]
    },
  };

  const structure = projectStructure[projectId];

  const getIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder />;
      case 'file': return <Code />;
      case 'service': return <Storage />;
      case 'api': return <Api />;
      case 'ai': return <Psychology />;
      case 'design': return <DesignServices />;
      default: return <Folder />;
    }
  };

  const renderNode = (node: ProjectNode, depth = 0) => (
    <Box key={node.id} sx={{ ml: depth * 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ color: theme.palette.primary.main, mr: 1 }}>
          {getIcon(node.type)}
        </Box>
        <Typography variant="body1" fontWeight={600}>
          {node.label}
        </Typography>
        {node.tech && (
          <Box sx={{ ml: 2, display: 'flex', gap: 0.5 }}>
            {node.tech.map(tech => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                variant="outlined"
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            ))}
          </Box>
        )}
      </Box>
      
      {node.description && (
        <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 1 }}>
          {node.description}
        </Typography>
      )}

      {node.children && (
        <Box sx={{ borderLeft: `2px dashed ${theme.palette.divider}`, pl: 2 }}>
          {node.children.map(child => renderNode(child, depth + 1))}
        </Box>
      )}
    </Box>
  );

  return (
    <Fade in timeout={800}>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
          transition: 'transform 0.3s ease',
          minHeight: 400,
          overflow: 'auto'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight={700}>
            🗺️ Mapa da Arquitetura
          </Typography>
          
          <Box>
            <Tooltip title="Zoom Out">
              <IconButton 
                size="small" 
                onClick={() => setZoom(prev => Math.max(0.7, prev - 0.1))}
                disabled={zoom <= 0.7}
              >
                <ZoomOut />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Zoom In">
              <IconButton 
                size="small" 
                onClick={() => setZoom(prev => Math.min(1.3, prev + 0.1))}
                disabled={zoom >= 1.3}
              >
                <ZoomIn />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {structure ? (
          renderNode(structure)
        ) : (
          <Typography color="text.secondary">
            Mapa não disponível para este projeto
          </Typography>
        )}
      </Paper>
    </Fade>
  );
};