import {
  Building2,
  Factory,
  Award,
  Star,
  Quote,
  CheckCircle,
  TrendingUp,
  Users,
  MapPin,
  Briefcase,
  Shield,
  Target,
  Sparkles,
  ChevronRight,
  Search,
  Grid3x3,
  List,
  Zap,
  Crown,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Camera,
  Package,
} from 'lucide-react';
import { useState } from 'react';
import { clients as initialClients } from '../../../data/Clients';

export default function Clients() {
  const [clients, setClients] = useState(
    initialClients.map((name, index) => ({
      id: index,
      name,
      category: 'Manufacturing',
      status: 'Active',
      since: '2020',
      image: null,
      rating: 5,
    }))
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);

  const [newClient, setNewClient] = useState({
    name: '',
    category: 'Manufacturing',
    status: 'Active',
    since: new Date().getFullYear().toString(),
    image: null,
    rating: 5,
  });

  const [editClient, setEditClient] = useState(null);

  const categories = [
    'Manufacturing',
    'Electrical',
    'Construction',
    'Industrial',
    'Commercial',
    'Healthcare',
    'Education',
    'Hospitality',
    'Retail',
    'Technology',
  ];

  // Filter clients based on search
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats about clients (light yellow + black)
  const clientStats = [
    {
      icon: Users,
      number: `${clients.length}+`,
      label: 'Happy Clients',
      color: 'text-black',
      bg: 'bg-yellow-100',
    },
    {
      icon: Factory,
      number: `${categories.length}+`,
      label: 'Industries Served',
      color: 'text-black',
      bg: 'bg-yellow-100',
    },
    {
      icon: Award,
      number: '500+',
      label: 'Projects Delivered',
      color: 'text-black',
      bg: 'bg-yellow-100',
    },
    {
      icon: Star,
      number: '5.0',
      label: 'Average Rating',
      color: 'text-black',
      bg: 'bg-yellow-100',
    },
  ];

  // Icon per client
  const getClientIcon = (index) => {
    const icons = [Factory, Building2, Zap, Briefcase, Shield, Target];
    return icons[index % icons.length];
  };

  // Light yellow gradients + black icons
  const getClientColor = (index) => {
    const colors = [
      {
        bg: 'from-yellow-50 to-yellow-100',
        hover: 'group-hover:from-yellow-100 group-hover:to-yellow-200',
        icon: 'text-black',
      },
      {
        bg: 'from-amber-50 to-amber-100',
        hover: 'group-hover:from-amber-100 group-hover:to-amber-200',
        icon: 'text-black',
      },
      {
        bg: 'from-yellow-100 to-yellow-200',
        hover: 'group-hover:from-yellow-200 group-hover:to-yellow-300',
        icon: 'text-black',
      },
      {
        bg: 'from-stone-50 to-stone-100',
        hover: 'group-hover:from-stone-100 group-hover:to-stone-200',
        icon: 'text-black',
      },
      {
        bg: 'from-yellow-50 to-amber-50',
        hover: 'group-hover:from-yellow-100 group-hover:to-amber-100',
        icon: 'text-black',
      },
      {
        bg: 'from-amber-50 to-yellow-100',
        hover: 'group-hover:from-amber-100 group-hover:to-yellow-200',
        icon: 'text-black',
      },
    ];
    return colors[index % colors.length];
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
          setEditClient((prev) => ({ ...prev, image: reader.result }));
        } else {
          setImagePreview(reader.result);
          setNewClient((prev) => ({ ...prev, image: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (isEdit = false) => {
    if (isEdit) {
      setEditImagePreview(null);
      setEditClient((prev) => ({ ...prev, image: null }));
    } else {
      setImagePreview(null);
      setNewClient((prev) => ({ ...prev, image: null }));
    }
  };

  // CRUD Operations
  const handleAddClient = () => {
    if (newClient.name.trim()) {
      setClients([
        ...clients,
        {
          ...newClient,
          id: clients.length,
        },
      ]);
      setNewClient({
        name: '',
        category: 'Manufacturing',
        status: 'Active',
        since: new Date().getFullYear().toString(),
        image: null,
        rating: 5,
      });
      setImagePreview(null);
      setShowAddModal(false);
    } else {
      alert('Please enter client name');
    }
  };

  const handleEditClick = (client) => {
    setSelectedClient(client);
    setEditClient({ ...client });
    setEditImagePreview(client.image || null);
    setShowEditModal(true);
  };

  const handleUpdateClient = () => {
    if (editClient.name.trim()) {
      setClients(clients.map((c) => (c.id === selectedClient.id ? editClient : c)));
      setShowEditModal(false);
      setEditClient(null);
      setEditImagePreview(null);
      setSelectedClient(null);
    } else {
      alert('Please enter client name');
    }
  };

  const handleDelete = (client) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setClients(clients.filter((c) => c.id !== selectedClient.id));
    setShowDeleteModal(false);
    setSelectedClient(null);
  };

  const handleView = (client) => {
    setSelectedClient(client);
    setShowViewModal(true);
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditClient((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewClient((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 bg-yellow-300 rounded-lg shadow-sm">
              <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-black">
              Our Trusted Clients
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700">
            Proud to serve {clients.length}+ leading companies across diverse industries
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-yellow-50 rounded-lg p-1 border border-yellow-200 w-full sm:w-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 sm:flex-none p-2 rounded transition-all ${
                viewMode === 'grid'
                  ? 'bg-yellow-300 text-black shadow-sm'
                  : 'text-slate-600 hover:text-black'
              }`}
              title="Grid View"
            >
              <Grid3x3 className="h-4 w-4 mx-auto sm:mx-0" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 sm:flex-none p-2 rounded transition-all ${
                viewMode === 'list'
                  ? 'bg-yellow-300 text-black shadow-sm'
                  : 'text-slate-600 hover:text-black'
              }`}
              title="List View"
            >
              <List className="h-4 w-4 mx-auto sm:mx-0" />
            </button>
          </div>

          {/* Add Client Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2.5 sm:py-2 rounded-lg font-semibold transition-colors shadow-sm border border-yellow-500 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Add Client</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {clientStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-yellow-100 p-4 sm:p-6 hover:shadow-md hover:border-yellow-300 transition-all cursor-default"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <div className={`p-1.5 sm:p-2 ${stat.bg} rounded-lg border border-yellow-200`}>
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-semibold text-black">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-4 sm:p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2.5 sm:py-3 text-sm sm:text-base border border-yellow-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/60 focus:outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-yellow-100 text-xs sm:text-sm text-slate-700">
          Showing <strong className="text-black">{filteredClients.length}</strong> of{' '}
          <strong className="text-black">{clients.length}</strong> clients
        </div>
      </div>

      {/* Clients Grid/List */}
      {filteredClients.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'
              : 'space-y-3'
          }
        >
          {filteredClients.map((client, index) => {
            const Icon = getClientIcon(index);
            const colors = getClientColor(index);

            if (viewMode === 'list') {
              // List View
              return (
                <div
                  key={client.id}
                  className="group bg-white rounded-xl shadow-sm border border-yellow-100 hover:shadow-md hover:border-yellow-300 transition-all p-3 sm:p-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Icon/Image */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${colors.bg} rounded-lg flex items-center justify-center border border-yellow-200 overflow-hidden ${colors.hover} transition-all`}
                    >
                      {client.image ? (
                        <img
                          src={client.image}
                          alt={client.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${colors.icon}`} />
                      )}
                    </div>

                    {/* Client Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base sm:text-lg text-black group-hover:text-yellow-700 transition-colors truncate">
                        {client.name}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                        <span className="text-xs sm:text-sm text-slate-700">{client.category}</span>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                          <span className="text-xs sm:text-sm text-slate-600">
                            {client.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:opacity-0 group-hover:opacity-100 items-center gap-1 sm:gap-2 transition-opacity">
                      <button
                        onClick={() => handleView(client)}
                        className="p-1.5 sm:p-2 text-slate-600 hover:text-black hover:bg-yellow-50 rounded-lg transition-colors border border-transparent hover:border-yellow-200"
                      >
                        <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                      <button
                        onClick={() => handleEditClick(client)}
                        className="p-1.5 sm:p-2 text-slate-600 hover:text-black hover:bg-yellow-100 rounded-lg transition-colors border border-transparent hover:border-yellow-300"
                      >
                        <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(client)}
                        className="p-1.5 sm:p-2 text-slate-600 hover:text-white hover:bg-red-600 rounded-lg transition-colors border border-transparent hover:border-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // Grid View
            return (
              <div
                key={client.id}
                className="group bg-white rounded-xl shadow-sm border border-yellow-100 hover:border-yellow-300 hover:shadow-md transition-all duration-300 p-4 sm:p-6 hover:-translate-y-1"
              >
                {/* Icon/Image */}
                <div
                  className={`w-full h-24 sm:h-32 bg-gradient-to-br ${colors.bg} rounded-lg flex items-center justify-center mb-3 sm:mb-4 border border-yellow-200 overflow-hidden ${colors.hover} transition-all`}
                >
                  {client.image ? (
                    <img
                      src={client.image}
                      alt={client.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon className={`h-12 w-12 sm:h-16 sm:w-16 ${colors.icon}`} />
                  )}
                </div>

                {/* Client Name */}
                <h3 className="font-semibold text-base sm:text-lg text-black mb-2 group-hover:text-yellow-700 transition-colors line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem]">
                  {client.name}
                </h3>

                {/* Category */}
                <div className="inline-block px-2.5 sm:px-3 py-1 bg-yellow-100 text-black rounded-full text-xs font-semibold mb-3 border border-yellow-300">
                  {client.category}
                </div>

                {/* Details */}
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                    <span>{client.status} Client</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                    <span>Since {client.since}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-yellow-100">
                  <button
                    onClick={() => handleView(client)}
                    className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-black bg-yellow-50 hover:bg-yellow-100 rounded-lg font-semibold transition-colors border border-yellow-200"
                  >
                    <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">View</span>
                  </button>
                  <button
                    onClick={() => handleEditClick(client)}
                    className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg font-semibold transition-colors border border-yellow-500"
                  >
                    <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(client)}
                    className="p-1.5 sm:p-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors border border-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Empty State
        <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-8 sm:p-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-yellow-50 rounded-full mb-4 border border-yellow-200">
            <Building2 className="h-7 w-7 sm:h-8 sm:w-8 text-slate-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">
            No clients found
          </h3>
          <p className="text-sm sm:text-base text-slate-700 mb-6">
            {searchTerm
              ? `No clients match your search "${searchTerm}"`
              : 'No clients available'}
          </p>
          <button
            onClick={() => (searchTerm ? setSearchTerm('') : setShowAddModal(true))}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 border border-yellow-500"
          >
            {searchTerm ? 'Clear Search' : 'Add First Client'}
          </button>
        </div>
      )}

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-2xl sm:w-full p-4 sm:p-6 border border-yellow-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-black">Add New Client</h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setImagePreview(null);
                  setNewClient({
                    name: '',
                    category: 'Manufacturing',
                    status: 'Active',
                    since: new Date().getFullYear().toString(),
                    image: null,
                    rating: 5,
                  });
                }}
                className="p-2 hover:bg-yellow-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                  Client Logo/Image
                </label>

                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 sm:h-48 object-cover rounded-lg border border-yellow-200"
                    />
                    <button
                      onClick={() => removeImage(false)}
                      className="absolute top-2 right-2 p-1.5 sm:p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors border border-red-600 text-xs"
                    >
                      <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 sm:h-48 border border-dashed border-yellow-300 rounded-lg cursor-pointer hover:border-yellow-500 hover:bg-yellow-50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mb-2 sm:mb-3" />
                      <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-slate-700">
                        <span className="font-semibold text-black">
                          Click to upload
                        </span>{' '}
                        <span className="hidden sm:inline">or drag and drop</span>
                      </p>
                      <p className="text-xs text-slate-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newClient.name}
                    onChange={(e) => handleInputChange(e, false)}
                    placeholder="Enter client name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-300/70 focus:border-yellow-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={newClient.category}
                    onChange={(e) => handleInputChange(e, false)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-300/70 focus:border-yellow-500 outline-none transition-all"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={newClient.status}
                    onChange={(e) => handleInputChange(e, false)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-300/70 focus:border-yellow-500 outline-none transition-all"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                    Client Since
                  </label>
                  <input
                    type="text"
                    name="since"
                    value={newClient.since}
                    onChange={(e) => handleInputChange(e, false)}
                    placeholder="Year"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-300/70 focus:border-yellow-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                  Rating
                </label>
                <div className="flex items-center gap-1 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() =>
                        setNewClient((prev) => ({ ...prev, rating }))
                      }
                      className="transition-all touch-manipulation"
                    >
                      <Star
                        className={`h-6 w-6 sm:h-7 sm:w-7 ${
                          rating <= newClient.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-yellow-100'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-1 sm:ml-2 text-sm sm:text-base text-slate-700 font-medium">
                    {newClient.rating}/5
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 sticky bottom-0 bg-white pt-4 -mb-4 -mx-4 px-4 pb-4 border-t border-yellow-100">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setImagePreview(null);
                  setNewClient({
                    name: '',
                    category: 'Manufacturing',
                    status: 'Active',
                    since: new Date().getFullYear().toString(),
                    image: null,
                    rating: 5,
                  });
                }}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-yellow-200 rounded-lg text-slate-800 font-semibold hover:bg-yellow-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClient}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black font-semibold transition-colors border border-yellow-500 shadow-sm"
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditModal && editClient && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-2xl sm:w-full p-4 sm:p-6 border border-yellow-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-black">Edit Client</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditClient(null);
                  setEditImagePreview(null);
                }}
                className="p-2 hover:bg-yellow-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                  Client Logo/Image
                </label>

                {editImagePreview ? (
                  <div className="relative">
                    <img
                      src={editImagePreview}
                      alt="Preview"
                      className="w-full h-40 sm:h-48 object-cover rounded-lg border border-yellow-200"
                    />
                    <label className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg transition-colors border border-yellow-500 text-xs cursor-pointer shadow-sm touch-manipulation">
                      <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Change</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                      />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 sm:h-48 border border-dashed border-yellow-300 rounded-lg cursor-pointer hover:border-yellow-500 hover:bg-yellow-50 transition-all">
                    <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-slate-700">Click to upload image</p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                    />
                  </label>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editClient.name}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder="Enter client name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-300/70 focus:border-yellow-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={editClient.category}
                    onChange={(e) => handleInputChange(e, true)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-300/70 focus:border-yellow-500 outline-none transition-all"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={editClient.status}
                    onChange={(e) => handleInputChange(e, true)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-300/70 focus:border-yellow-500 outline-none transition-all"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                    Client Since
                  </label>
                  <input
                    type="text"
                    name="since"
                    value={editClient.since}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder="Year"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-300/70 focus:border-yellow-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                  Rating
                </label>
                <div className="flex items-center gap-1 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() =>
                        setEditClient((prev) => ({ ...prev, rating }))
                      }
                      className="transition-all touch-manipulation"
                    >
                      <Star
                        className={`h-6 w-6 sm:h-7 sm:w-7 ${
                          rating <= editClient.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-yellow-100'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-1 sm:ml-2 text-sm sm:text-base text-slate-700 font-medium">
                    {editClient.rating}/5
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 sticky bottom-0 bg-white pt-4 -mb-4 -mx-4 px-4 pb-4 border-t border-yellow-100">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditClient(null);
                  setEditImagePreview(null);
                }}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-yellow-200 rounded-lg text-slate-800 font-semibold hover:bg-yellow-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateClient}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black font-semibold transition-colors border border-yellow-500 shadow-sm"
              >
                Update Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Client Modal */}
      {showViewModal && selectedClient && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-2xl sm:w-full overflow-hidden border border-yellow-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 p-4 sm:p-6 relative">
              <button
                onClick={() => setShowViewModal(false)}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 bg-black/10 hover:bg-black/20 backdrop-blur rounded-lg transition-colors border border-black/10"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </button>

              <div className="flex items-center gap-3 sm:gap-4 pr-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg flex items-center justify-center border border-yellow-200 overflow-hidden flex-shrink-0">
                  {selectedClient.image ? (
                    <img
                      src={selectedClient.image}
                      alt={selectedClient.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-semibold text-black truncate">
                    {selectedClient.name}
                  </h3>
                  <p className="text-sm sm:text-base text-black/70 font-medium">
                    {selectedClient.category}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-yellow-50 p-3 sm:p-4 rounded-xl border border-yellow-200">
                  <div className="text-xs sm:text-sm text-slate-700 font-semibold mb-1">
                    Status
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                    <span className="text-sm sm:text-base font-semibold text-black">
                      {selectedClient.status}
                    </span>
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 sm:p-4 rounded-xl border border-yellow-200">
                  <div className="text-xs sm:text-sm text-slate-700 font-semibold mb-1">
                    Client Since
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-black">
                    {selectedClient.since}
                  </p>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <div className="text-xs sm:text-sm text-slate-700 font-semibold mb-2">
                  Rating
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      className={`h-5 w-5 sm:h-6 sm:w-6 ${
                        rating <= selectedClient.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-yellow-100'
                      }`}
                    />
                  ))}
                  <span className="ml-1 sm:ml-2 text-sm sm:text-base text-slate-700 font-semibold">
                    {selectedClient.rating}/5
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-yellow-200 rounded-lg text-slate-800 font-semibold hover:bg-yellow-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditClick(selectedClient);
                  }}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black font-semibold transition-colors border border-yellow-500 shadow-sm"
                >
                  Edit Client
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedClient && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-md sm:w-full p-5 sm:p-6 border border-red-200">
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-red-50 rounded-full mx-auto mb-4 border border-red-200">
              <Trash2 className="w-7 h-7 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-black text-center mb-2">
              Delete Client
            </h3>
            <p className="text-sm sm:text-base text-slate-700 text-center mb-6">
              Are you sure you want to delete{' '}
              <span className="font-semibold">"{selectedClient.name}"</span>? This
              action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-yellow-200 rounded-lg text-slate-800 font-semibold hover:bg-yellow-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-colors border border-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trust Section */}
      <div className="bg-gradient-to-br from-black via-slate-900 to-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white border border-yellow-400">
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center justify-center gap-2 bg-yellow-300 text-black rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 border border-yellow-400 text-xs sm:text-sm">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="font-semibold">Trusted Partnerships</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-3">
            Why Industry Leaders Choose Us
          </h3>
          <p className="text-sm sm:text-base text-yellow-100/80 max-w-2xl mx-auto px-4">
            Three decades of excellence serving diverse industries with innovative
            electrical solutions
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-10">
          {[
            { icon: Award, title: 'ISO Certified', desc: 'Quality assured standards' },
            { icon: Shield, title: 'Reliable Service', desc: '30+ years of trust' },
            { icon: Users, title: 'Expert Team', desc: '50+ skilled engineers' },
            { icon: CheckCircle, title: 'On-Time Delivery', desc: '100% commitment' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-yellow-500/60 rounded-xl p-4 sm:p-6 text-center hover:bg-white/10 transition-all group"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 bg-yellow-300 rounded-full mb-3 sm:mb-4 group-hover:scale-110 transition-transform border border-black/20">
                  <Icon className="h-5 w-5 sm:h-7 sm:w-7 text-black" />
                </div>
                <h4 className="font-semibold text-sm sm:text-lg mb-1">{item.title}</h4>
                <p className="text-xs sm:text-sm text-yellow-100/80">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Client Testimonial */}
        <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/60 rounded-xl sm:rounded-2xl p-5 sm:p-8 max-w-3xl mx-auto">
          <Quote className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-300 mb-3 sm:mb-4" />
          <p className="text-sm sm:text-lg text-yellow-50 leading-relaxed mb-4 sm:mb-6">
            "Working with Yash Engineering has been exceptional. Their professional
            approach, quality workmanship, and timely delivery have made them our
            preferred partner for all electrical projects."
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-300 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base text-black border border-black/20 flex-shrink-0">
              RK
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm sm:text-base">Rajesh Kumar</div>
              <div className="text-xs sm:text-sm text-yellow-100/80">
                Plant Manager, Manufacturing Sector
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300 fill-yellow-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 sm:p-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-yellow-300 rounded-full mb-3 sm:mb-4 border border-yellow-500">
            <Crown className="h-6 w-6 sm:h-7 sm:w-7 text-black" />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black mb-2 sm:mb-3 px-4">
            Join Our Growing Family of Satisfied Clients
          </h3>
          <p className="text-sm sm:text-base text-slate-700 mb-5 sm:mb-6 px-4">
            Partner with us for reliable, innovative electrical solutions that power
            your success
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl font-semibold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 border border-yellow-500"
          >
            <span className="flex items-center justify-center gap-2">
              Become Our Client
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </button>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-yellow-200">
            {[
              { icon: Shield, text: 'Quality Guaranteed' },
              { icon: Award, text: 'ISO Certified' },
              { icon: CheckCircle, text: 'Trusted Partner' },
              { icon: Star, text: '5-Star Service' },
            ].map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-1.5 sm:gap-2 text-slate-900"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <span className="font-semibold text-xs sm:text-sm">{badge.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}