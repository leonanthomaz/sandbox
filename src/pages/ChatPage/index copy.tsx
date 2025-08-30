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
  useMediaQuery,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Drawer
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
  Menu as MenuIcon,
  HelpOutline as HelpIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';

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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [apiResponse, setApiResponse] = useState<ChatResponseTest | null>(null);
  const [configOpen, setConfigOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    totalTokens: 0,
    avgResponseTime: 0,
    successfulCalls: 0,
    errorCalls: 0,
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const debugContainerRef = useRef<HTMLDivElement>(null);

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

  // Scroll automático para o final das conversas
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat, typing]);

  // Scroll automático para o final do debug quando houver nova resposta
  useEffect(() => {
    if (debugContainerRef.current && apiResponse) {
      debugContainerRef.current.scrollTop = debugContainerRef.current.scrollHeight;
    }
  }, [apiResponse]);

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

  // Menu para dispositivos móveis
  const renderMobileMenu = (
    <Menu
      anchorEl={document.getElementById('mobile-menu-button')}
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 180,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      <MenuItem onClick={() => { setConfigOpen(true); setMobileMenuOpen(false); }}>
        <SettingsIcon sx={{ mr: 2, fontSize: 20 }} />
        Configurações
      </MenuItem>
      <MenuItem onClick={() => { setInfoOpen(true); setMobileMenuOpen(false); }}>
        <HelpIcon sx={{ mr: 2, fontSize: 20 }} />
        Ajuda
      </MenuItem>
      <MenuItem onClick={() => { clearChat(); setMobileMenuOpen(false); }}>
        <RefreshIcon sx={{ mr: 2, fontSize: 20 }} />
        Limpar Chat
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.default, 0.1)} 100%)`,
      }}
    >
      {/* AppBar para melhor responsividade */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          color: theme.palette.text.primary
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            {isMobile && (
              <IconButton
                id="mobile-menu-button"
                edge="start"
                onClick={() => setMobileMenuOpen(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <CodeIcon />
            <Typography variant="h6" fontWeight="bold" noWrap>
              Sandbox
            </Typography>
          </Stack>

          {!isMobile && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              flexWrap="wrap"
              sx={{ ml: 2 }}
            >
              <Tooltip title="Total de tokens">
                <Chip
                  icon={<TokenIcon />}
                  label={stats.totalTokens}
                  size="small"
                  variant="outlined"
                />
              </Tooltip>

              <Tooltip title="Tempo médio de resposta">
                <Chip
                  icon={<AccessTimeIcon />}
                  label={`${stats.avgResponseTime.toFixed(0)}ms`}
                  size="small"
                  variant="outlined"
                />
              </Tooltip>

              <Tooltip title="Chamadas bem-sucedidas">
                <Chip
                  icon={<SuccessIcon />}
                  label={stats.successfulCalls}
                  size="small"
                  color="success"
                  variant="outlined"
                />
              </Tooltip>

              <Tooltip title="Chamadas com erro">
                <Chip
                  icon={<ErrorIcon />}
                  label={stats.errorCalls}
                  size="small"
                  color="error"
                  variant="outlined"
                />
              </Tooltip>

              <Chip 
                label={apiConfig.model} 
                size="small" 
                icon={<ModelIcon />} 
                variant="outlined" 
              />

              <Tooltip title="Configurações">
                <IconButton onClick={() => setConfigOpen(true)} size="small">
                  <SettingsIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Ajuda e Informações">
                <IconButton onClick={() => setInfoOpen(true)} size="small">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {/* Conteúdo */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          overflow: 'hidden',
          p: 2,
          gap: 2,
          height: 'calc(100vh - 64px)'
        }}
      >
        {/* Painel do Chat */}
        <Paper
          elevation={1}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            overflow: 'hidden',
            borderRadius: 2,
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
              💬 Conversa
            </Typography>
            <Stack direction="row" spacing={1}>
              <Tooltip title="Limpar conversa">
                <IconButton onClick={clearChat} size="small">
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Configurações">
                <IconButton onClick={() => setConfigOpen(true)} size="small">
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          <Box 
            sx={{ 
              flex: 1, 
              minHeight: 0,
              overflow: 'hidden'
            }}
            ref={chatContainerRef}
          >
            <ChatWindow chat={chat} loading={loading} typing={typing} onSendMessage={handleSendMessage} />
          </Box>
        </Paper>

        {/* Painel de Debug - Ocultável em telas muito pequenas */}
        {(!isSmallScreen || !isMobile) && (
          <Paper
            elevation={1}
            sx={{
              width: isMobile ? '100%' : '45%',
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              overflow: 'hidden',
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                flexShrink: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="subtitle1" fontWeight="medium">
                🐛 Painel de Debug
              </Typography>
              <Tooltip title="Este painel mostra a resposta completa da API em formato JSON">
                <InfoIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              </Tooltip>
            </Box>

            <Box 
              sx={{ 
                flex: 1, 
                p: 2, 
                overflow: 'auto', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2 
              }}
              ref={debugContainerRef}
            >
              {!apiResponse ? (
                <Alert 
                  severity="info" 
                  icon={<InfoIcon />} 
                  sx={{ 
                    mt: 2,
                    '& .MuiAlert-message': {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }
                  }}
                >
                  Envie uma mensagem para visualizar a resposta da API
                </Alert>
              ) : (
                <>
                  <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                    <Chip 
                      label={`Status: ${apiResponse.status}`} 
                      size="small" 
                      color={apiResponse.status === 200 ? 'success' : 'error'} 
                    />
                    {apiResponse.token_usage && (
                      <Chip 
                        label={`Tokens: ${apiResponse.token_usage.total_tokens}`} 
                        size="small" 
                        variant="outlined" 
                      />
                    )}
                    {apiResponse.chat_code && (
                      <Tooltip title="Código da conversa">
                        <Chip 
                          label={`Chat Code: ${apiResponse.chat_code.substring(0, 8)}...`} 
                          size="small" 
                          variant="outlined" 
                        />
                      </Tooltip>
                    )}
                  </Stack>
                  <Divider />
                  <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
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
                        minHeight: '100%'
                      }}
                    />
                  </Box>
                  {apiResponse.useful_context.system_response?.function && (
                    <Alert 
                      severity="info" 
                      icon={<CodeIcon />}
                      sx={{ flexShrink: 0 }}
                    >
                      Ação detectada: <strong>{apiResponse.useful_context.system_response.function}</strong>
                    </Alert>
                  )}
                </>
              )}
            </Box>
          </Paper>
        )}
      </Box>

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

      {/* Modal de Informações */}
      <Dialog open={infoOpen} onClose={() => setInfoOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <HelpIcon />
            <Typography variant="h6">Sobre o Sandbox</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body1">
              Esta ferramenta permite testar a integração com a API de chatbot em um ambiente controlado.
            </Typography>
            <Divider />
            <Typography variant="h6" fontWeight="bold">Funcionalidades:</Typography>
            <ul>
              <li><Typography variant="body2">Testar diferentes modelos de linguagem</Typography></li>
              <li><Typography variant="body2">Ajustar parâmetros como temperatura e tokens máximos</Typography></li>
              <li><Typography variant="body2">Visualizar as respostas completas da API em JSON</Typography></li>
              <li><Typography variant="body2">Monitorar estatísticas de uso e desempenho</Typography></li>
            </ul>
            <Alert severity="info">
              Certifique-se de usar uma chave API válida para que as requisições funcionem corretamente.
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoOpen(false)} variant="contained">
            Entendi
          </Button>
        </DialogActions>
      </Dialog>

      {renderMobileMenu}
    </Box>
  );
};

export default ChatTestPage;