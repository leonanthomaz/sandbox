// src/App.tsx
import React, { useEffect } from 'react';
import AppRoute from './routes';
import { useGlobal } from './context/GlobalContext';

export const App: React.FC = () => {

  const { setLoading } = useGlobal();

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return <AppRoute />;
};