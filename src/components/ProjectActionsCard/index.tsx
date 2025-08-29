import React from 'react';
import { Box, Card, CardContent, Typography, Button, Stack, useTheme } from '@mui/material';
import { VpnKey, AccountTree, Launch } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ProjectActionsCardProps {
  projectId: string;
}

export const ProjectActionsCard: React.FC<ProjectActionsCardProps> = ({ projectId }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 4,
        bgcolor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[8],
      }}
    >
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
          Painel de Ações
        </Typography>

        <Stack spacing={2}>
          {/* Testar Credenciais */}
          <Button
            variant="contained"
            startIcon={<VpnKey />}
            fullWidth
            size="large"
            onClick={() => navigate(`/${projectId}/credentials`)}
            sx={{
              py: 2,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: theme.palette.primary.contrastText,
              borderRadius: 2,
              boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 18px ${theme.palette.primary.main}60`,
              },
            }}
          >
            Testar Credenciais
          </Button>

          {/* Visualizar Tree */}
          <Button
            variant="outlined"
            startIcon={<AccountTree />}
            fullWidth
            size="large"
            onClick={() => navigate(`/${projectId}/tree`)}
            sx={{
              py: 2,
              fontWeight: 700,
              borderColor: theme.palette.success.main,
              color: theme.palette.success.main,
              borderRadius: 2,
              '&:hover': {
                transform: 'translateY(-2px)',
                borderColor: theme.palette.success.dark,
                color: theme.palette.success.dark,
                boxShadow: `0 4px 12px ${theme.palette.success.main}40`,
              },
            }}
          >
            Visualizar Tree
          </Button>

        </Stack>
      </CardContent>
    </Card>
  );
};