import { Menu, X, Zap, Download } from "lucide-react";

export default function Navbar({
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  scrollToSection,
}) {
  const navItems = [
    "Home",
    "About",
    "Products",
    "Services",
    "Clients",
    "Gallery",
    "Contact",
  ];

  return (
    <nav className="bg-slate-950 text-white fixed w-full top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <Zap className="h-8 w-8 text-yellow-400" />
            <span className="ml-2 text-xl font-bold tracking-wide">
              Yash Engineering
            </span>
          </div>

          {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 ml-auto">


            {navItems.map((item) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`relative text-sm font-medium transition-colors ${
                    isActive
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  {item}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400 rounded-full"></span>
                  )}
                </button>
              );
            })}

            {/* ⭐ Download Button (Desktop) */}
            <a
              href="/brochure.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition"
            >
              <Download size={16} />
              Download  Brochure
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded hover:bg-slate-800 transition"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">

          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`block w-full text-left px-6 py-3 text-sm transition ${
                activeSection === item.toLowerCase()
                  ? "text-yellow-400 bg-slate-900"
                  : "text-gray-300 hover:bg-slate-700 hover:text-yellow-400"
              }`}
            >
              {item}
            </button>
          ))}

          {/* ⭐ Download (Mobile) */}
          <a
            href="/brochure.pdf"
            download
            className="block w-full px-6 py-3 text-sm bg-slate-900 text-yellow-400 flex items-center gap-2"
          >
            <Download size={16} />
            Download
          </a>
        </div>
      )}
    </nav>
  );
}
