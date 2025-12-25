import { Zap, Phone, Mail, MapPin } from "lucide-react";

export default function Footer({ scrollToSection }) {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        
        {/* Company Info */}
        <div>
          <div className="flex items-center mb-4">
            <Zap className="h-8 w-8 text-yellow-400" />
            <h3 className="ml-2 text-xl font-bold">Yash Engineering</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Trusted electrical engineering solutions since 1992.  
            Specialized in industrial electrification, control panels, and automation.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {["home", "about", "products", "services", "contact"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className="hover:text-yellow-400 transition"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-yellow-400 mt-0.5" />
              Kupwad MIDC, Sangli, Maharashtra
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-yellow-400" />
              +91 9518764038
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-yellow-400" />
              info@yashengineering.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Yash Engineering. All rights reserved.
      </div>
    </footer>
  );
}
