import { Avatar, Typography, Box, useTheme } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';

interface MessageProps {
  sender: 'Você' | 'Assistente';
  text: string;
}

const Message = ({ sender, text }: MessageProps) => {
  const isSender = sender === 'Você';
  const theme = useTheme();

  const containerSx: BoxProps['sx'] = {
    display: 'flex',
    alignItems: 'flex-start',
    mb: theme.spacing(1.5),
    flexDirection: isSender ? 'row-reverse' : 'row',
  };

  const textSx: BoxProps['sx'] = {
    backgroundColor: isSender
      ? theme.palette.primary.light 
      : theme.palette.background.default,
    color: isSender ? '#121212' : theme.palette.text.primary,
    padding: theme.spacing(1.5, 2.5),
    borderRadius: theme.shape.borderRadius,
    maxWidth: '70%',
    wordBreak: 'break-word',
    boxShadow: `0px 2px 6px ${
      theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'
    }`,
  };

  const avatarSx: BoxProps['sx'] = {
    mx: theme.spacing(1),
    width: 32,
    height: 32,
  };


  return (
    <Box sx={containerSx}>
      <Avatar sx={avatarSx} src={isSender ? '/user.png' : '/assistant.png'} />
      <Typography variant="body2" sx={textSx}>
        {text}
      </Typography>
    </Box>
  );
};

export default Message;