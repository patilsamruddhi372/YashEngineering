import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid3X3, Camera } from 'lucide-react';
import { galleryImages } from '../data/Gallery';

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');

  // Get unique categories
  const categories = ['all', ...new Set(galleryImages.map((img) => img.category || 'other'))];

  // Filter images based on active category
  const filteredImages = activeFilter === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeFilter);

  // Handle image selection
  const handleSelect = (img, index) => {
    setSelected(img);
    setSelectedIndex(index);
  };

  // Navigate to previous image
  const handlePrev = useCallback((e) => {
    e.stopPropagation();
    const newIndex = selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelected(filteredImages[newIndex]);
  }, [selectedIndex, filteredImages]);

  // Navigate to next image
  const handleNext = useCallback((e) => {
    e.stopPropagation();
    const newIndex = selectedIndex === filteredImages.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelected(filteredImages[newIndex]);
  }, [selectedIndex, filteredImages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selected) return;
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'ArrowRight') handleNext(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, handlePrev, handleNext]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selected]);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
            <Camera className="w-4 h-4" />
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Project Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of completed projects showcasing our commitment 
            to excellence and attention to detail.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300
                ${activeFilter === category
                  ? 'bg-yellow-500 text-gray-900 shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200 hover:border-yellow-400'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl 
                         cursor-pointer shadow-sm hover:shadow-xl border-2 border-gray-200
                         hover:border-yellow-400 transition-all duration-500"
              onClick={() => handleSelect(img, index)}
            >
              {/* Image */}
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 
                           group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-all duration-300">
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 
                                group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {img.title}
                  </h3>
                  {img.category && (
                    <span className="inline-block px-3 py-1 bg-yellow-500 
                                     rounded-full text-sm text-gray-900 font-medium">
                      {img.category}
                    </span>
                  )}
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 p-3 bg-yellow-500 
                                rounded-lg opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300 transform scale-75 
                                group-hover:scale-100">
                  <ZoomIn className="w-5 h-5 text-gray-900" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <Grid3X3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No images found in this category</p>
          </div>
        )}

        {/* Image Count */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Showing <span className="font-semibold text-gray-900">{filteredImages.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{galleryImages.length}</span> projects
          </p>
        </div>

        {/* Lightbox Modal */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center 
                       justify-center z-50 animate-fadeIn"
            onClick={() => setSelected(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-yellow-500 
                         rounded-lg transition-all duration-300 group z-10"
              onClick={() => setSelected(null)}
            >
              <X className="w-6 h-6 text-white group-hover:text-gray-900 group-hover:rotate-90 transition-all duration-300" />
            </button>

            {/* Navigation - Previous */}
            <button
              className="absolute left-4 md:left-8 p-3 md:p-4 bg-white/10 hover:bg-yellow-500 
                         rounded-lg transition-all duration-300 group z-10
                         hover:scale-110"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-gray-900
                                       group-hover:-translate-x-1 transition-all" />
            </button>

            {/* Navigation - Next */}
            <button
              className="absolute right-4 md:right-8 p-3 md:p-4 bg-white/10 hover:bg-yellow-500 
                         rounded-lg transition-all duration-300 group z-10
                         hover:scale-110"
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-gray-900
                                        group-hover:translate-x-1 transition-all" />
            </button>

            {/* Image Container */}
            <div
              className="relative max-w-6xl max-h-[85vh] mx-4 animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.url}
                alt={selected.title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border-4 border-yellow-500/20"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 
                              bg-gradient-to-t from-black/90 to-transparent rounded-b-lg">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selected.title}
                </h3>
                <div className="flex items-center justify-between">
                  {selected.category && (
                    <span className="px-4 py-1.5 bg-yellow-500 
                                     rounded-full text-sm text-gray-900 font-semibold">
                      {selected.category}
                    </span>
                  )}
                  <span className="text-white/70 text-sm font-medium">
                    {selectedIndex + 1} / {filteredImages.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 
                            hidden md:flex gap-2 p-2 bg-black/50 backdrop-blur-sm rounded-lg">
              {filteredImages.slice(0, 8).map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(img, index);
                  }}
                  className={`w-16 h-12 rounded-lg overflow-hidden transition-all duration-300
                    ${selectedIndex === index 
                      ? 'ring-2 ring-yellow-500 scale-110' 
                      : 'opacity-50 hover:opacity-100'}`}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}