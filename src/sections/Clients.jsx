import { useState } from 'react';
import { clients } from '../data/Clients';
import { Building2, CheckCircle, Users, Award } from 'lucide-react';

export default function Clients() {
  // How many clients to show initially
  const INITIAL_VISIBLE_CLIENTS = 8;

  const [showAllClients, setShowAllClients] = useState(false);

  // Stats for credibility
  const stats = [
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: CheckCircle, value: '1000+', label: 'Projects Completed' },
    { icon: Award, value: '15+', label: 'Years Experience' },
  ];

  const visibleClients = showAllClients
    ? clients
    : clients.slice(0, INITIAL_VISIBLE_CLIENTS);

  const hasMoreClients = clients.length > INITIAL_VISIBLE_CLIENTS;

  return (
    <section id="clients" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
            Trusted Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Valued Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're proud to partner with industry leaders who trust us to deliver 
            exceptional results and drive their success forward.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-sm border-2 border-gray-200 hover:border-yellow-400 transition-all duration-300"
            >
              <div className="p-3 bg-yellow-50 rounded-lg mb-4">
                <stat.icon className="w-8 h-8 text-yellow-600" />
              </div>
              <span className="text-4xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-gray-600 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleClients.map((client, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-xl border-2 border-gray-200 
                         shadow-sm hover:shadow-lg hover:border-yellow-400 
                         transition-all duration-300 ease-in-out
                         hover:-translate-y-1"
            >
              {/* Decorative gradient on hover */}
              <div className="absolute inset-0 bg-yellow-50/50 
                              opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
              
              <div className="relative flex flex-col items-center">
                {/* Icon/Logo Container */}
                <div className="w-16 h-16 bg-gray-900 
                                rounded-lg flex items-center justify-center mb-4
                                group-hover:bg-yellow-500 transition-all duration-300
                                shadow-md">
                  <Building2 className="w-8 h-8 text-yellow-500 group-hover:text-gray-900 transition-colors" />
                </div>
                
                {/* Client Name */}
                <h3 className="font-semibold text-gray-900 text-center text-lg group-hover:text-yellow-600 transition-colors">
                  {client}
                </h3>
                
                {/* Optional: Industry Tag */}
                <span className="mt-2 text-sm text-gray-500 group-hover:text-yellow-600 
                                 transition-colors duration-300">
                  Enterprise Partner
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* See More / Show Less button */}
        {hasMoreClients && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAllClients((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white 
                         font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900
                         transition-all duration-300 shadow-md hover:shadow-lg
                         hover:-translate-y-0.5"
            >
              {showAllClients ? 'Show Less Clients' : 'See More Clients'}
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  showAllClients ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Join our growing list of satisfied clients
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-gray-900 
                       font-semibold rounded-lg hover:bg-gray-900 hover:text-white
                       transition-all duration-300 shadow-md
                       hover:shadow-lg hover:-translate-y-0.5"
          >
            Become a Partner
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}