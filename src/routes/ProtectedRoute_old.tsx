// // src/components/ProtectedRoute.tsx
// import { Navigate, useLocation } from 'react-router-dom';
// import { isTokenValid } from '../utils/access';
// import type { JSX } from '@emotion/react/jsx-runtime';

// interface ProtectedRouteProps {
//   children: JSX.Element;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const ok = isTokenValid();
//   const location = useLocation();

//   if (!ok) {
//     // manda pro root — lá só entra quem tiver token ou usar /<hash>
//     return <Navigate to="/" replace state={{ from: location }} />;
//   }

//   return children;
// }
