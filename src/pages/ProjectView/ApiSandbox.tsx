// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Button,
//   Stack,
//   CircularProgress,
//   useTheme,
//   Alert,
// } from '@mui/material';
// import { Science, PlayArrow } from '@mui/icons-material';

// interface ApiSandboxProps {
//   projectId: string;
// }

// // Este componente precisa ser implementado com a lógica de requisição
// // e visualização da resposta da API.
// export const ApiSandbox: React.FC<ApiSandboxProps> = ({ projectId }) => {
//   const theme = useTheme();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [result, setResult] = useState<any>(null);

//   // Exemplo de cenários de teste - você precisará definir isso com base no seu projeto
//   const scenarios = [
//     {
//       id: 'get-users',
//       label: 'Listar Usuários',
//       description: 'Retorna uma lista de 50 usuários fictícios.',
//       endpoint: '/api/v1/users',
//       method: 'GET',
//     },
//     {
//       id: 'get-metrics',
//       label: 'Obter Métricas do Sistema',
//       description: 'Retorna estatísticas de uso em tempo real.',
//       endpoint: '/api/v1/metrics',
//       method: 'GET',
//     },
//   ];

//   const handleTestScenario = async (endpoint: string, method: string) => {
//     setLoading(true);
//     setError(null);
//     setResult(null);

//     try {
//       const response = await fetch(`http://localhost:3000${endpoint}`); // Substitua a URL base pela sua
//       if (!response.ok) {
//         throw new Error(`Erro: ${response.status} - ${response.statusText}`);
//       }
//       const data = await response.json();
//       setResult(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderResult = (data: any) => {
//     // Implemente a lógica de renderização visual aqui
//     // Ex: para 'get-users', você pode renderizar uma lista ou tabela
//     // Ex: para 'get-metrics', você pode renderizar um gráfico
//     return (
//       <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
//         <Typography variant="body2" sx={{ mb: 1, color: theme.palette.primary.main }}>
//           {`Status: Sucesso (200 OK)`}
//         </Typography>
//         <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
//           {JSON.stringify(data, null, 2)}
//         </Typography>
//       </Box>
//     );
//   };

//   return (
//     <Card
//       elevation={3}
//       sx={{
//         borderRadius: 3,
//         bgcolor: theme.palette.background.paper,
//         border: `1px solid ${theme.palette.divider}`,
//         boxShadow: theme.shadows[6],
//       }}
//     >
//       <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//           <Science color="primary" sx={{ mr: 2 }} />
//           <Typography variant="h5" fontWeight={700}>
//             Sandbox de API
//           </Typography>
//         </Box>
//         <Typography variant="body2" color="text.secondary">
//           Teste as principais funcionalidades da API através de cenários pré-definidos.
//         </Typography>

//         <Stack spacing={2} sx={{ mt: 3 }}>
//           {scenarios.map((scenario) => (
//             <Button
//               key={scenario.id}
//               onClick={() => handleTestScenario(scenario.endpoint, scenario.method)}
//               variant="outlined"
//               fullWidth
//               size="large"
//               disabled={loading}
//               startIcon={loading ? <CircularProgress size={20} /> : <PlayArrow />}
//               sx={{
//                 py: 2,
//                 fontSize: '1rem',
//                 fontWeight: 600,
//               }}
//             >
//               {scenario.label}
//             </Button>
//           ))}
//         </Stack>

//         {error && (
//           <Alert severity="error" sx={{ mt: 3 }}>
//             {error}
//           </Alert>
//         )}

//         {result && renderResult(result)}
//       </CardContent>
//     </Card>
//   );
// };