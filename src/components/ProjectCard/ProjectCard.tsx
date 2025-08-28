import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from '@mui/material';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onViewProject: (projectId: string) => void;
  img: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewProject, img }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2, height: 400 }}>
      <CardMedia
        component="img"
        height="200"
        image={img}
        alt={project.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary"
          onClick={() => onViewProject(project.id)}
        >
          Ver Projeto
        </Button>
        {project.apiDocs && (
          <Button 
            size="small" 
            color="secondary"
            href={project.apiDocs}
            target="_blank"
          >
            API Docs
          </Button>
        )}
      </CardActions>
    </Card>
  );
};