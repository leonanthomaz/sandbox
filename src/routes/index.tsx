// src/routes/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectView } from '../pages/ProjectView';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import { MainPortal } from '../pages/MainPortal';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPortal />} />

        {/* Acesso direto: /:projectId/:access */}
        <Route
          path="/:projectId/:access"
          element={
            <ProtectedRoute>
              <ProjectView />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
