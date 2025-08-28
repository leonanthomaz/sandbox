import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert
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
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Credenciais - {projectName}
            </Typography>
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Box>

          {credentials.map((credential) => (
            <Card key={credential.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {credential.role}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {credential.description}
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Usuário:</strong> {credential.username}
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(credential.username, 'username')}
                      sx={{ ml: 1 }}
                    >
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </Typography>
                  
                  <Typography variant="body2">
                    <strong>Senha:</strong> {credential.password}
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(credential.password, 'password')}
                      sx={{ ml: 1 }}
                    >
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Modal>

      <Snackbar open={!!copied} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {copied === 'username' ? 'Usuário copiado!' : 'Senha copiada!'}
        </Alert>
      </Snackbar>
    </>
  );
};