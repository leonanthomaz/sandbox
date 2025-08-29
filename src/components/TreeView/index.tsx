import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  useTheme,
  Fade,
  Chip,
  IconButton,
  Tooltip,
  Collapse,
  alpha
} from '@mui/material';
import {
  Folder,
  FolderOpen,
  Code,
  Storage,
  Api,
  Psychology,
  DesignServices,
  ZoomIn,
  ZoomOut,
  ChevronRight,
  ExpandMore,
  Link as LinkIcon
} from '@mui/icons-material';
import type { ProjectNode } from '../../types';

interface TreeViewProps {
  data: ProjectNode[];
  projectName: string;
}

export const ProjectTreeView: React.FC<TreeViewProps> = ({ data, projectName }) => {
  const theme = useTheme();
  const [zoom, setZoom] = useState(1);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getNodeIcon = (node: ProjectNode, isExpanded: boolean) => {
    switch (node.type) {
      case 'folder':
        return isExpanded ? <FolderOpen color="primary" /> : <Folder color="primary" />;
      case 'file':
        return <Code color="secondary" />;
      case 'service':
        return <Api color="action" />;
      case 'api':
        return <Storage color="info" />;
      case 'ai':
        return <Psychology color="warning" />;
      case 'database':
        return <Storage color="success" />;
      case 'config':
        return <DesignServices color="disabled" />;
      default:
        return <Folder color="primary" />;
    }
  };

  const renderNode = (node: ProjectNode, depth = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <Box key={node.id} sx={{ ml: depth * 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: 1,
            px: 2,
            borderRadius: 1,
            cursor: hasChildren ? 'pointer' : 'default',
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.05)
            }
          }}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          {hasChildren && (
            <IconButton size="small" sx={{ mr: 1 }}>
              {isExpanded ? <ExpandMore /> : <ChevronRight />}
            </IconButton>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Box sx={{ mr: 1.5 }}>
              {getNodeIcon(node, isExpanded)}
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" fontWeight={600}>
                {node.name}
              </Typography>
              
              {node.description && (
                <Typography variant="body2" color="text.secondary">
                  {node.description}
                </Typography>
              )}
              
              {node.technologies && (
                <Box sx={{ mt: 0.5, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {node.technologies.map(tech => (
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
          </Box>
        </Box>

        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto">
            <Box sx={{ borderLeft: `2px solid ${theme.palette.divider}`, ml: 3 }}>
              {node.children!.map(child => renderNode(child, depth + 1))}
            </Box>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Fade in timeout={800}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
          transition: 'transform 0.3s ease',
          maxHeight: 600,
          overflow: 'auto'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LinkIcon color="primary" sx={{ mr: 2 }} />
            <Typography variant="h5" fontWeight={700}>
             Arquitetura do {projectName}
            </Typography>
          </Box>

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

        {data.map(node => renderNode(node))}
      </Paper>
    </Fade>
  );
};