// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Button,
//   Box,
//   Card,
//   CardContent,
//   useTheme,
//   Fade,
//   Stack
// } from '@mui/material';
// import {
//   Launch,
//   Description,
//   Link as LinkIcon,
//   GitHub as GitHubIcon
// } from '@mui/icons-material';
// import { projectsData } from '../../data';
// import { useGlobal } from '../../context/GlobalContext';
// import { ProjectActionsCard } from '../../components/ProjectActionsCard';
// import { ProjectHeader } from '../../components/Header';

// export const ProjectView: React.FC = () => {
//   const { projectId } = useParams<{ projectId: string }>();
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const { setLoading } = useGlobal();
  
//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const project = projectId ? projectsData[projectId as keyof typeof projectsData] : null;

//   // Verifica se é o sandbox do chatbot
//   const isChatSandbox = projectId === 'chatbot';

//   if (!project && !isChatSandbox) {
//     return (
//       <Container>
//         <Typography variant="h4" color="error">Projeto não encontrado</Typography>
//       </Container>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         bgcolor: theme.palette.background.default,
//         display: 'flex',
//         flexDirection: 'column'
//       }}
//     >
//       {/* Header Component */}
//       {isChatSandbox ? (
//         <ProjectHeader
//           title="Chatbot Sandbox"
//           description="Ambiente de testes para desenvolvimento e validação de chatbots"
//           gradientColors={{
//             start: theme.palette.primary.main,
//             end: theme.palette.secondary.main
//           }}
//           isChatSandbox={true}
//           backButton={{ text: 'Início', path: '/' }}
//         />
//       ) : project ? (
//         <ProjectHeader
//           title={project.title}
//           description={project.description}
//           backButton={{ text: 'Início', path: '/' }}
//         />
//       ) : null}

//       {/* Conteúdo */}
//       <Container
//         maxWidth="lg"
//         sx={{
//           py: 6,
//           flex: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center'
//         }}
//       >
//         <Fade in timeout={700}>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: { xs: 'column', md: 'row' },
//               gap: 4,
//               mb: 4,
//               alignItems: 'flex-start'
//             }}
//           >
//             {/* Acesso Rápido */}
//             <Box sx={{ width: { xs: '100%', md: '40%' } }}>
//               <Card
//                 elevation={3}
//                 sx={{
//                   borderRadius: 3,
//                   bgcolor: theme.palette.background.paper,
//                   border: `1px solid ${theme.palette.divider}`,
//                   boxShadow: theme.shadows[6]
//                 }}
//               >
//                 <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                     <LinkIcon color="primary" sx={{ mr: 2 }} />
//                     <Typography variant="h5" fontWeight={700}>
//                       Acesso Rápido
//                     </Typography>
//                   </Box>

//                   <Stack spacing={2}>
//                     {isChatSandbox ? (
//                       <>
//                         <Button
//                           variant="contained"
//                           onClick={() => navigate('/sandbox/chat')}
//                           fullWidth
//                           size="large"
//                           startIcon={<Launch />}
//                           sx={{
//                             py: 2,
//                             fontSize: '1.05rem',
//                             fontWeight: 700,
//                             backgroundColor: theme.palette.primary.main,
//                             color: theme.palette.primary.contrastText,
//                             '&:hover': {
//                               backgroundColor: theme.palette.primary.dark,
//                               transform: 'translateY(-2px)',
//                               boxShadow: '0 6px 18px rgba(105, 240, 174, 0.4)'
//                             }
//                           }}
//                         >
//                           Acessar Sandbox
//                         </Button>
//                         {
//                           project?.githubUrl && (
//                             <Button
//                               variant="outlined"
//                               href={`${project.githubUrl}`}
//                               target="_blank"
//                               fullWidth
//                               size="large"
//                               startIcon={<GitHubIcon />}
//                               sx={{
//                                 py: 2,
//                                 fontSize: '1.05rem',
//                                 fontWeight: 700,
//                                 borderColor: theme.palette.text.primary,
//                                 color: theme.palette.text.primary,
//                                 '&:hover': {
//                                   borderWidth: 2,
//                                   transform: 'translateY(-2px)',
//                                   borderColor: theme.palette.primary.main,
//                                   color: theme.palette.primary.main
//                                 },
//                               }}
//                             >
//                               Acessar Repositório
//                             </Button>
//                           )
//                         }
//                       </>
                      
//                     ) : (
//                       <>
//                         {project?.demoUrl && (
//                           <Button
//                             variant="contained"
//                             href={project.demoUrl}
//                             target="_blank"
//                             fullWidth
//                             size="large"
//                             startIcon={<Launch />}
//                             sx={{
//                               py: 2,
//                               fontSize: '1.05rem',
//                               fontWeight: 700,
//                               backgroundColor: theme.palette.primary.main,
//                               color: theme.palette.primary.contrastText,
//                               '&:hover': {
//                                 backgroundColor: theme.palette.primary.dark,
//                                 transform: 'translateY(-2px)',
//                                 boxShadow: '0 6px 18px rgba(105, 240, 174, 0.4)'
//                               }
//                             }}
//                           >
//                             Acessar Site
//                           </Button>
//                         )}

//                         {project?.apiDocs && (
//                           <Button
//                             variant="outlined"
//                             href={project.apiDocs}
//                             target="_blank"
//                             fullWidth
//                             size="large"
//                             startIcon={<Description />}
//                             sx={{
//                               py: 2,
//                               fontSize: '1.05rem',
//                               fontWeight: 700,
//                               borderWidth: 2,
//                               borderColor: theme.palette.primary.light,
//                               color: theme.palette.primary.light,
//                               '&:hover': {
//                                 borderWidth: 2,
//                                 transform: 'translateY(-2px)',
//                                 borderColor: theme.palette.primary.main
//                               }
//                             }}
//                           >
//                             API Documentation
//                           </Button>
//                         )}

//                         {
//                           project?.githubUrl && (
//                             <Button
//                               variant="outlined"
//                               href={`${project.githubUrl}`}
//                               target="_blank"
//                               fullWidth
//                               size="large"
//                               startIcon={<GitHubIcon />}
//                               sx={{
//                                 py: 2,
//                                 fontSize: '1.05rem',
//                                 fontWeight: 700,
//                                 borderColor: theme.palette.text.primary,
//                                 color: theme.palette.text.primary,
//                                 '&:hover': {
//                                   borderWidth: 2,
//                                   transform: 'translateY(-2px)',
//                                   borderColor: theme.palette.primary.main,
//                                   color: theme.palette.primary.main
//                                 },
//                               }}
//                             >
//                               Acessar Repositório
//                             </Button>
//                           )
//                         }
//                       </>
//                     )}
//                   </Stack>
//                 </CardContent>
//               </Card>            
//             </Box>

//             {/* Card da Direita - Painel de Ações */}
//             <Box sx={{ width: { xs: '100%', md: '60%' } }}>
//               {projectId && <ProjectActionsCard projectId={projectId} />}
//             </Box>
//           </Box>
//         </Fade>
//       </Container>
//     </Box>
//   );
// };