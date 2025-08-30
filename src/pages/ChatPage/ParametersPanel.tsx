import React, { useState, type ChangeEvent, useEffect } from 'react';
import {
  Typography,
  TextField,
  Paper,
  Stack,
  Box,
  Button,
  useTheme
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface CompanyConfig {
  companyName: string;
  companyDescription: string;
  companyContext: string;
  uploadedFile: File | null;
}

interface ParametersPanelProps {
  onCompanyConfigChange: (config: CompanyConfig) => void;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({ onCompanyConfigChange }) => {
  const theme = useTheme();
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyContext, setCompanyContext] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Usa useEffect para garantir que a configuração seja enviada
  // somente quando os estados são atualizados
  useEffect(() => {
    onCompanyConfigChange({
      companyName,
      companyDescription,
      companyContext,
      uploadedFile,
    });
  }, [companyName, companyDescription, companyContext, uploadedFile, onCompanyConfigChange]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadedFile(event.target.files[0]);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: theme.shape.borderRadius,
        bgcolor: theme.palette.background.paper,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        ⚙️ Parâmetros da Empresa
      </Typography>

      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <TextField
          label="Nome da Empresa"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
          InputProps={{
            sx: {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              '& fieldset': { borderColor: theme.palette.divider },
              '&:hover fieldset': { borderColor: theme.palette.primary.main },
              '&.Mui-focused fieldset': { borderColor: theme.palette.primary.dark },
            },
          }}
          InputLabelProps={{
            sx: { color: theme.palette.text.secondary },
          }}
        />

        <TextField
          label="Descrição da Empresa"
          value={companyDescription}
          onChange={(e) => setCompanyDescription(e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
          multiline
          rows={3}
          InputProps={{
            sx: {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              '& fieldset': { borderColor: theme.palette.divider },
              '&:hover fieldset': { borderColor: theme.palette.primary.main },
              '&.Mui-focused fieldset': { borderColor: theme.palette.primary.dark },
            },
          }}
          InputLabelProps={{
            sx: { color: theme.palette.text.secondary },
          }}
        />

        <TextField
          label="Contexto da Empresa"
          value={companyContext}
          onChange={(e) => setCompanyContext(e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
          multiline
          rows={4}
          InputProps={{
            sx: {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              '& fieldset': { borderColor: theme.palette.divider },
              '&:hover fieldset': { borderColor: theme.palette.primary.main },
              '&.Mui-focused fieldset': { borderColor: theme.palette.primary.dark },
            },
          }}
          InputLabelProps={{
            sx: { color: theme.palette.text.secondary },
          }}
        />

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
            Upload de Arquivo (Opcional)
          </Typography>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
              }
            }}
          >
            {uploadedFile ? uploadedFile.name : 'Escolher Arquivo'}
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ParametersPanel;