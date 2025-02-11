import { Routes, Route, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { LoginPage } from "pages/LoginPage";
import { RegisterPage } from "pages/RegisterPage";

export function App(): ReactNode {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
