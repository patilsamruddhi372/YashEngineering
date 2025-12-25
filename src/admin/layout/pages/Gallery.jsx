import { useState } from "react";
import {
  Image,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  Grid,
  LayoutGrid,
  AlertCircle,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Heart,
  Share2,
  Info,
  Check,
  ImagePlus,
  Folder,
  Calendar,
  HardDrive,
  MoreVertical,
  Maximize2,
  Copy,
  Camera
} from "lucide-react";
import { galleryImages as initialGalleryImages } from "../../../data/Gallery";

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState(initialGalleryImages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [gridSize, setGridSize] = useState("medium");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isSelectMode, setIsSelectMode] = useState(false);
  
  const [uploadPreviews, setUploadPreviews] = useState([]);
  const [uploadCategory, setUploadCategory] = useState("");
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editData, setEditData] = useState(null);

  const itemsPerPage = gridSize === "large" ? 8 : gridSize === "medium" ? 12 : 16;

  // Get unique categories
  const categories = ["All", ...new Set(galleryImages.map(img => img.category || "Uncategorized"))];

  // Filter images
  const filteredImages = galleryImages.filter(image => {
    const matchesSearch =
      image.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.alt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || (image.category || "Uncategorized") === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);

  // Grid size classes
  const getGridClasses = () => {
    switch (gridSize) {
      case "small":
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6";
      case "large":
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      default:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4";
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = [];

    files.forEach(file => {
      if (!file.type.startsWith("image/")) {
        alert("Please upload only image files");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("Image size should be less than 10MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push({
          url: reader.result,
          title: file.name.replace(/\.[^/.]+$/, ""),
          category: uploadCategory || "Uncategorized",
          alt: file.name,
          fileName: file.name
        });

        if (newPreviews.length === files.length) {
          setUploadPreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle upload submit
  const handleUploadSubmit = () => {
    if (uploadPreviews.length === 0) {
      alert("Please select images to upload");
      return;
    }

    setGalleryImages(prev => [...prev, ...uploadPreviews]);
    setUploadPreviews([]);
    setUploadCategory("");
    setShowUploadModal(false);
  };

  // Handle edit image file
  const handleEditImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("Image size should be less than 10MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result);
        setEditData(prev => ({ ...prev, url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle edit click
  const handleEditClick = (image) => {
    setSelectedImage(image);
    setEditData({ ...image });
    setEditImagePreview(image.url);
    setShowEditModal(true);
  };

  const handleEditSubmit = () => {
    if (!editData.title) {
      alert("Please enter a title");
      return;
    }

    setGalleryImages(prev =>
      prev.map(img => (img === selectedImage ? editData : img))
    );
    setShowEditModal(false);
    setEditData(null);
    setEditImagePreview(null);
    setSelectedImage(null);
  };

  // Handle image selection
  const toggleImageSelection = (image, index) => {
    const globalIndex = startIndex + index;
    if (selectedImages.includes(globalIndex)) {
      setSelectedImages(selectedImages.filter(id => id !== globalIndex));
    } else {
      setSelectedImages([...selectedImages, globalIndex]);
    }
  };

  // Handle lightbox open
  const openLightbox = (image, index) => {
    if (isSelectMode) {
      toggleImageSelection(image, index);
    } else {
      setSelectedImage(image);
      setLightboxIndex(startIndex + index);
      setShowLightbox(true);
    }
  };

  const navigateLightbox = (direction) => {
    const newIndex = lightboxIndex + direction;
    if (newIndex >= 0 && newIndex < filteredImages.length) {
      setLightboxIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    }
  };

  // Lightbox edit/delete helpers
  const handleLightboxEdit = () => {
    if (!selectedImage) return;
    setShowLightbox(false);
    handleEditClick(selectedImage);
  };

  const handleLightboxDelete = () => {
    if (!selectedImage) return;
    setShowLightbox(false);
    handleDelete(selectedImage);
  };

  // Handle delete
  const handleDelete = (image) => {
    setSelectedImage(image);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setGalleryImages(prev => prev.filter(img => img !== selectedImage));
    setShowDeleteModal(false);
    setSelectedImage(null);
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    const imagesToDelete = selectedImages.map(index => filteredImages[index - startIndex]);
    setGalleryImages(prev => prev.filter(img => !imagesToDelete.includes(img)));
    setSelectedImages([]);
    setIsSelectMode(false);
  };

  // Handle info modal
  const openInfoModal = (image) => {
    setSelectedImage(image);
    setShowInfoModal(true);
  };

  // Remove upload preview
  const removeUploadPreview = (index) => {
    setUploadPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Stats
  const stats = [
    {
      label: "Total Images",
      value: galleryImages.length,
      icon: Image,
      color: "text-black",
      bgColor: "bg-yellow-400"
    },
    {
      label: "Categories",
      value: categories.length - 1,
      icon: Folder,
      color: "text-black",
      bgColor: "bg-yellow-300"
    },
    {
      label: "This Month",
      value: 8,
      icon: Calendar,
      color: "text-black",
      bgColor: "bg-amber-400"
    },
    {
      label: "Storage Used",
      value: "2.4 GB",
      icon: HardDrive,
      color: "text-black",
      bgColor: "bg-orange-400"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-yellow-400 rounded-lg border-2 border-black">
              <Image className="w-6 h-6 text-black" />
            </div>
            Gallery
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your image collection ({galleryImages.length} images)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSelectMode && selectedImages.length > 0 && (
            <button 
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors border-2 border-black shadow-lg"
            >
              <Trash2 className="w-4 h-4" />
              Delete ({selectedImages.length})
            </button>
          )}
          <button
            onClick={() => {
              setIsSelectMode(!isSelectMode);
              setSelectedImages([]);
            }}
            className={`flex items-center gap-2 px-4 py-2 border-2 rounded-lg font-bold transition-colors ${
              isSelectMode 
                ? "border-black bg-yellow-400 text-black" 
                : "border-black text-black hover:bg-yellow-400"
            }`}
          >
            <Check className="w-4 h-4" />
            <span className="hidden sm:inline">Select</span>
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold transition-colors shadow-lg border-2 border-black"
          >
            <Plus className="w-4 h-4" />
            Upload Images
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-lg border-2 border-black hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border-2 border-black ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-black">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-8 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none appearance-none bg-white cursor-pointer min-w-[150px] font-medium"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Grid Size Toggle */}
          <div className="flex items-center bg-gray-200 rounded-lg p-1 border-2 border-black">
            <button
              onClick={() => setGridSize("small")}
              className={`p-2 rounded-md transition-colors ${
                gridSize === "small"
                  ? "bg-yellow-400 shadow-sm text-black border-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
              title="Small grid"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setGridSize("medium")}
              className={`p-2 rounded-md transition-colors ${
                gridSize === "medium"
                  ? "bg-yellow-400 shadow-sm text-black border-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
              title="Medium grid"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setGridSize("large")}
              className={`p-2 rounded-md transition-colors ${
                gridSize === "large"
                  ? "bg-yellow-400 shadow-sm text-black border-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
              title="Large grid"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedCategory !== "All") && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t-2 border-gray-200">
            <span className="text-sm text-gray-600 font-medium">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400 text-black rounded-full text-sm font-bold border-2 border-black">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm("")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400 text-black rounded-full text-sm font-bold border-2 border-black">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
              className="text-sm text-red-600 hover:text-red-700 ml-2 font-bold"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Select All Banner */}
      {isSelectMode && (
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-400 rounded-lg border-2 border-black">
              <Check className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="font-bold text-gray-900">
                {selectedImages.length} of {paginatedImages.length} selected
              </p>
              <p className="text-sm text-gray-600">Click on images to select them</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedImages(paginatedImages.map((_, i) => startIndex + i))}
              className="text-sm text-gray-900 hover:text-black font-bold"
            >
              Select all
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => setSelectedImages([])}
              className="text-sm text-gray-900 hover:text-black font-bold"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-bold text-black">{startIndex + 1}</span> to{" "}
          <span className="font-bold text-black">
            {Math.min(startIndex + itemsPerPage, filteredImages.length)}
          </span>{" "}
          of <span className="font-bold text-black">{filteredImages.length}</span> images
        </p>
      </div>

      {/* Image Grid */}
      {paginatedImages.length > 0 ? (
        <div className={`grid ${getGridClasses()} gap-4`}>
          {paginatedImages.map((img, index) => {
            const globalIndex = startIndex + index;
            const isSelected = selectedImages.includes(globalIndex);

            return (
              <div
                key={index}
                className={`group relative bg-white rounded-xl shadow-lg border-2 overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  isSelected 
                    ? "border-yellow-400 ring-4 ring-yellow-400" 
                    : "border-black hover:border-yellow-400"
                }`}
              >
                {/* Image Container */}
                <div 
                  className={`relative overflow-hidden cursor-pointer ${
                    gridSize === "large" ? "aspect-video" : "aspect-square"
                  }`}
                  onClick={() => openLightbox(img, index)}
                >
                  <img
                    src={img.url}
                    alt={img.title || img.alt || "Gallery image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${
                    isSelectMode ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}>
                    {/* Selection Checkbox */}
                    {isSelectMode && (
                      <div className="absolute top-3 left-3">
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected 
                            ? "bg-yellow-400 border-black" 
                            : "bg-white/80 border-black"
                        }`}>
                          {isSelected && <Check className="w-5 h-5 text-black" />}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {!isSelectMode && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openInfoModal(img);
                          }}
                          className="p-2 bg-white hover:bg-yellow-400 rounded-lg text-black transition-colors border-2 border-black"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(img);
                          }}
                          className="p-2 bg-white hover:bg-yellow-400 rounded-lg text-black transition-colors border-2 border-black"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(img);
                          }}
                          className="p-2 bg-white hover:bg-red-600 rounded-lg text-black hover:text-white transition-colors border-2 border-black"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold text-sm truncate">
                            {img.title || "Untitled"}
                          </p>
                          {img.category && (
                            <span className="text-yellow-400 text-xs font-medium">
                              {img.category}
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 text-white/80 hover:text-yellow-400 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Zoom Icon */}
                  {!isSelectMode && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-3 bg-yellow-400 rounded-full shadow-lg border-2 border-black">
                        <ZoomIn className="w-6 h-6 text-black" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer - Only show in large grid */}
                {gridSize === "large" && (
                  <div className="p-4 border-t-2 border-gray-200">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 truncate">
                          {img.title || "Untitled"}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {img.category || "Uncategorized"}
                        </p>
                      </div>
                      <button className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t-2 border-gray-100">
                      <button 
                        onClick={() => openLightbox(img, index)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-black bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-sm transition-colors border-2 border-black"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button 
                        onClick={() => handleEditClick(img)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-black bg-yellow-400 hover:bg-yellow-500 rounded-lg font-bold text-sm transition-colors border-2 border-black"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border-2 border-black p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 border-2 border-black">
              <AlertCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600 mb-6 max-w-sm">
              Try adjusting your search or filter criteria, or upload new images to get started.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                className="px-4 py-2 border-2 border-black rounded-lg text-black font-bold hover:bg-gray-100 transition-colors"
              >
                Clear filters
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-bold transition-colors border-2 border-black shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Upload Images
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredImages.length > itemsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-lg border-2 border-black">
          <p className="text-sm text-gray-600 font-medium">
            Page <span className="font-bold text-black">{currentPage}</span> of <span className="font-bold text-black">{totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 border-2 border-black rounded-lg text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-bold transition-colors border-2 ${
                      currentPage === page
                        ? "bg-yellow-400 text-black border-black"
                        : "text-black border-black hover:bg-yellow-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 border-2 border-black rounded-lg text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {showLightbox && selectedImage && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
          {/* Close Button */}
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 p-3 text-white/70 hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-colors z-10 border-2 border-white/20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 px-4 py-2 bg-yellow-400 border-2 border-black rounded-lg text-black text-sm font-bold">
            {lightboxIndex + 1} / {filteredImages.length}
          </div>

          {/* Top Actions */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <button
              type="button"
              className="p-2 text-white/70 hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-colors border-2 border-white/20"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            <button
              type="button"
              className="p-2 text-white/70 hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-colors border-2 border-white/20"
            >
              <ZoomOut className="w-5 h-5" />
            </button>

            <button
              type="button"
              className="p-2 text-white/70 hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-colors border-2 border-white/20"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            <button
              type="button"
              className="p-2 text-white/70 hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-colors border-2 border-white/20"
            >
              <Download className="w-5 h-5" />
            </button>

            <button
              type="button"
              className="p-2 text-white/70 hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-colors border-2 border-white/20"
            >
              <Share2 className="w-5 h-5" />
            </button>

            {/* Edit from lightbox */}
            <button
              type="button"
              onClick={handleLightboxEdit}
              className="p-2 text-white/70 hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-colors border-2 border-white/20"
            >
              <Edit className="w-5 h-5" />
            </button>

            {/* Delete from lightbox */}
            <button
              type="button"
              onClick={handleLightboxDelete}
              className="p-2 text-red-400 hover:text-white hover:bg-red-600 rounded-lg transition-colors border-2 border-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => navigateLightbox(-1)}
            disabled={lightboxIndex === 0}
            className="absolute left-4 p-3 text-white/70 hover:text-yellow-400 hover:bg-white/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-2 border-white/20"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={() => navigateLightbox(1)}
            disabled={lightboxIndex === filteredImages.length - 1}
            className="absolute right-4 p-3 text-white/70 hover:text-yellow-400 hover:bg-white/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-2 border-white/20"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Main Image */}
          <div className="max-w-5xl max-h-[80vh] px-16">
            <img
              src={selectedImage.url}
              alt={selectedImage.title || selectedImage.alt || "Gallery image"}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>

          {/* Image Info */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center bg-black/50 backdrop-blur-sm px-6 py-3 rounded-lg border-2 border-yellow-400">
            <h3 className="text-white font-bold text-lg mb-1">
              {selectedImage.title || "Untitled"}
            </h3>
            {selectedImage.category && (
              <span className="text-yellow-400 text-sm font-medium">
                {selectedImage.category}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 border-4 border-yellow-400 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Upload Images</h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadPreviews([]);
                  setUploadCategory("");
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Area */}
            <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-yellow-400 hover:bg-yellow-50 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black">
                <ImagePlus className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Drop images here or click to upload
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                PNG, JPG, GIF up to 10MB each
              </p>
              <span className="inline-block px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-bold transition-colors border-2 border-black">
                Choose Files
              </span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                multiple
                onChange={handleFileUpload}
              />
            </label>

            {/* Image Previews */}
            {uploadPreviews.length > 0 && (
              <div className="mt-6">
                <h4 className="font-bold text-gray-900 mb-3">
                  Selected Images ({uploadPreviews.length})
                </h4>
                <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                  {uploadPreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={preview.url} 
                        alt={preview.title}
                        className="w-full h-24 object-cover rounded-lg border-2 border-black"
                      />
                      <button
                        onClick={() => removeUploadPreview(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-gray-600 mt-1 truncate">{preview.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Selection */}
            <div className="mt-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Category (optional)
              </label>
              <select 
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              >
                <option value="">Select a category</option>
                {categories.filter(c => c !== "All").map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadPreviews([]);
                  setUploadCategory("");
                }}
                className="flex-1 px-4 py-2.5 border-2 border-black rounded-lg text-black font-bold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleUploadSubmit}
                className="flex-1 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black font-bold transition-colors border-2 border-black shadow-lg"
              >
                Upload {uploadPreviews.length > 0 && `(${uploadPreviews.length})`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 border-4 border-yellow-400 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Edit Image</h3>
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  setEditData(null);
                  setEditImagePreview(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Image Preview */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Image
                </label>
                
                {editImagePreview ? (
                  <div className="relative">
                    <img 
                      src={editImagePreview} 
                      alt="Preview" 
                      className="w-full h-64 object-cover rounded-lg border-2 border-black"
                    />
                    <label className="absolute bottom-3 right-3 p-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg transition-colors border-2 border-black cursor-pointer">
                      <Camera className="w-5 h-5" />
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleEditImageFile}
                      />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition-all">
                    <Camera className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600">Click to change image</p>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleEditImageFile}
                    />
                  </label>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editData.title || ""}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    placeholder="Enter image title"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={editData.category || ""}
                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                  >
                    <option value="">Select a category</option>
                    {categories.filter(c => c !== "All").map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={editData.alt || ""}
                  onChange={(e) => setEditData({ ...editData, alt: e.target.value })}
                  placeholder="Enter alt text for accessibility"
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditData(null);
                  setEditImagePreview(null);
                }}
                className="flex-1 px-4 py-2.5 border-2 border-black rounded-lg text-black font-bold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="flex-1 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black font-bold transition-colors border-2 border-black shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-4 border-red-500">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 border-2 border-red-500">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Delete Image
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete "<span className="font-bold">{selectedImage?.title || "this image"}</span>"? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 border-2 border-black rounded-lg text-black font-bold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold transition-colors border-2 border-black"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Info Modal */}
      {showInfoModal && selectedImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border-4 border-yellow-400">
            {/* Image Preview */}
            <div className="aspect-video bg-gray-100">
              <img
                src={selectedImage.url}
                alt={selectedImage.title || "Gallery image"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Details */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedImage.title || "Untitled"}
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b-2 border-gray-200">
                  <span className="text-gray-600 font-medium">Category</span>
                  <span className="font-bold text-gray-900">
                    {selectedImage.category || "Uncategorized"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b-2 border-gray-200">
                  <span className="text-gray-600 font-medium">Size</span>
                  <span className="font-bold text-gray-900">1920 x 1080</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b-2 border-gray-200">
                  <span className="text-gray-600 font-medium">File size</span>
                  <span className="font-bold text-gray-900">2.4 MB</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b-2 border-gray-200">
                  <span className="text-gray-600 font-medium">Uploaded</span>
                  <span className="font-bold text-gray-900">Jan 15, 2024</span>
                </div>
              </div>

              {/* URL Copy */}
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-2 border-yellow-400">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-700 truncate flex-1 font-medium">
                    {selectedImage.url}
                  </span>
                  <button className="p-1.5 text-gray-600 hover:text-black hover:bg-yellow-400 rounded transition-colors border-2 border-black">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="flex-1 px-4 py-2.5 border-2 border-black rounded-lg text-black font-bold hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>

                <button 
                  onClick={() => {
                    setShowInfoModal(false);
                    handleEditClick(selectedImage);
                  }}
                  className="flex-1 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black font-bold transition-colors border-2 border-black shadow-lg"
                >
                  Edit Image
                </button>

                <button 
                  onClick={() => {
                    setShowInfoModal(false);
                    handleDelete(selectedImage);
                  }}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold transition-colors border-2 border-black"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}