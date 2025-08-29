import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  alpha,
  keyframes,
  styled,
  Button,
  Container
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Email,
  Phone,
  Launch,
} from '@mui/icons-material';
import minhaFoto from '@/assets/img/foto-leonan.jpg';
import { useGlobal } from '../../context/GlobalContext';
import Loading from '../../components/Loading';

// Animações
const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Componentes estilizados
const FullScreenContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.05)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 15% 25%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 40%),
      radial-gradient(circle at 85% 75%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 40%)
    `,
    zIndex: 1,
  },
}));

const FloatingShape = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.15)})`,
  animation: `${float} 15s ease-in-out infinite`,
  zIndex: 0,
  '&:nth-of-type(1)': {
    width: '250px',
    height: '250px',
    top: '15%',
    left: '10%',
    animationDelay: '0s',
    opacity: 0.3,
  },
  '&:nth-of-type(2)': {
    width: '180px',
    height: '180px',
    bottom: '20%',
    right: '12%',
    animationDelay: '3s',
    opacity: 0.25,
  },
}));

const RotatingCircle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '500px',
  height: '500px',
  border: `1px dashed ${alpha(theme.palette.primary.main, 0.15)}`,
  borderRadius: '50%',
  animation: `${rotate} 80s linear infinite`,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 0,
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(8),
  padding: theme.spacing(4),
  position: 'relative',
  zIndex: 2,
  maxWidth: '1200px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
    gap: theme.spacing(4),
  },
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    flex: '0 0 40%',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  aspectRatio: '1',
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.25)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.35)}`,
  },

  // responsividade
  maxWidth: '380px', // desktop
  [theme.breakpoints.down('md')]: {
    maxWidth: '280px', // tablet
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '180px', // celular
  },
}));


const InfoContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    flex: '0 0 50%',
  },
}));

const NameContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row', // garante que vai ser linha
  flexWrap: 'nowrap',   // impede de quebrar pra baixo
  alignItems: 'baseline', // deixa na mesma linha visual
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2), // espaço entre nome e sobrenome
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
}));


const FirstName = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.8rem, 7vw, 5rem)',
  fontWeight: 900,
  color: theme.palette.primary.main,
  fontFamily: "'Inter', sans-serif",
  lineHeight: 1,
  textShadow: `0 2px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
}));

const LastName = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.8rem, 7vw, 5rem)',
  fontWeight: 900,
  color: theme.palette.secondary.main,
  fontFamily: "'Inter', sans-serif",
  lineHeight: 1,
  textShadow: `0 2px 10px ${alpha(theme.palette.secondary.main, 0.3)}`,
}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
  fontFamily: "'Inter', sans-serif",
}));

const SocialContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center', // centraliza horizontalmente
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-start', // em telas grandes, volta a alinhar à esquerda (se quiser)
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  transition: 'all 0.3s ease',
  padding: theme.spacing(1.5),
  '&:hover': { 
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transform: 'translateY(-3px)',
    boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '1rem',
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

export const MainPortal: React.FC = () => {

  const { isLoading } = useGlobal();

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }
  
  const handleContact = (method: string) => {
    switch(method) {
      case 'whatsapp':
        window.open('https://wa.me/5521998090928', '_blank');
        break;
      case 'email':
        window.location.href = 'mailto:leonan.thomaz@email.com';
        break;
      case 'github':
        window.open('https://github.com/leonanthomaz', '_blank');
        break;
      case 'linkedin':
        window.open('https://linkedin.com/in/leonanthomaz', '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <FullScreenContainer>
      {/* Elementos de fundo abstratos */}
      <FloatingShape />
      <FloatingShape />
      <RotatingCircle />
      
      <ContentContainer>
        <AvatarContainer>
          <StyledAvatar
            src={minhaFoto}
            alt="Leonan Thomaz"
          />
        </AvatarContainer>
        
        <InfoContainer>
          <NameContainer>
            <FirstName>LEONAN</FirstName>
            <LastName>THOMAZ</LastName>
          </NameContainer>
          
          <TitleText>
            Desenvolvedor Python
          </TitleText>
          
          <Typography variant="body1" sx={{ 
            color: 'text.secondary', 
            lineHeight: 1.7,
            mb: 4,
            fontSize: '1.1rem',
            maxWidth: '500px'
          }}>
            Criando soluções inovadoras através de código limpo e eficiente. 
            Especializado em desenvolvimento backend e arquiteturas escaláveis.
          </Typography>
          
          <SocialContainer>
            {[
              { icon: <GitHub />, method: 'github', title: 'GitHub' },
              { icon: <LinkedIn />, method: 'linkedin', title: 'LinkedIn' },
              { icon: <Phone />, method: 'whatsapp', title: 'WhatsApp' },
              { icon: <Email />, method: 'email', title: 'Email' }
            ].map((item, index) => (
              <SocialButton 
                key={index}
                onClick={() => handleContact(item.method)} 
                size="large"
                title={item.title}
              >
                {item.icon}
              </SocialButton>
            ))}
          </SocialContainer>

          <Box>
            <ActionButton
              variant="contained"
              color="primary"
              endIcon={<Launch />}
              onClick={() => window.open('http://leonanthomaz.vercel.app', '_blank')}
            >
              Ver Portfolio
            </ActionButton>
            
            <ActionButton
              variant="outlined"
              color="primary"
              endIcon={<GitHub />}
              onClick={() => window.open('https://github.com/leonanthomaz', '_blank')}
              sx={{
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                }
              }}
            >
              Meu GitHub
            </ActionButton>
          </Box>
        </InfoContainer>
      </ContentContainer>
    </FullScreenContainer>
  );
};