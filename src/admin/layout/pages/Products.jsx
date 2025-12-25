import { useState } from "react";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  AlertCircle,
  CheckCircle,
  X,
  Image as ImageIcon,
  Camera
} from "lucide-react";
import { products as initialProducts } from "../../../data/Products";

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    desc: "",
    category: "Electronics",
    status: "Active",
    image: null
  });

  const itemsPerPage = 5;

  // Get unique categories
  const categories = ["All", ...new Set(products.map(p => p.category))];
  const productCategories = [...new Set(products.map(p => p.category))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Category badge colors
  const getCategoryColor = (category) => {
    const colors = {
      "Electronics": "bg-yellow-100 text-yellow-800",
      "Clothing": "bg-amber-100 text-amber-800",
      "Home": "bg-orange-100 text-orange-800",
      "Sports": "bg-yellow-200 text-yellow-900",
      "Books": "bg-amber-200 text-amber-900",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleDelete = (product, e) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter(p => p !== selectedProduct));
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewProduct(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.desc) {
      setProducts([...products, { ...newProduct }]);
      setNewProduct({
        name: "",
        desc: "",
        category: "Electronics",
        status: "Active",
        image: null
      });
      setImagePreview(null);
      setShowAddModal(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const removeImage = () => {
    setImagePreview(null);
    setNewProduct(prev => ({
      ...prev,
      image: null
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-yellow-400 rounded-lg">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <span>Products</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage your product inventory ({products.length} total)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="flex gap-2 sm:gap-3">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm border-2 border-black rounded-lg text-black hover:bg-black hover:text-yellow-400 transition-colors font-medium">
              <Download className="w-4 h-4" />
              <span className="sm:inline">Export</span>
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm border-2 border-black rounded-lg text-black hover:bg-black hover:text-yellow-400 transition-colors font-medium">
              <Upload className="w-4 h-4" />
              <span className="sm:inline">Import</span>
            </button>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2.5 sm:py-2 text-sm rounded-lg font-bold transition-colors shadow-lg border-2 border-black"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg border-2 border-black">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
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

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Category Filter */}
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-8 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none appearance-none bg-white cursor-pointer font-medium"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-200 rounded-lg p-1 border-2 border-black">
              <button
                onClick={() => setViewMode("table")}
                className={`flex-1 sm:flex-none p-2 rounded-md transition-colors ${
                  viewMode === "table" 
                    ? "bg-yellow-400 shadow-sm text-black border-2 border-black" 
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <List className="w-4 h-4 sm:w-5 sm:h-5 mx-auto sm:mx-0" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex-1 sm:flex-none p-2 rounded-md transition-colors ${
                  viewMode === "grid" 
                    ? "bg-yellow-400 shadow-sm text-black border-2 border-black" 
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <Grid className="w-4 h-4 sm:w-5 sm:h-5 mx-auto sm:mx-0" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedCategory !== "All") && (
          <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t-2 border-gray-200">
            <span className="text-xs sm:text-sm text-gray-600 font-medium">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-yellow-400 text-black rounded-full text-xs sm:text-sm font-bold border-2 border-black">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm("")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-yellow-400 text-black rounded-full text-xs sm:text-sm font-bold border-2 border-black">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button 
              onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
              className="text-xs sm:text-sm text-red-600 hover:text-red-700 ml-2 font-bold"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs sm:text-sm text-gray-600">
          Showing <span className="font-bold text-black">{startIndex + 1}</span> to{" "}
          <span className="font-bold text-black">
            {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
          </span>{" "}
          of <span className="font-bold text-black">{filteredProducts.length}</span> results
        </p>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-black overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-black text-yellow-400 border-b-2 border-yellow-400">
                  <th className="text-left p-3 sm:p-4 font-bold text-xs sm:text-sm">
                    <input type="checkbox" className="rounded border-yellow-400" />
                  </th>
                  <th className="text-left p-3 sm:p-4 font-bold text-xs sm:text-sm">Product</th>
                  <th className="text-left p-3 sm:p-4 font-bold text-xs sm:text-sm hidden md:table-cell">Description</th>
                  <th className="text-left p-3 sm:p-4 font-bold text-xs sm:text-sm">Category</th>
                  <th className="text-left p-3 sm:p-4 font-bold text-xs sm:text-sm">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-200">
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product, index) => (
                    <tr 
                      key={index} 
                      onClick={() => handleRowClick(product)}
                      className="hover:bg-yellow-50 transition-colors cursor-pointer group"
                    >
                      <td className="p-3 sm:p-4" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg flex items-center justify-center border-2 border-black overflow-hidden flex-shrink-0">
                            {product.image ? (
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 text-sm sm:text-base truncate">{product.name}</p>
                            <p className="text-xs text-gray-500">ID: PRD-{String(index + 1).padStart(4, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 sm:p-4 hidden md:table-cell">
                        <p className="text-gray-600 text-sm max-w-xs truncate">{product.desc}</p>
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className={`inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold border-2 border-black ${getCategoryColor(product.category)}`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold bg-green-400 text-black border-2 border-black">
                          <CheckCircle className="w-3 h-3" />
                          <span className="hidden sm:inline">Active</span>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-6 sm:p-8">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 border-2 border-black">
                          <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">No products found</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                        <button 
                          onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                          className="text-sm sm:text-base text-yellow-600 hover:text-yellow-700 font-bold"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product, index) => (
              <div 
                key={index}
                onClick={() => handleRowClick(product)}
                className="bg-white rounded-xl shadow-lg border-2 border-black overflow-hidden hover:shadow-xl hover:border-yellow-400 transition-all cursor-pointer group"
              >
                <div className="aspect-video bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center relative overflow-hidden">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
                  )}
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-xs text-yellow-400 font-bold">ID: {String(index + 1).padStart(4, '0')}</span>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-1 flex-1">{product.name}</h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border-2 border-black ${getCategoryColor(product.category)} flex-shrink-0`}>
                      {product.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3 sm:mb-4">{product.desc}</p>
                  <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600">
                      <CheckCircle className="w-3 h-3" />
                      <span>Active</span>
                    </span>
                    <Eye className="w-4 h-4 text-gray-400 group-hover:text-yellow-600 transition-colors" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white rounded-xl shadow-lg border-2 border-black p-6 sm:p-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 border-2 border-black">
                    <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">No products found</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                  <button 
                    onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                    className="text-sm sm:text-base text-yellow-600 hover:text-yellow-700 font-bold"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-xl shadow-lg border-2 border-black">
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            Page <span className="font-bold text-black">{currentPage}</span> of <span className="font-bold text-black">{totalPages}</span>
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 text-sm border-2 border-black rounded-lg text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                let page;
                if (totalPages <= 3) {
                  page = i + 1;
                } else if (currentPage <= 2) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 1) {
                  page = totalPages - 2 + i;
                } else {
                  page = currentPage - 1 + i;
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base rounded-lg font-bold transition-colors border-2 ${
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
              className="flex items-center gap-1 px-3 py-2 text-sm border-2 border-black rounded-lg text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl p-4 sm:p-6 border-4 border-yellow-400 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Add New Product</h3>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setImagePreview(null);
                  setNewProduct({
                    name: "",
                    desc: "",
                    category: "Electronics",
                    status: "Active",
                    image: null
                  });
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                  Product Image
                </label>
                
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-40 sm:h-48 object-cover rounded-lg border-2 border-black"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 sm:p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 sm:h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-2 sm:mb-3" />
                      <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-gray-600">
                        <span className="font-bold">Click to upload</span> <span className="hidden sm:inline">or drag and drop</span>
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                  >
                    {productCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="desc"
                  value={newProduct.desc}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={newProduct.status}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 sticky bottom-0 bg-white pt-4 -mb-4 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setImagePreview(null);
                  setNewProduct({
                    name: "",
                    desc: "",
                    category: "Electronics",
                    status: "Active",
                    image: null
                  });
                }}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-black rounded-lg text-black font-bold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black font-bold transition-colors border-2 border-black shadow-lg"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {showViewModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-3xl p-4 sm:p-6 border-4 border-yellow-400 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Product Details</h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="aspect-video bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-xl flex items-center justify-center border-2 border-black overflow-hidden">
                {selectedProduct.image ? (
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package className="w-16 h-16 sm:w-24 sm:h-24 text-black" />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-500 mb-1">Product Name</label>
                  <p className="text-base sm:text-lg font-bold text-gray-900">{selectedProduct.name}</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-500 mb-1">Category</label>
                  <span className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold border-2 border-black ${getCategoryColor(selectedProduct.category)}`}>
                    {selectedProduct.category}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-500 mb-1">Description</label>
                <p className="text-sm sm:text-base text-gray-700 bg-gray-50 p-3 sm:p-4 rounded-lg border-2 border-gray-200">{selectedProduct.desc}</p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-500 mb-1">Status</label>
                <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-green-400 text-black border-2 border-black">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  {selectedProduct.status || 'Active'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mt-6 pt-6 border-t-2 border-gray-200">
              <button
                onClick={() => setShowViewModal(false)}
                className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-black rounded-lg text-black font-bold hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button
                className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-black hover:bg-gray-800 rounded-lg text-yellow-400 font-bold transition-colors border-2 border-yellow-400 flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Product</span>
              </button>
              <button
                onClick={(e) => {
                  setShowViewModal(false);
                  handleDelete(selectedProduct, e);
                }}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold transition-colors border-2 border-black flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md p-5 sm:p-6 border-4 border-red-500">
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full mx-auto mb-4 border-2 border-red-500">
              <Trash2 className="w-7 h-7 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-2">
              Delete Product
            </h3>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
              Are you sure you want to delete "<span className="font-bold">{selectedProduct?.name}</span>"? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-black rounded-lg text-black font-bold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold transition-colors border-2 border-black"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}