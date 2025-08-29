import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  useTheme,
  alpha,
  Paper
} from '@mui/material';
import { ArrowBack, Home, Refresh } from '@mui/icons-material';

interface ErrorDisplayProps {
  title: string;
  message: string;
  severity?: 'error' | 'warning' | 'info';
  actions?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: 'contained' | 'outlined' | 'text';
  }[];
  icon?: React.ReactNode;
  showHomeButton?: boolean;
  showRefreshButton?: boolean;
  onHomeClick?: () => void;
  onRefreshClick?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title,
  message,
  severity = 'error',
  actions = [],
  icon,
  showHomeButton = false,
  showRefreshButton = false,
  onHomeClick,
  onRefreshClick
}) => {
  const theme = useTheme();

  const getSeverityColor = () => {
    switch (severity) {
      case 'warning':
        return theme.palette.warning.main;
      case 'info':
        return theme.palette.info.main;
      case 'error':
      default:
        return theme.palette.error.main;
    }
  };

  const getSeverityBackground = () => {
    switch (severity) {
      case 'warning':
        return alpha(theme.palette.warning.main, 0.1);
      case 'info':
        return alpha(theme.palette.info.main, 0.1);
      case 'error':
      default:
        return alpha(theme.palette.error.main, 0.1);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: getSeverityBackground(),
          border: `1px solid ${alpha(getSeverityColor(), 0.2)}`,
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Ícone */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
            color: getSeverityColor(),
            fontSize: '4rem'
          }}
        >
          {icon || (
            <span style={{ fontSize: '64px' }}>
              {severity === 'error' && '❌'}
              {severity === 'warning' && '⚠️'}
              {severity === 'info' && 'ℹ️'}
            </span>
          )}
        </Box>

        {/* Título */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: getSeverityColor(),
            fontWeight: 700,
            mb: 2
          }}
        >
          {title}
        </Typography>

        {/* Mensagem */}
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            mb: 4,
            lineHeight: 1.6
          }}
        >
          {message}
        </Typography>

        {/* Ações personalizadas */}
        {actions.length > 0 && (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3, flexWrap: 'wrap' }}>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'contained'}
                onClick={action.onClick}
                startIcon={action.icon}
                sx={{
                  borderRadius: 2,
                  minWidth: '120px'
                }}
              >
                {action.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Ações padrão */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          {showRefreshButton && (
            <Button
              variant="outlined"
              onClick={onRefreshClick || (() => window.location.reload())}
              startIcon={<Refresh />}
              sx={{ borderRadius: 2 }}
            >
              Recarregar
            </Button>
          )}
          
          {showHomeButton && (
            <Button
              variant="outlined"
              onClick={onHomeClick || (() => window.location.href = '/')}
              startIcon={<Home />}
              sx={{ borderRadius: 2 }}
            >
              Página Inicial
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

// Componentes de erro pré-configurados
export const TreeNotFoundError: React.FC<{ projectId: string; onBack?: () => void }> = ({ 
  projectId, 
  onBack 
}) => {
  const navigate = useNavigate();
  
  return (
    <ErrorDisplay
      title="Estrutura não disponível"
      message="Este projeto não possui uma estrutura de árvore definida."
      severity="info"
      icon="🌳"
      actions={[
        {
          label: 'Voltar ao Projeto',
          onClick: onBack || (() => navigate(`/${projectId}`)),
          icon: <ArrowBack />,
          variant: 'contained'
        }
      ]}
      showHomeButton
    />
  );
};

export const ProjectNotFoundError: React.FC = () => {
  return (
    <ErrorDisplay
      title="Projeto não encontrado"
      message="O projeto que você está procurando não existe ou não está disponível no momento."
      severity="error"
      icon="🔍"
      showHomeButton
      showRefreshButton
    />
  );
};

export const AccessDeniedError: React.FC = () => {
  return (
    <ErrorDisplay
      title="Acesso negado"
      message="Você não tem permissão para acessar este recurso."
      severity="warning"
      icon="🚫"
      showHomeButton
    />
  );
};

export const NetworkError: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => {
  return (
    <ErrorDisplay
      title="Erro de conexão"
      message="Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente."
      severity="error"
      icon="📡"
      actions={[
        {
          label: 'Tentar novamente',
          onClick: onRetry || (() => window.location.reload()),
          icon: <Refresh />,
          variant: 'contained'
        }
      ]}
      showHomeButton
    />
  );
};

// Hook para navegação
import { useNavigate } from 'react-router-dom';