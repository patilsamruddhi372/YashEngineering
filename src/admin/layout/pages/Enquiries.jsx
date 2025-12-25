import { 
  Mail,
  Phone,
  User,
  Calendar,
  Clock,
  MessageSquare,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  Grid3x3,
  List,
  RefreshCw,
  Send,
  FileText,
  TrendingUp,
  Users,
  Inbox,
  Archive,
  Star,
  Flag,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function Enquiries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  // Mock enquiries data
  const enquiries = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@company.com',
      phone: '+91 98765 43210',
      company: 'ABC Manufacturing Ltd.',
      subject: 'Control Panel Quote Request',
      message: 'We need APFC panel for our new facility in Pune. Please provide quotation for 500 KVAR capacity.',
      date: '2024-01-15',
      time: '10:30 AM',
      status: 'new',
      priority: 'high',
      source: 'Website Form'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.s@techcorp.com',
      phone: '+91 98123 45678',
      company: 'Tech Corp Industries',
      subject: 'Annual Maintenance Contract',
      message: 'Looking for AMC for our existing electrical systems. We have 3 facilities in Maharashtra.',
      date: '2024-01-14',
      time: '02:15 PM',
      status: 'in-progress',
      priority: 'medium',
      source: 'Contact Form'
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@industries.com',
      phone: '+91 97654 32109',
      company: 'Patel Industries',
      subject: 'PLC Panel Installation',
      message: 'Need complete automation solution with PLC panels for our production line.',
      date: '2024-01-13',
      time: '09:45 AM',
      status: 'resolved',
      priority: 'high',
      source: 'Phone Call'
    },
    {
      id: 4,
      name: 'Sneha Desai',
      email: 'sneha.d@pharma.com',
      phone: '+91 96543 21098',
      company: 'Desai Pharmaceuticals',
      subject: 'Electrical Contractor Services',
      message: 'Require electrical contractor for new plant setup. Timeline: 6 months.',
      date: '2024-01-12',
      time: '11:20 AM',
      status: 'new',
      priority: 'medium',
      source: 'Website Form'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram@textiles.com',
      phone: '+91 95432 10987',
      company: 'Singh Textiles',
      subject: 'Energy Audit Request',
      message: 'Want comprehensive energy audit for our textile manufacturing unit.',
      date: '2024-01-11',
      time: '04:30 PM',
      status: 'spam',
      priority: 'low',
      source: 'Email'
    }
  ];

  // Status configurations
  const statusConfig = {
    all: { label: 'All Enquiries', color: 'gray', icon: Inbox },
    new: { label: 'New', color: 'yellow', icon: Mail },
    'in-progress': { label: 'In Progress', color: 'amber', icon: Clock },
    resolved: { label: 'Resolved', color: 'green', icon: CheckCircle },
    spam: { label: 'Spam', color: 'red', icon: XCircle }
  };

  // Priority configurations
  const priorityConfig = {
    high: { label: 'High', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    medium: { label: 'Medium', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    low: { label: 'Low', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' }
  };

  // Quick Actions
  const quickActions = [
    {
      label: 'All Enquiries',
      description: 'Reset filters',
      icon: Inbox,
      onClick: () => {
        setStatusFilter('all');
        setSortBy('date-desc');
        setSearchTerm('');
      }
    },
    {
      label: 'New Enquiries',
      description: 'Only new',
      icon: Mail,
      onClick: () => {
        setStatusFilter('new');
        setSortBy('date-desc');
        setSearchTerm('');
      }
    },
    {
      label: 'Pending',
      description: 'In-progress',
      icon: Clock,
      onClick: () => {
        setStatusFilter('in-progress');
        setSortBy('date-desc');
        setSearchTerm('');
      }
    },
    {
      label: 'High Priority',
      description: 'By priority',
      icon: Flag,
      onClick: () => {
        setSortBy('priority');
        setStatusFilter('all');
      }
    }
  ];

  // Filter and sort enquiries
  const filteredEnquiries = enquiries
    .filter(enquiry => {
      const matchesSearch = 
        enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  // Calculate stats
  const stats = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === 'new').length,
    inProgress: enquiries.filter(e => e.status === 'in-progress').length,
    resolved: enquiries.filter(e => e.status === 'resolved').length
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 bg-yellow-300 rounded-lg shadow-sm border border-yellow-400">
              <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-black">Enquiries</h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700">
            Manage and respond to customer enquiries
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-yellow-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all text-xs sm:text-sm font-semibold text-slate-800">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-yellow-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all text-xs sm:text-sm font-semibold text-slate-800">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-yellow-200 p-4 sm:p-6 hover:shadow-md transition-all hover:-translate-y-0.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-2 sm:mb-3">
            <div className="p-1.5 sm:p-2 bg-yellow-50 rounded-lg border border-yellow-100 mb-2 sm:mb-0">
              <Inbox className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500">TOTAL</span>
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-slate-900">{stats.total}</div>
          <div className="text-xs sm:text-sm text-slate-600 mt-1">All Enquiries</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-yellow-200 p-4 sm:p-6 hover:shadow-md transition-all hover:-translate-y-0.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-2 sm:mb-3">
            <div className="p-1.5 sm:p-2 bg-yellow-50 rounded-lg border border-yellow-100 mb-2 sm:mb-0">
              <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-700" />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-yellow-700">NEW</span>
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-yellow-700">{stats.new}</div>
          <div className="text-xs sm:text-sm text-slate-600 mt-1">New Enquiries</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-yellow-200 p-4 sm:p-6 hover:shadow-md transition-all hover:-translate-y-0.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-2 sm:mb-3">
            <div className="p-1.5 sm:p-2 bg-amber-50 rounded-lg border border-amber-100 mb-2 sm:mb-0">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-amber-700" />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-amber-700">PENDING</span>
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-amber-700">{stats.inProgress}</div>
          <div className="text-xs sm:text-sm text-slate-600 mt-1">In Progress</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-emerald-200 p-4 sm:p-6 hover:shadow-md transition-all hover:-translate-y-0.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-2 sm:mb-3">
            <div className="p-1.5 sm:p-2 bg-emerald-50 rounded-lg border border-emerald-100 mb-2 sm:mb-0">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-700" />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-emerald-700">RESOLVED</span>
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-emerald-700">{stats.resolved}</div>
          <div className="text-xs sm:text-sm text-slate-600 mt-1">Completed</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-yellow-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
          <h3 className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wide">
            Quick Actions
          </h3>
          <span className="text-[10px] sm:text-xs text-slate-500">
            Shortcuts to common views
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const isReset = action.label === 'All Enquiries';
            return (
              <button
                key={action.label}
                type="button"
                onClick={action.onClick}
                className={`flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl border text-left transition-all hover:-translate-y-0.5 hover:shadow-sm ${
                  isReset
                    ? 'bg-yellow-50 border-yellow-200 hover:border-yellow-400'
                    : 'bg-white border-yellow-100 hover:border-yellow-300 hover:bg-yellow-50'
                }`}
              >
                <div className={`p-1.5 sm:p-2 rounded-lg border flex-shrink-0 ${isReset ? 'bg-yellow-100 border-yellow-300' : 'bg-yellow-50 border-yellow-200'}`}>
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs font-semibold text-slate-900 truncate">
                    {action.label}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-600 truncate">
                    {action.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl shadow-sm border border-yellow-200 p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
          {/* Search */}
          <div className="sm:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search enquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-9 py-2 sm:py-2.5 border border-yellow-200 rounded-lg focus:border-yellow-400 focus:ring-1 focus:ring-yellow-300 outline-none transition-colors text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-1">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-yellow-200 rounded-lg font-medium text-sm appearance-none cursor-pointer focus:border-yellow-400 focus:ring-1 focus:ring-yellow-300 outline-none"
            >
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="sm:col-span-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-yellow-200 rounded-lg font-medium text-sm appearance-none cursor-pointer focus:border-yellow-400 focus:ring-1 focus:ring-yellow-300 outline-none"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="priority">By Priority</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-yellow-100 text-xs sm:text-sm text-slate-600">
          Showing <strong className="text-slate-900">{filteredEnquiries.length}</strong> of{' '}
          <strong className="text-slate-900">{enquiries.length}</strong> enquiries
        </div>
      </div>

      {/* Grid View */}
      {filteredEnquiries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEnquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className="group bg-white rounded-xl shadow-sm border border-yellow-200 hover:border-yellow-400 hover:shadow-md transition-all p-4 sm:p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-300 rounded-full flex items-center justify-center text-black font-bold text-base sm:text-lg border border-yellow-500/60 flex-shrink-0">
                    {enquiry.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 text-sm truncate">{enquiry.name}</div>
                    <div className="text-xs text-slate-600 truncate">{enquiry.company}</div>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold border flex-shrink-0 ${priorityConfig[enquiry.priority].bg} ${priorityConfig[enquiry.priority].color} ${priorityConfig[enquiry.priority].border}`}>
                  {priorityConfig[enquiry.priority].label}
                </span>
              </div>

              {/* Subject */}
              <h3 className="font-semibold text-slate-900 mb-2 text-sm">{enquiry.subject}</h3>
              
              {/* Message */}
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-3 sm:mb-4">{enquiry.message}</p>

              {/* Contact Info */}
              <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-yellow-100">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                  <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{enquiry.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                  <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                  <span>{enquiry.phone}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-500">
                  <Calendar className="h-3 w-3" />
                  <span>{enquiry.date}</span>
                  <Clock className="h-3 w-3 ml-1 sm:ml-2" />
                  <span>{enquiry.time}</span>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${
                  enquiry.status === 'new'
                    ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                    : enquiry.status === 'in-progress'
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : enquiry.status === 'resolved'
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                    : 'bg-red-100 text-red-700 border-red-300'
                }`}>
                  {statusConfig[enquiry.status].label}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-yellow-100">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all font-semibold text-xs sm:text-sm border border-yellow-500">
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>View</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-slate-900 text-yellow-50 rounded-lg hover:bg-black transition-all font-semibold text-xs sm:text-sm">
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="bg-white rounded-xl shadow-sm border border-yellow-200 p-8 sm:p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-yellow-50 rounded-full mb-4 sm:mb-6 border border-yellow-200">
            <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 text-slate-400" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">No enquiries found</h3>
          <p className="text-sm sm:text-base text-slate-700 mb-4 sm:mb-6">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Contact form submissions will appear here'}
          </p>
          {(searchTerm || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setSortBy('date-desc');
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 border border-yellow-500"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}