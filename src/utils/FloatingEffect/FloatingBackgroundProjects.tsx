// src/components/FloatingBackgroundProjects.tsx
import { Container, FloatingIcon, TransitionTop, TransitionBottom } from "./FloatingBackgroundBase";
import { FaCode, FaProjectDiagram, FaGithub } from "react-icons/fa";

export const FloatingBackgroundProjects = () => {
  return (
    <Container>
      {/* Código */}
      <FloatingIcon sx={{
        top: "20%", left: "30%",
        "--x-mid1": "15px", "--y-mid1": "-20px",
        "--x-mid2": "-25px", "--y-mid2": "10px",
        "--x-mid3": "20px", "--y-mid3": "-15px",
        "--animation-duration": "18s",
      }}>
        <FaCode />
      </FloatingIcon>

      {/* Estrutura de projeto */}
      <FloatingIcon sx={{
        top: "55%", right: "28%",
        "--x-mid1": "-20px", "--y-mid1": "25px",
        "--x-mid2": "15px", "--y-mid2": "-20px",
        "--x-mid3": "-10px", "--y-mid3": "20px",
        "--animation-duration": "20s",
      }}>
        <FaProjectDiagram />
      </FloatingIcon>

      {/* GitHub (colaboração / repositórios) */}
      <FloatingIcon sx={{
        bottom: "15%", left: "50%",
        "--x-mid1": "10px", "--y-mid1": "-25px",
        "--x-mid2": "-20px", "--y-mid2": "15px",
        "--x-mid3": "25px", "--y-mid3": "-10px",
        "--animation-duration": "19s",
      }}>
        <FaGithub />
      </FloatingIcon>

      <TransitionTop />
      <TransitionBottom />
    </Container>
  );
};
