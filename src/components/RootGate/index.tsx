// src/components/RootGate.tsx
import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { acceptEntry, clearToken, isTokenValid, validateEntryPath } from '../../utils/access';
import type { JSX } from '@emotion/react/jsx-runtime';
import NotFound from '../../pages/NotFound';

type Props = { children: JSX.Element };

/**
 * RootGate: protege a entrada principal.
 * - Aceita: /{access} (ex: /S3nh4Top) OR token válido no localStorage.
 * - Se aceitar via path, gera token e redireciona para "/".
 * - Se não aceitar, mostra NotFound.
 */
export default function RootGate({ children }: Props) {
  const { access } = useParams<{ access?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'checking' | 'ok' | 'denied'>('checking');

  useEffect(() => {
    // se já tem token válido, libera direto
    if (isTokenValid()) {
      setStatus('ok');
      return;
    }

    // limpa token velho (se houver) e tenta validar via path param
    clearToken();

    // access pode vir de useParams (quando rota for "/:access") ou da primeira parte do pathname
    const pathAccess = access ?? location.pathname.split('/')[1] ?? undefined;

    if (validateEntryPath(pathAccess)) {
      acceptEntry();                // gera token (salva no localStorage)
      navigate('/', { replace: true }); // limpa a URL (remove o /S3nh4Top)
      setStatus('ok');
      return;
    }

    // sem token e sem access válido -> negar
    setStatus('denied');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access, location.pathname]);

  if (status === 'checking') return null; // pode colocar loader se quiser

  if (status === 'ok') return children;

  return <NotFound />;
}
