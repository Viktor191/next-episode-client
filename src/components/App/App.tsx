import { Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import { routes } from "src/routes";

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route) => {
          const Component = React.lazy(() =>
            import(`../../pages/${route.component}`).then((module) => ({
              default: module[route.component],
            }))
          );

          return (
            <Route key={route.path} path={route.path} element={<Component />} />
          );
        })}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};
