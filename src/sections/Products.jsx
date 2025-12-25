import { 
  Factory,
  Zap,
  Shield,
  Settings,
  CheckCircle,
  Star,
  ArrowRight,
  Info,
  FileText,
  Phone,
  Download,
  Eye,
  Award,
  Boxes,
  Grid3x3,
  List,
  Filter,
  TrendingUp,
  Package,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { products } from '../data/Products';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Define categories based on your products
  const categories = [
    { id: 'all', name: 'All Products', icon: Boxes },
    { id: 'control-panels', name: 'Control Panels', icon: Settings },
    { id: 'electrical', name: 'Electrical Systems', icon: Zap },
    { id: 'automation', name: 'Automation', icon: TrendingUp },
    { id: 'custom', name: 'Custom Solutions', icon: Package },
  ];

  // Filter products based on category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Product features/badges
  const getProductBadges = (product) => {
    const badges = [];
    if (product.featured) badges.push({ text: 'Featured', color: 'yellow' });
    if (product.certified) badges.push({ text: 'ISO Certified', color: 'green' });
    if (product.custom) badges.push({ text: 'Customizable', color: 'blue' });
    if (product.popular) badges.push({ text: 'Popular', color: 'orange' });
    return badges;
  };

  const badgeColors = {
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    green: 'bg-green-100 text-green-700 border-green-300',
    blue: 'bg-blue-100 text-blue-700 border-blue-300',
    orange: 'bg-orange-100 text-orange-700 border-orange-300',
  };

  return (
    <section id="products" className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-slate-900/5 to-slate-800/5 border border-slate-900/10 rounded-full px-4 py-2 mb-6">
            <Package className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-semibold text-slate-700">Our Product Range</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Engineered for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600">
              Excellence
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of industrial electrical solutions, 
            control panels, and automation systems designed to meet your specific needs.
          </p>
        </div>

        {/* Category Filters & View Toggle */}
        <div className="mb-10">
          {/* Desktop Tabs */}
          <div className="hidden md:flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 shadow-md border border-gray-200">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-400/30'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.name}</span>
                    {activeCategory === category.id && (
                      <span className="bg-white text-slate-900 text-xs px-2 py-0.5 rounded-full font-bold">
                        {activeCategory === 'all' ? products.length : filteredProducts.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-lg p-1.5 shadow-md border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-slate-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="Grid View"
              >
                <Grid3x3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-slate-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="List View"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          <div className="md:hidden mb-6">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full bg-white border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 font-semibold text-slate-900 appearance-none cursor-pointer focus:border-yellow-400 focus:outline-none"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-gray-600 border-b border-gray-200 pb-4">
            <span>
              Showing <strong className="text-slate-900">{filteredProducts.length}</strong> product
              {filteredProducts.length !== 1 ? 's' : ''}
              {activeCategory !== 'all' && (
                <span> in <strong className="text-yellow-600">
                  {categories.find(c => c.id === activeCategory)?.name}
                </strong></span>
              )}
            </span>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8' 
            : 'space-y-6'
        }>
          {filteredProducts.map((product, index) => {
            const badges = getProductBadges(product);
            
            if (viewMode === 'list') {
              // List View Layout
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-200 hover:border-yellow-400/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative md:w-80 h-64 md:h-auto overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img
                        src={product.img || '/api/placeholder/400/300'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {badges.length > 0 && (
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {badges.map((badge, i) => (
                            <span
                              key={i}
                              className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeColors[badge.color]} backdrop-blur-sm`}
                            >
                              {badge.text}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {product.desc}
                        </p>
                        
                        {/* Features */}
                        {product.features && (
                          <div className="space-y-2 mb-4">
                            {product.features.slice(0, 3).map((feature, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                        <button className="flex-1 sm:flex-none bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-yellow-400/30 transition-all hover:scale-105">
                          <span className="flex items-center justify-center gap-2">
                            <FileText className="h-4 w-4" />
                            Get Quote
                          </span>
                        </button>
                        <button className="flex-1 sm:flex-none border-2 border-slate-900 text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-slate-900 hover:text-white transition-all">
                          <span className="flex items-center justify-center gap-2">
                            <Info className="h-4 w-4" />
                            Details
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Grid View Layout
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-200 hover:border-yellow-400/50 transition-all duration-300 overflow-hidden hover:-translate-y-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={product.img || '/api/placeholder/400/300'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  {badges.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {badges.map((badge, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeColors[badge.color]} backdrop-blur-sm`}
                        >
                          {badge.text}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="h-4 w-4" />
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-yellow-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {product.desc}
                  </p>

                  {/* Features (if available) */}
                  {product.features && product.features.length > 0 && (
                    <div className="space-y-1.5 mb-4">
                      {product.features.slice(0, 2).map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-700 line-clamp-1">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Rating/Certification */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    {product.certified && (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <Award className="h-4 w-4" />
                        <span className="font-semibold">ISO Certified</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-2.5 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-yellow-400/30 transition-all hover:scale-105">
                      Get Quote
                    </button>
                    <button className="border-2 border-slate-900 text-slate-900 p-2.5 rounded-lg hover:bg-slate-900 hover:text-white transition-all group/btn">
                      <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <Package className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try selecting a different category
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-yellow-400/30 transition-all"
            >
              View All Products
            </button>
          </div>
        )}

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/10 rounded-full mb-6">
              <Settings className="h-8 w-8 text-yellow-400" />
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Need a Custom Solution?
            </h3>
            
            <p className="text-lg text-gray-300 mb-8">
              Our expert team can design and manufacture control panels and electrical systems 
              tailored to your exact specifications.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-yellow-400/50 transition-all hover:scale-105">
                <span className="flex items-center justify-center gap-2">
                  <FileText className="h-5 w-5" />
                  Request Custom Quote
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <a
                href="tel:+919876543210"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Talk to Expert
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-10 pt-8 border-t border-white/10">
              {[
                { icon: Shield, text: 'Quality Assured' },
                { icon: Award, text: 'ISO Certified' },
                { icon: CheckCircle, text: 'Custom Design' },
                { icon: Phone, text: '24/7 Support' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-2 text-gray-300">
                    <Icon className="h-5 w-5 text-yellow-400" />
                    <span className="font-semibold">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}