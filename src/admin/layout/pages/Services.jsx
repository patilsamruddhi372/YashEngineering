import { useState } from "react";
import {
  Wrench,
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
  Clock,
  X,
  Star,
  DollarSign,
  Users,
  Zap,
  Settings,
  Sparkles,
  Camera,
  Package
} from "lucide-react";
import { services as initialServices } from "../../../data/Services";

export default function Services() {
  const [services, setServices] = useState(initialServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  
  const [newService, setNewService] = useState({
    title: "",
    desc: "",
    status: "Active",
    duration: "2-4 hours",
    price: "",
    image: null
  });

  const [editService, setEditService] = useState(null);

  const itemsPerPage = 6;

  // Status options
  const statusOptions = ["All", "Active", "Inactive", "Featured"];

  // Service icons based on index or type
  const serviceIcons = [Wrench, Settings, Zap, Sparkles, Star, Users];

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || service.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + itemsPerPage);

  // Status badge colors
  const getStatusColor = (status) => {
    const colors = {
      "Active": "bg-green-400 text-black",
      "Inactive": "bg-gray-300 text-black",
      "Featured": "bg-yellow-400 text-black",
      "Pending": "bg-orange-400 text-black",
    };
    return colors[status] || "bg-gray-300 text-black";
  };

  // Status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return CheckCircle;
      case "Featured":
        return Star;
      case "Pending":
        return Clock;
      default:
        return AlertCircle;
    }
  };

  // Get gradient for service card
  const getCardGradient = (index) => {
    const gradients = [
      "from-yellow-400 to-yellow-500",
      "from-yellow-300 to-yellow-600",
      "from-amber-400 to-yellow-500",
      "from-yellow-500 to-amber-500",
      "from-yellow-400 to-orange-400",
      "from-amber-300 to-yellow-400",
    ];
    return gradients[index % gradients.length];
  };

  // Image Upload Handlers
  const handleImageUpload = (e, isEdit = false) => {
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
        if (isEdit) {
          setEditImagePreview(reader.result);
          setEditService(prev => ({ ...prev, image: reader.result }));
        } else {
          setImagePreview(reader.result);
          setNewService(prev => ({ ...prev, image: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (isEdit = false) => {
    if (isEdit) {
      setEditImagePreview(null);
      setEditService(prev => ({ ...prev, image: null }));
    } else {
      setImagePreview(null);
      setNewService(prev => ({ ...prev, image: null }));
    }
  };

  // CRUD Operations
  const handleAddService = () => {
    if (newService.title && newService.desc && newService.price) {
      setServices([...services, { 
        ...newService,
        status: newService.status || "Active"
      }]);
      setNewService({
        title: "",
        desc: "",
        status: "Active",
        duration: "2-4 hours",
        price: "",
        image: null
      });
      setImagePreview(null);
      setShowAddModal(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleDelete = (service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setServices(services.filter(s => s !== selectedService));
    setShowDeleteModal(false);
    setSelectedService(null);
  };

  const handleEditClick = (service) => {
    setEditService({ ...service });
    setEditImagePreview(service.image || null);
    setShowEditModal(true);
  };

  const handleUpdateService = () => {
    if (editService.title && editService.desc) {
      setServices(services.map(s => 
        s === selectedService ? editService : s
      ));
      setShowEditModal(false);
      setEditService(null);
      setEditImagePreview(null);
      setSelectedService(null);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleView = (service) => {
    setSelectedService(service);
    setShowDetailModal(true);
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditService(prev => ({ ...prev, [name]: value }));
    } else {
      setNewService(prev => ({ ...prev, [name]: value }));
    }
  };

  // Stats
  const stats = [
    { 
      label: "Total Services", 
      value: services.length, 
      icon: Wrench, 
      color: "text-black",
      bgColor: "bg-yellow-400"
    },
    { 
      label: "Active", 
      value: services.filter(s => s.status === "Active" || !s.status).length, 
      icon: CheckCircle, 
      color: "text-black",
      bgColor: "bg-green-400"
    },
    { 
      label: "Featured", 
      value: services.filter(s => s.status === "Featured").length, 
      icon: Star, 
      color: "text-black",
      bgColor: "bg-yellow-300"
    },
    { 
      label: "Clients Served", 
      value: "500+", 
      icon: Users, 
      color: "text-black",
      bgColor: "bg-amber-400"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-yellow-400 rounded-lg border-2 border-black">
              <Wrench className="w-6 h-6 text-black" />
            </div>
            Services
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your service offerings ({services.length} total)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg text-black hover:bg-black hover:text-yellow-400 transition-colors font-medium">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg text-black hover:bg-black hover:text-yellow-400 transition-colors font-medium">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Import</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold transition-colors shadow-lg border-2 border-black"
          >
            <Plus className="w-4 h-4" />
            Add Service
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
              placeholder="Search services..."
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

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="pl-10 pr-8 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none appearance-none bg-white cursor-pointer min-w-[150px] font-medium"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-gray-200 rounded-lg p-1 border-2 border-black">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-yellow-400 shadow-sm text-black border-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-yellow-400 shadow-sm text-black border-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedStatus !== "All") && (
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
            {selectedStatus !== "All" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400 text-black rounded-full text-sm font-bold border-2 border-black">
                {selectedStatus}
                <button onClick={() => setSelectedStatus("All")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={() => { setSearchTerm(""); setSelectedStatus("All"); }}
              className="text-sm text-red-600 hover:text-red-700 ml-2 font-bold"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-bold text-black">{startIndex + 1}</span> to{" "}
          <span className="font-bold text-black">
            {Math.min(startIndex + itemsPerPage, filteredServices.length)}
          </span>{" "}
          of <span className="font-bold text-black">{filteredServices.length}</span> services
        </p>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedServices.length > 0 ? (
            paginatedServices.map((service, index) => {
              const IconComponent = serviceIcons[index % serviceIcons.length];
              const status = service.status || "Active";
              const StatusIcon = getStatusIcon(status);

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border-2 border-black overflow-hidden hover:shadow-xl hover:border-yellow-400 transition-all duration-300 group"
                >
                  {/* Card Header with Gradient or Image */}
                  <div className={`bg-gradient-to-r ${getCardGradient(index)} p-6 relative h-48 flex items-center justify-center overflow-hidden`}>
                    {service.image ? (
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-black/20 backdrop-blur rounded-xl flex items-center justify-center">
                        <IconComponent className="w-7 h-7 text-black" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border-2 border-black ${getStatusColor(status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {service.desc}
                    </p>

                    {/* Service Features */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-4 h-4" />
                        {service.duration || "2-4 hrs"}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <DollarSign className="w-4 h-4" />
                        ${service.price || "99"}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-4 border-t-2 border-gray-200">
                      <button
                        onClick={() => handleView(service)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-black bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-sm transition-colors border-2 border-black"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedService(service);
                          handleEditClick(service);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-black bg-yellow-400 hover:bg-yellow-500 rounded-lg font-bold text-sm transition-colors border-2 border-black"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service)}
                        className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors border-2 border-black"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full">
              <div className="bg-white rounded-xl shadow-lg border-2 border-black p-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 border-2 border-black">
                    <AlertCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">No services found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={() => { setSearchTerm(""); setSelectedStatus("All"); }}
                    className="text-yellow-600 hover:text-yellow-700 font-bold"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-black overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black text-yellow-400 border-b-2 border-yellow-400">
                  <th className="text-left p-4 font-bold">
                    <input type="checkbox" className="rounded border-yellow-400" />
                  </th>
                  <th className="text-left p-4 font-bold">Service</th>
                  <th className="text-left p-4 font-bold">Description</th>
                  <th className="text-left p-4 font-bold">Status</th>
                  <th className="text-left p-4 font-bold">Duration</th>
                  <th className="text-left p-4 font-bold">Price</th>
                  <th className="text-right p-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-200">
                {paginatedServices.length > 0 ? (
                  paginatedServices.map((service, index) => {
                    const IconComponent = serviceIcons[index % serviceIcons.length];
                    const status = service.status || "Active";
                    const StatusIcon = getStatusIcon(status);

                    return (
                      <tr
                        key={index}
                        className="hover:bg-yellow-50 transition-colors group"
                      >
                        <td className="p-4">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 bg-gradient-to-br ${getCardGradient(index)} rounded-lg flex items-center justify-center border-2 border-black overflow-hidden`}>
                              {service.image ? (
                                <img 
                                  src={service.image} 
                                  alt={service.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <IconComponent className="w-6 h-6 text-black" />
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{service.title}</p>
                              <p className="text-xs text-gray-500">ID: SRV-{String(index + 1).padStart(4, '0')}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-600 max-w-xs truncate">{service.desc}</p>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border-2 border-black ${getStatusColor(status)}`}>
                            <StatusIcon className="w-3 h-3" />
                            {status}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-gray-600 text-sm font-medium">{service.duration || "2-4 hours"}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-gray-900 font-bold">${service.price || "99"}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleView(service)}
                              className="p-2 text-gray-600 hover:text-black hover:bg-gray-200 rounded-lg transition-colors border-2 border-transparent hover:border-black"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedService(service);
                                handleEditClick(service);
                              }}
                              className="p-2 text-gray-600 hover:text-black hover:bg-yellow-400 rounded-lg transition-colors border-2 border-transparent hover:border-black"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(service)}
                              className="p-2 text-gray-600 hover:text-white hover:bg-red-600 rounded-lg transition-colors border-2 border-transparent hover:border-black"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 border-2 border-black">
                          <AlertCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No services found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                        <button
                          onClick={() => { setSearchTerm(""); setSelectedStatus("All"); }}
                          className="text-yellow-600 hover:text-yellow-700 font-bold"
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

      {/* Pagination */}
      {filteredServices.length > itemsPerPage && (
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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
              ))}
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

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 border-4 border-yellow-400 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Add New Service</h3>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setImagePreview(null);
                  setNewService({
                    title: "",
                    desc: "",
                    status: "Active",
                    duration: "2-4 hours",
                    price: "",
                    image: null
                  });
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Service Image
                </label>
                
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg border-2 border-black"
                    />
                    <button
                      onClick={() => removeImage(false)}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors border-2 border-black"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="mb-2 text-sm text-gray-600">
                        <span className="font-bold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false)}
                    />
                  </label>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Service Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newService.title}
                    onChange={(e) => handleInputChange(e, false)}
                    placeholder="Enter service title"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={newService.status}
                    onChange={(e) => handleInputChange(e, false)}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Featured">Featured</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="desc"
                  value={newService.desc}
                  onChange={(e) => handleInputChange(e, false)}
                  placeholder="Enter service description"
                  rows="4"
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={newService.duration}
                    onChange={(e) => handleInputChange(e, false)}
                    placeholder="e.g., 2-4 hours"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newService.price}
                    onChange={(e) => handleInputChange(e, false)}
                    placeholder="Enter price"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setImagePreview(null);
                  setNewService({
                    title: "",
                    desc: "",
                    status: "Active",
                    duration: "2-4 hours",
                    price: "",
                    image: null
                  });
                }}
                className="flex-1 px-4 py-2.5 border-2 border-black rounded-lg text-black font-bold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddService}
                className="flex-1 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black font-bold transition-colors border-2 border-black shadow-lg"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {showEditModal && editService && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 border-4 border-yellow-400 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Edit Service</h3>
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  setEditImagePreview(null);
                  setEditService(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Service Image
                </label>
                
                {editImagePreview ? (
                  <div className="relative">
                    <img 
                      src={editImagePreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg border-2 border-black"
                    />
                    <button
                      onClick={() => removeImage(true)}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors border-2 border-black"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="mb-2 text-sm text-gray-600">
                        <span className="font-bold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                    />
                  </label>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Service Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editService.title}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder="Enter service title"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={editService.status}
                    onChange={(e) => handleInputChange(e, true)}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Featured">Featured</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="desc"
                  value={editService.desc}
                  onChange={(e) => handleInputChange(e, true)}
                  placeholder="Enter service description"
                  rows="4"
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={editService.duration}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder="e.g., 2-4 hours"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={editService.price}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder="Enter price"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditImagePreview(null);
                  setEditService(null);
                }}
                className="flex-1 px-4 py-2.5 border-2 border-black rounded-lg text-black font-bold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateService}
                className="flex-1 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black font-bold transition-colors border-2 border-black shadow-lg"
              >
                Update Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Detail Modal */}
      {showDetailModal && selectedService && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border-4 border-yellow-400">
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${getCardGradient(0)} p-6 relative h-64 flex items-center justify-center overflow-hidden`}>
              {selectedService.image ? (
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-black/20 backdrop-blur rounded-xl flex items-center justify-center">
                  <Wrench className="w-10 h-10 text-black" />
                </div>
              )}
              <button
                onClick={() => setShowDetailModal(false)}
                className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 backdrop-blur rounded-lg transition-colors border-2 border-black"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedService.title}</h3>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold border-2 border-black ${getStatusColor(selectedService.status || "Active")}`}>
                  {React.createElement(getStatusIcon(selectedService.status || "Active"), { className: "w-4 h-4" })}
                  {selectedService.status || "Active"}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Description</h4>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-2 border-gray-200">{selectedService.desc}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-400">
                  <div className="flex items-center gap-2 text-gray-700 mb-1">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm font-bold">Duration</span>
                  </div>
                  <p className="font-bold text-gray-900 text-lg">{selectedService.duration || "2-4 hours"}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-400">
                  <div className="flex items-center gap-2 text-gray-700 mb-1">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-sm font-bold">Price</span>
                  </div>
                  <p className="font-bold text-gray-900 text-lg">${selectedService.price || "99.00"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2.5 border-2 border-black rounded-lg text-black font-bold hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setShowDetailModal(false);
                    handleEditClick(selectedService);
                  }}
                  className="flex-1 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black font-bold transition-colors border-2 border-black shadow-lg"
                >
                  Edit Service
                </button>
              </div>
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
              Delete Service
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete "<span className="font-bold">{selectedService?.title}</span>"? This action cannot be undone.
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
    </div>
  );
}