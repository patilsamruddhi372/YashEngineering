import { Routes, Route } from "react-router-dom";
import AdminLayout from "../admin/layout/AdminLayout";
import Dashboard from "../admin/pages/Dashboard";
import Products from "../admin/pages/Products";
import Services from "../admin/pages/Services";
import Gallery from "../admin/pages/Gallery";
import Clients from "../admin/pages/Clients";
import Enquiries from "../admin/pages/Enquiries";
import AdminLogin from "../admin/auth/AdminLogin";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
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
