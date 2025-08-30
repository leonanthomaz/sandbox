import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Stack,
  Paper,
  Typography,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Chip,
  Tooltip,
  Divider,
  useTheme,
  alpha,
  InputAdornment,
  useMediaQuery
} from '@mui/material';
import { JsonViewer } from '@textea/json-viewer';
import {
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Code as CodeIcon,
  VpnKey as VpnKeyIcon,
  ModelTraining as ModelIcon,
  Info as InfoIcon,
  Token as TokenIcon,
  AccessTime as AccessTimeIcon,
  SentimentSatisfiedAlt as SuccessIcon,
  ErrorOutline as ErrorIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  HelpOutline as HelpOutlineIcon,
  ChatBubbleOutline as ChatIcon
} from '@mui/icons-material';
import { SiPython } from 'react-icons/si';

import ChatWindow from './ChatWindow';
import type { ChatMessage, ChatPostParams, ChatResponseTest } from '../../types/chat';
import { chatPostApi } from '../../services/api/chat';

interface ApiConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

const ChatTestPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [apiResponse, setApiResponse] = useState<ChatResponseTest | null>(null);
  const [configOpen, setConfigOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [stats, setStats] = useState({
    totalTokens: 0,
    avgResponseTime: 0,
    successfulCalls: 0,
    errorCalls: 0,
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const debugContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Scroll automático para o final das conversas
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [chat, typing]);

  // Scroll automático para o final do debug quando houver nova resposta
  useEffect(() => {
    if (debugContainerRef.current && apiResponse) {
      debugContainerRef.current.scrollTop = debugContainerRef.current.scrollHeight;
    }
  }, [apiResponse]);

  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    apiKey: localStorage.getItem('apiKey') || '',
    model: localStorage.getItem('model') || 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 500,
  });

  useEffect(() => {
    const savedConfig = localStorage.getItem('chatConfig');
    if (savedConfig) setApiConfig(JSON.parse(savedConfig));
  }, []);

  const saveConfig = () => {
    localStorage.setItem('chatConfig', JSON.stringify(apiConfig));
    localStorage.setItem('apiKey', apiConfig.apiKey);
    localStorage.setItem('model', apiConfig.model);
    setConfigOpen(false);
  };

  const handleSendMessage = async (message: string) => {
    if (!apiConfig.apiKey) {
      setConfigOpen(true);
      return;
    }

    const startTime = Date.now();
    const newMessage: ChatMessage = { sender: 'Você', text: message, timestamp: new Date().toISOString() };
    setChat((prev) => [...prev, newMessage]);
    setLoading(true);
    setTyping(true);

    const chatData: ChatPostParams = {
      companyId: 1,
      message,
      chatCode: apiResponse?.chat_code || null,
      apiKey: apiConfig.apiKey,
      model: apiConfig.model,
      temperature: apiConfig.temperature,
      maxTokens: apiConfig.maxTokens,
    };

    try {
      const response = await chatPostApi(chatData);
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      setApiResponse(response);

      const botMessage: ChatMessage = {
        sender: 'Assistente',
        text: response.useful_context.user_response,
        timestamp: response.useful_context.timestamp,
      };
      setChat((prev) => [...prev, botMessage]);
      setStats((prev) => ({
        ...prev,
        totalTokens: prev.totalTokens + (response.token_usage?.total_tokens || 0),
        successfulCalls: prev.successfulCalls + 1,
        avgResponseTime:
          prev.successfulCalls > 0
            ? (prev.avgResponseTime * prev.successfulCalls + responseTime) / (prev.successfulCalls + 1)
            : responseTime,
      }));

      if (response.chat_code) localStorage.setItem('chat_code', response.chat_code);
    } catch (error) {
      const errorMessage: ChatMessage = {
        sender: 'Assistente',
        text: 'Erro ao obter resposta. Verifique sua API Key e tente novamente!',
        timestamp: new Date().toISOString(),
      };
      setChat((prev) => [...prev, errorMessage]);
      setStats((prev) => ({ ...prev, errorCalls: prev.errorCalls + 1 }));
      setApiResponse({
        useful_context: {
          user_response: 'Erro na requisição',
          system_response: { function: 'error', error: 'Detalhe do erro' },
          timestamp: new Date().toISOString(),
        },
        status: 500,
        chat_code: apiResponse?.chat_code || undefined,
      });
    } finally {
      setLoading(false);
      setTyping(false);
    }
  };

  const clearChat = () => {
    setChat([]);
    setApiResponse(null);
    localStorage.removeItem('chat_code');
    setStats({ totalTokens: 0, avgResponseTime: 0, successfulCalls: 0, errorCalls: 0 });
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.default, 0.1)} 100%)`,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <CodeIcon fontSize={isMobile ? 'small' : 'medium'} />
          <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="bold">
            Sandbox
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={isMobile ? 0.5 : 1}
          alignItems="center"
          flexWrap="wrap"
        >
          <Tooltip title="Total de tokens">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TokenIcon fontSize="small" sx={{ mr: 0.5, color: 'primary.main' }} />
              <Typography variant="caption">{stats.totalTokens}</Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Tempo médio de resposta">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'primary.main' }} />
              <Typography variant="caption">{stats.avgResponseTime.toFixed(0)}ms</Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Chamadas bem-sucedidas">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SuccessIcon fontSize="small" sx={{ mr: 0.5, color: 'success.main' }} />
              <Typography variant="caption" color="success.main">
                {stats.successfulCalls}
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Chamadas com erro">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ErrorIcon fontSize="small" sx={{ mr: 0.5, color: 'error.main' }} />
              <Typography variant="caption" color="error.main">
                {stats.errorCalls}
              </Typography>
            </Box>
          </Tooltip>

          {!isMobile && (
              <Chip label={apiConfig.model} size="small" icon={<ModelIcon />} variant="outlined" />
          )}

        </Stack>
      </Box>

      {/* Conteúdo */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          overflow: 'hidden',
          p: 2,
          gap: 2,
          minHeight: 0,
        }}
      >
        {/* Painel do Chat */}
        <Paper
          elevation={1}
          sx={{
            flex: isMobile ? '1 1 50%' : 1, // ocupa metade da tela em mobile
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            maxHeight: '100%',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1.5,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              flexShrink: 0,
            }}
          >
            <Typography variant="subtitle1" fontWeight="medium">

            <Stack direction="row" alignItems="center" spacing={1}>
              <ChatIcon sx={{ color: theme.palette.primary.main }} />
              <Typography fontWeight="medium">Conversa</Typography>
            </Stack>
            </Typography>
            <Stack direction="row" spacing={1}>
              <Tooltip title="Limpar conversa">
                <IconButton onClick={clearChat} size="small">
                  <RefreshIcon sx={{ color: theme.palette.primary.main }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Configurações">
                <IconButton onClick={() => setConfigOpen(true)} size="small">
                  <SettingsIcon sx={{ color: theme.palette.primary.main }} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          <Box 
            sx={{ 
              flex: 1,
              minHeight: 0,
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
            ref={chatContainerRef}
          >
            <ChatWindow chat={chat} loading={loading} typing={typing} onSendMessage={handleSendMessage} lastMessageRef={lastMessageRef}/>
          </Box>
        </Paper>

        {/* Painel de Debug */}
        <Paper
          elevation={1}
          sx={{
            flex: isMobile ? '1 1 50%' : '0 0 45%', // metade da tela em mobile
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            maxHeight: '100%',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              flexShrink: 0,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <SiPython style={{ color: theme.palette.primary.main, fontSize: '1.2rem' }} />
                <Typography variant="subtitle1" fontWeight="medium">
                  Painel de Resposta JSON - Debug
                </Typography>
              </Stack>
              <IconButton onClick={() => setOpenHelp(true)}>
                  <HelpOutlineIcon sx={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            
          </Box>

          <Box
            ref={debugContainerRef}
            sx={{ flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column', p: 2, gap: 2 }}
          >
            {!apiResponse ? (
              <Alert severity="info" icon={<InfoIcon />} sx={{ fontSize: '0.8rem' }}>
                Envie uma mensagem para visualizar a resposta da API
              </Alert>
            ) : (
              <>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip label={`Status: ${apiResponse.status}`} size="small" color={apiResponse.status === 200 ? 'success' : 'error'} />
                  <Chip label={`Prompt tokens: ${
                    apiResponse.useful_context.token_usage &&
                    typeof apiResponse.useful_context.token_usage === 'object' &&
                    'prompt_tokens' in apiResponse.useful_context.token_usage
                      ? (apiResponse.useful_context.token_usage as { prompt_tokens: number }).prompt_tokens
                      : '-'
                  }`} size="small" variant="outlined" />
                  <Chip label={`Completion tokens: ${
                    apiResponse.useful_context.token_usage &&
                    typeof apiResponse.useful_context.token_usage === 'object' &&
                    'completion_tokens' in apiResponse.useful_context.token_usage
                      ? (apiResponse.useful_context.token_usage as { completion_tokens: number }).completion_tokens
                      : '-'
                  }`} size="small" variant="outlined" />

                  {apiResponse.token_usage && typeof apiResponse.token_usage === 'object' && <Chip label={`Tokens: ${apiResponse.token_usage.total_tokens}`} size="small" variant="outlined" />}
                </Stack>
                <Divider />
                {apiResponse.useful_context.system_response?.function && (
                  <Alert severity="info" icon={<CodeIcon />}>
                    Ação detectada: <strong>{apiResponse.useful_context.system_response.function}</strong>
                  </Alert>
                )}
                <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
                  <JsonViewer
                    value={apiResponse}
                    rootName="apiResponse"
                    theme="dark"
                    displayDataTypes={false}
                    style={{
                      borderRadius: 8,
                      padding: 12,
                      backgroundColor: '#1E1E1E',
                      fontSize: '0.85rem',
                      color: '#FFFFFF',
                    }}
                  />
                </Box>
              </>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Modal Help */}
      <Dialog open={openHelp} onClose={() => setOpenHelp(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Como agendar</DialogTitle>
        <DialogContent dividers>
            <Typography gutterBottom>
                🟢 <strong>Dias verdes:</strong> Possuem horários disponíveis
            </Typography>
            <Typography gutterBottom>
                🔵 <strong>Modo semana/dia:</strong> Mostra os horários disponíveis
            </Typography>
            <Typography gutterBottom>
                🕒 <strong>Para agendar:</strong> Clique em um horário verde
            </Typography>
            {isMobile && (
                <Typography gutterBottom>
                    📱 <strong>Mobile:</strong> Toque nos eventos para mais detalhes
                </Typography>
            )}
        </DialogContent>
        <DialogActions>
            <Button 
                onClick={() => setOpenHelp(false)} 
                variant="contained" 
                color="primary"
                sx={{ borderRadius: '8px' }}
            >
                Entendi
            </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Config */}
      <Dialog open={configOpen} onClose={() => setConfigOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <SettingsIcon />
            <Typography variant="h6">Configurações da API</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="API Key"
              type={showApiKey ? 'text' : 'password'}
              value={apiConfig.apiKey}
              onChange={(e) => setApiConfig({ ...apiConfig, apiKey: e.target.value })}
              fullWidth
              placeholder="sk-..."
              helperText="Sua chave API para autenticação"
              InputProps={{
                startAdornment: <VpnKeyIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowApiKey(!showApiKey)} edge="end">
                      {showApiKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Modelo"
              value={apiConfig.model}
              onChange={(e) => setApiConfig({ ...apiConfig, model: e.target.value })}
              fullWidth
              placeholder="gpt-3.5-turbo"
              helperText="Modelo do OpenAI a ser utilizado"
              InputProps={{ startAdornment: <ModelIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
            />
            <TextField
              label="Temperature"
              type="number"
              value={apiConfig.temperature}
              onChange={(e) => setApiConfig({ ...apiConfig, temperature: parseFloat(e.target.value) })}
              fullWidth
              inputProps={{ min: 0, max: 1, step: 0.1 }}
              helperText="Controla a criatividade das respostas (0-1)"
            />
            <TextField
              label="Max Tokens"
              type="number"
              value={apiConfig.maxTokens}
              onChange={(e) => setApiConfig({ ...apiConfig, maxTokens: parseInt(e.target.value) })}
              fullWidth
              helperText="Número máximo de tokens na resposta"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfigOpen(false)}>Cancelar</Button>
          <Button onClick={saveConfig} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatTestPage;
