// AdminLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import AdminSidebar from "./AdminSidebar";
// import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  const scrollRef = useRef(null);
  const location = useLocation();

  // Scroll the content area to top on route change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar stays fixed */}
      <AdminSidebar />

      {/* Right side: scrollable content */}
      <div
        ref={scrollRef}
        className="flex-1 flex flex-col h-full overflow-y-auto"
      >
        {/* <AdminHeader /> */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}