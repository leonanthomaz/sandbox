import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
} from '@mui/material';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (apiKey: string, model: string) => void;
  initialApiKey: string;
  initialModel: string;
}

const modelOptions = [
  'gpt-4-turbo-preview',
  'gpt-3.5-turbo',
  'gpt-4-o',
  'claude-3-opus',
  'gemini-1.5-pro',
];

const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose,
  onSave,
  initialApiKey,
  initialModel,
}) => {
  const [apiKey, setApiKey] = useState(initialApiKey);
  const [model, setModel] = useState(initialModel);

  useEffect(() => {
    setApiKey(initialApiKey);
    setModel(initialModel);
  }, [initialApiKey, initialModel]);

  const handleSave = () => {
    onSave(apiKey, model);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', md: 500 },
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Configurações da API
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="API Key"
            placeholder="Sua chave de API"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            type="password"
            variant="outlined"
          />
          <TextField
            select
            fullWidth
            label="Modelo"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            helperText="Selecione o modelo do chatbot para testar."
          >
            {modelOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'flex-end' }}>
          <Button onClick={onClose} color="inherit" variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Salvar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default SettingsModal;