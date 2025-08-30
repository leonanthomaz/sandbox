// src/components/FloatingBackgroundBase.tsx
import { Box, styled, alpha, keyframes } from "@mui/material";

const moveParticle = keyframes`
  0%, 100% {
    transform: translate(var(--x-start), var(--y-start)) rotate(var(--rotate-start, 0deg));
  }
  25% {
    transform: translate(var(--x-mid1), var(--y-mid1)) rotate(var(--rotate-mid1, 5deg));
  }
  50% {
    transform: translate(var(--x-mid2), var(--y-mid2)) rotate(var(--rotate-mid2, -5deg));
  }
  75% {
    transform: translate(var(--x-mid3), var(--y-mid3)) rotate(var(--rotate-mid3, 2deg));
  }
`;

export const Container = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  background: theme.palette.background.default ?? "#000",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: `
      radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 50%)
    `,
    zIndex: 1,
  },
}));

export const FloatingIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  color: alpha(theme.palette.secondary.main, 0.08),
  fontSize: "clamp(5rem, 15vw, 12rem)",
  zIndex: 0,
  animation: `${moveParticle} var(--animation-duration, 15s) infinite ease-in-out`,
}));

export const TransitionTop = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "200px",
  background: `linear-gradient(to bottom, ${theme.palette.background.default} 20%, transparent)`,
  zIndex: 2,
  pointerEvents: "none",
}));

export const TransitionBottom = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "200px",
  background: `linear-gradient(to top, ${theme.palette.background.default} 20%, transparent)`,
  zIndex: 2,
  pointerEvents: "none",
}));
