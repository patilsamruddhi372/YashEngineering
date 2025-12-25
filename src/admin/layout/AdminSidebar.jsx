import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  Image, 
  Users, 
  Mail, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";
import { useState } from "react";

const menu = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Services", path: "/admin/services", icon: Settings },
  { name: "Gallery", path: "/admin/gallery", icon: Image },
  { name: "Clients", path: "/admin/clients", icon: Users },
  { name: "Enquiries", path: "/admin/enquiries", icon: Mail },
];

export default function AdminSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (!confirmLogout) return;
    
    localStorage.removeItem("adminAuth");
    window.location.href = "/admin/login";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-yellow-400 hover:bg-slate-800 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 transition-opacity"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-slate-900 text-white flex flex-col h-screen overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          lg:transform-none
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 font-bold text-lg sm:text-xl border-b border-slate-700 flex items-center justify-between">
          <span>Yash Admin</span>
          {/* Close button for mobile */}
          <button
            onClick={closeMobileMenu}
            className="lg:hidden p-1 hover:bg-slate-800 rounded transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 sm:p-4 space-y-1 sm:space-y-2 flex-1">
          {menu.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-sm sm:text-base transition-colors ${
                  isActive 
                    ? "bg-yellow-400 text-slate-900 font-semibold shadow-lg" 
                    : "hover:bg-slate-800 text-slate-200"
                }`
              }
            >
              <Icon size={18} className="flex-shrink-0" />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="m-3 sm:m-4 flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-red-400 hover:text-red-300 transition-colors border border-slate-700 hover:border-red-500 font-medium"
        >
          <LogOut size={18} className="flex-shrink-0" />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}