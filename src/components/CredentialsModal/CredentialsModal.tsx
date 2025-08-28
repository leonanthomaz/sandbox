import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
  useTheme
} from '@mui/material';
import { ContentCopy, Close } from '@mui/icons-material';
import type { Credential } from '../../types';

interface CredentialsModalProps {
  open: boolean;
  onClose: () => void;
  credentials: Credential[];
  projectName: string;
}

export const CredentialsModal: React.FC<CredentialsModalProps> = ({
  open,
  onClose,
  credentials,
  projectName
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  const theme = useTheme();

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 450 },
          bgcolor: 'rgba(26, 26, 26, 0.8)', // Fundo translúcido
          backdropFilter: 'blur(15px)', // Efeito de vidro fosco
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[10],
          p: 4,
          borderRadius: 4, // Bordas mais arredondadas
          maxHeight: '90vh',
          overflowY: 'auto',
          outline: 'none',
          color: theme.palette.text.primary,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" fontWeight={700}>
              Credenciais - {projectName}
            </Typography>
            <IconButton onClick={onClose} size="small" sx={{ color: theme.palette.text.secondary, transition: 'color 0.3s ease', '&:hover': { color: theme.palette.primary.main } }}>
              <Close />
            </IconButton>
          </Box>

          {credentials.map((credential) => (
            <Card key={credential.id} sx={{ 
              mb: 3, 
              borderRadius: 3, 
              bgcolor: theme.palette.background.paper, 
              border: `1px solid ${theme.palette.divider}`, 
              boxShadow: theme.shadows[3] 
            }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {credential.role}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {credential.description}
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" fontWeight={500} sx={{ mr: 1 }}>
                      Usuário:
                    </Typography>
                    <Typography variant="body1" color="primary" sx={{ flexGrow: 1 }}>
                      {credential.username}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(credential.username, 'username')}
                      sx={{ 
                        ml: 1, 
                        color: theme.palette.secondary.main, 
                        '&:hover': { color: theme.palette.primary.main }
                      }}
                    >
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" fontWeight={500} sx={{ mr: 1 }}>
                      Senha:
                    </Typography>
                    <Typography variant="body1" color="primary" sx={{ flexGrow: 1 }}>
                      {credential.password}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(credential.password, 'password')}
                      sx={{ 
                        ml: 1, 
                        color: theme.palette.secondary.main, 
                        '&:hover': { color: theme.palette.primary.main }
                      }}
                    >
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Modal>

      <Snackbar open={!!copied} autoHideDuration={2000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert 
          severity="success" 
          sx={{ 
            width: '100%', 
            bgcolor: theme.palette.background.paper, 
            color: theme.palette.primary.main, 
            boxShadow: theme.shadows[6]
          }}
        >
          {copied === 'username' ? 'Usuário copiado!' : 'Senha copiada!'}
        </Alert>
      </Snackbar>
    </>
  );
};