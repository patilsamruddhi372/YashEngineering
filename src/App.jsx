import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserApp from "./UserApp";
import AdminApp from "./AdminApp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER WEBSITE */}
        <Route path="/*" element={<UserApp />} />

        {/* ADMIN PANEL */}
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  );
}
