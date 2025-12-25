import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./admin/layout/AdminLayout";
import AdminLogin from "./admin/layout/auth/AdminLogin";
import ProtectedRoute from "./admin/layout/auth/ProtectedRoute";

import Dashboard from "./admin/layout/pages/Dashboard";
import Products from "./admin/layout/pages/Products";
import Services from "./admin/layout/pages/Services";
import Gallery from "./admin/layout/pages/Gallery";
import Clients from "./admin/layout/pages/Clients";
import Enquiries from "./admin/layout/pages/Enquiries";

export default function AdminApp() {
  return (
    <Routes>
      {/* ✅ /admin or /admin/login → LOGIN PAGE */}
      <Route index element={<Navigate to="login" replace />} />
      <Route path="login" element={<AdminLogin />} />

      {/* 🔐 PROTECTED ADMIN (after login only) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="services" element={<Services />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="clients" element={<Clients />} />
        <Route path="enquiries" element={<Enquiries />} />
      </Route>
    </Routes>
  );
}
