// src/routes/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPortal } from '../pages/MainPortal';
import { ProjectView } from '../pages/ProjectView';
import NotFound from '../pages/NotFound';
import RootGate from '../components/RootGate';
import ProtectedRoute from './ProtectedRoute';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* rotas específicas (protegidas por token) */}
        <Route
          path="/project/:projectId"
          element={
            <ProtectedRoute>
              <ProjectView />
            </ProtectedRoute>
          }
        />

        {/* porta de entrada: aceita /:access OR / (se token válido) */}
        <Route path="/:access" element={<RootGate><MainPortal /></RootGate>} />
        <Route path="/" element={<RootGate><MainPortal /></RootGate>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
