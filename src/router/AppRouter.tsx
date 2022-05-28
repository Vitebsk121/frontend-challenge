import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default AppRouter;
