// src/routes/ProtectedRoute.tsx
import { useParams } from 'react-router-dom';
import { isTokenValid, clearToken, validateEntryPath, acceptEntry } from '../utils/access';
import NotFound from '../pages/NotFound';
import type { JSX } from '@emotion/react/jsx-runtime';

type Props = { children: JSX.Element };

export default function ProtectedRoute({ children }: Props) {
  const { access } = useParams<{ access: string }>();

  // já tem token válido?
  if (isTokenValid()) return children;

  // limpa lixo antigo
  clearToken();

  // valida hash direto pelo param
  if (validateEntryPath(access)) {
    acceptEntry();
    return children;
  }

  return <NotFound />;
}
