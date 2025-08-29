// src/routes/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectView } from '../pages/ProjectView';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import { MainPortal } from '../pages/MainPortal';
import ChatTestPage from '../pages/ChatView';
import { CredentialsPage } from '../pages/CredentialsPage';
import { ProjectTreePage } from '../pages/TreePage';

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

        <Route path='/sandbox/chat' element={<ProtectedRoute><ChatTestPage /></ProtectedRoute>}/>
        
        <Route
          path="/:projectId/credentials"
          element={
            <ProtectedRoute>
              <CredentialsPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/:projectId/tree"
          element={
            <ProtectedRoute>
              <ProjectTreePage />
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
