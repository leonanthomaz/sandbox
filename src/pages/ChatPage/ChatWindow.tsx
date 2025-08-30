import React, { useState, useEffect, useRef } from 'react';
import { TextField, IconButton, CircularProgress, Box, keyframes, useTheme, alpha } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';

interface ChatWindowProps {
  chat: { sender: string; text: string }[];
  loading: boolean;
  typing: boolean;
  onSendMessage: (message: string) => void;
  lastMessageRef?: React.RefObject<HTMLDivElement | null>;
}

// Definição da animação com keyframes do MUI
const typingAnimation = keyframes`
  0% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(-5px); opacity: 1; }
  100% { transform: translateY(0); opacity: 0.6; }
`;

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, loading, typing, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const theme = useTheme(); // Adiciona o hook useTheme

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage('');
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Container de Mensagens */}
      <Box
        ref={chatRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: '10px',
          scrollBehavior: 'smooth',
          bgcolor: theme.palette.background.paper,
        }}
      >
        {chat.map((msg, index) => (
          <Message
            key={index}
            sender={msg.sender === 'Você' ? 'Você' : 'Assistente'}
            text={msg.text}
          />
        ))}
        {typing && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              ml: '15px',
              mt: '5px',
            }}
          >
            {[...Array(3)].map((_, i) => (
              <Box
                key={i}
                component="span"
                sx={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: theme.palette.text.secondary, // Usando cor do tema
                  borderRadius: '50%',
                  mx: '3px',
                  animation: `${typingAnimation} 1.2s infinite ease-in-out`,
                  animationDelay: `${0.2 * i}s`,
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Área de Input */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderTop: 1,
          borderColor: theme.palette.divider,
          p: '10px',
          bgcolor: theme.palette.background.paper,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder={loading ? 'Aguarde a resposta...' : 'Digite sua mensagem...'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={loading}
          sx={{ '& .MuiOutlinedInput-root': { pr: 1, borderRadius: theme.shape.borderRadius } }} // Arredonda borda do input
          InputProps={{
          sx: {
            bgcolor: theme.palette.background.paper, // Fundo do input agora igual ao Paper
            color: theme.palette.text.primary,       // Cor do texto
            '& fieldset': { borderColor: alpha(theme.palette.text.primary, 0.3) }, // Borda padrão
            '&:hover fieldset': { borderColor: theme.palette.primary.main },       // Hover
            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }, // Focus
          },
            inputProps: {
              style: { color: theme.palette.text.primary }, // Garante cor do texto no input
            },
          }}
          InputLabelProps={{
            sx: { color: theme.palette.text.secondary }, // Cor do placeholder/label
          }}
        />
        <IconButton 
          onClick={handleSendMessage} 
          color="primary" 
          disabled={loading || !message.trim()} 
          sx={{ ml: 1 }}
        >
          {loading 
            ? <CircularProgress size={24} sx={{ color: theme.palette.primary.main }} /> 
            : <SendIcon sx={{ color: theme.palette.primary.main }} />
          }
        </IconButton>

      </Box>
    </Box>
  );
};

export default ChatWindow;