import { 
  Package, 
  Wrench, 
  Image, 
  MessageSquare, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Eye,
  Bell,
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  DollarSign,
  BarChart3,
  Activity,
  Star,
  Download,
  Settings,
  Search,
  Filter,
  FileText,
  Zap,
  Target,
  Award,
  Building2,
  Phone,
  Mail,
  ChevronRight,
  XCircle,
  AlertTriangle,
  Info,
  Sparkles
} from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("7days");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // brochure upload
  const handleBrochureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleBrochureChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    // TODO: replace with real upload logic
    console.log("Selected brochure file:", file);
  };

  // navigation helpers
  const handleNotificationClick = () => {
    // Change this to your actual notifications page route
    navigate("/admin/notifications");
  };

  const handleQuickAddClick = () => {
    // Change this to what you want Quick Add to do
    navigate("/admin/products/new");
  };

  const handleQuickActionClick = (href) => {
    if (href) navigate(href);
  };

  // Stats (unified yellow accent)
  const stats = [
    { 
      label: "Total Products", 
      value: 8, 
      change: +2, 
      percentage: "+25%",
      changeLabel: "vs last month",
      icon: Package, 
      color: "bg-yellow-400",
      lightColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-200",
      trend: [20, 25, 22, 30, 28, 35, 32]
    },
    { 
      label: "Active Services", 
      value: 6, 
      change: +1, 
      percentage: "+16%",
      changeLabel: "vs last month",
      icon: Wrench, 
      color: "bg-yellow-400",
      lightColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-200",
      trend: [15, 18, 20, 19, 22, 21, 24]
    },
    { 
      label: "Gallery Images", 
      value: 20, 
      change: +5, 
      percentage: "+33%",
      changeLabel: "vs last month",
      icon: Image, 
      color: "bg-yellow-400",
      lightColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-200",
      trend: [30, 35, 32, 40, 38, 42, 45]
    },
    { 
      label: "New Enquiries", 
      value: 15, 
      change: -3, 
      percentage: "-16%",
      changeLabel: "vs last month",
      icon: MessageSquare, 
      color: "bg-yellow-400",
      lightColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-200",
      trend: [25, 28, 30, 27, 24, 22, 20]
    },
  ];

  // Additional metrics
  const metrics = [
    {
      label: "Total Clients",
      value: "100+",
      icon: Users,
      color: "text-black",
      bg: "bg-yellow-50"
    },
    {
      label: "Projects Done",
      value: "500+",
      icon: Award,
      color: "text-black",
      bg: "bg-yellow-50"
    },
    {
      label: "Avg. Response",
      value: "2 hrs",
      icon: Clock,
      color: "text-black",
      bg: "bg-yellow-50"
    },
    {
      label: "Success Rate",
      value: "98%",
      icon: Target,
      color: "text-black",
      bg: "bg-yellow-50"
    }
  ];

  // Quick actions (now clickable via href)
  const quickActions = [
    { 
      label: "Add Product", 
      icon: Package, 
      href: "/admin/Products",
    },
    { 
      label: "Add Service", 
      icon: Wrench, 
      href: "/admin/Services",
    },
    { 
      label: "Upload Image", 
      icon: Image, 
      href: "/admin/Gallery",
    },
    { 
      label: "View Enquiries", 
      icon: MessageSquare, 
      href: "/admin/Enquiries",
    },
  ];

  // Recent activity
  const recentActivity = [
    { 
      type: "success", 
      message: "New enquiry received from Rajesh Kumar", 
      detail: "Control Panel Quote Request",
      time: "5 minutes ago",
      icon: CheckCircle,
      actionLabel: "View"
    },
    { 
      type: "info", 
      message: "Product 'APFC Panel' was updated", 
      detail: "Price and specifications modified",
      time: "2 hours ago",
      icon: Info,
      actionLabel: "View"
    },
    { 
      type: "warning", 
      message: "3 enquiries pending response", 
      detail: "Requires immediate attention",
      time: "1 day ago",
      icon: AlertCircle,
      actionLabel: "Respond"
    },
    { 
      type: "success", 
      message: "New client added to portfolio", 
      detail: "Tata Motors - Pune Division",
      time: "2 days ago",
      icon: Building2,
      actionLabel: "View"
    },
    { 
      type: "info", 
      message: "5 new images added to gallery", 
      detail: "Recent project photos uploaded",
      time: "3 days ago",
      icon: Image,
      actionLabel: "View"
    },
  ];

  // Top products
  const topProducts = [
    { name: "APFC Panel", sales: 45, trend: "up", percentage: 85 },
    { name: "MCC Panel", sales: 38, trend: "up", percentage: 72 },
    { name: "PLC Control Panel", sales: 32, trend: "down", percentage: 60 },
    { name: "Distribution Board", sales: 28, trend: "up", percentage: 52 },
  ];

  // Recent clients
  const recentClients = [
    { name: "Tata Motors", status: "active", project: "Control Panel Installation", value: "₹5.2L" },
    { name: "Serum Institute", status: "pending", project: "Annual Maintenance", value: "₹3.8L" },
    { name: "Bajaj Auto", status: "active", project: "Electrical Contracting", value: "₹4.5L" },
  ];

  // Pending tasks
  const pendingTasks = [
    { task: "Respond to 3 enquiries", priority: "high", dueDate: "Today" },
    { task: "Update product catalog", priority: "medium", dueDate: "Tomorrow" },
    { task: "Review gallery images", priority: "low", dueDate: "This week" },
  ];

  const getActivityStyles = (type) => {
    switch (type) {
      case "success":
        return { 
          bg: "bg-white", 
          text: "text-emerald-700", 
          border: "border-emerald-200",
          icon: "text-emerald-600",
          left: "border-l-4 border-l-emerald-500"
        };
      case "warning":
        return { 
          bg: "bg-white", 
          text: "text-amber-700", 
          border: "border-amber-200",
          icon: "text-amber-600",
          left: "border-l-4 border-l-amber-500"
        };
      case "info":
        return { 
          bg: "bg-white", 
          text: "text-yellow-800", 
          border: "border-yellow-200",
          icon: "text-yellow-600",
          left: "border-l-4 border-l-yellow-500"
        };
      default:
        return { 
          bg: "bg-white", 
          text: "text-gray-700", 
          border: "border-gray-200",
          icon: "text-gray-600",
          left: "border-l-4 border-l-gray-400"
        };
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Mini chart component
  const MiniChart = ({ data, color }) => (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((value, index) => (
        <div
          key={index}
          className={`flex-1 ${color} rounded-sm transition-all hover:opacity-80`}
          style={{ height: `${(value / Math.max(...data)) * 100}%` }}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white border-b border-yellow-200 -m-6 mb-6 p-6 md:p-8 rounded-b-3xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 mb-2 border border-yellow-300">
              <Sparkles className="w-4 h-4 text-yellow-700" />
              <span className="text-xs font-semibold text-yellow-800 uppercase tracking-wide">
                Admin Dashboard
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 flex items-center gap-2">
              {getGreeting()}, Admin! <span className="animate-wave">👋</span>
            </h1>
            <p className="text-slate-600 mt-2 flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              {currentDate}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Time Range Filter */}
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-300"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>

            {/* Notifications (clickable) */}
            <button
              onClick={handleNotificationClick}
              className="relative p-2.5 text-slate-700 hover:bg-yellow-50 rounded-lg transition-colors border border-slate-200"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Hidden file input for brochure upload */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              onChange={handleBrochureChange}
            />

            {/* Upload Brochure (clickable) */}
            <button
              onClick={handleBrochureClick}
              className="flex items-center gap-2 bg-white hover:bg-yellow-50 text-slate-800 px-5 py-2.5 rounded-lg font-semibold transition-all shadow-sm border border-slate-200"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Upload Brochure</span>
            </button>

            {/* Quick Add (clickable) */}
            <button
              onClick={handleQuickAddClick}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md border border-yellow-500"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change >= 0;
          
          return (
            <div 
              key={stat.label} 
              className={`bg-white p-5 rounded-2xl shadow-sm border ${stat.borderColor} hover:shadow-md transition-all duration-200 group`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.lightColor} border border-yellow-100`}>
                  <Icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isPositive ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {stat.percentage}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-0.5">{stat.value}</h3>
                <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
              
              {/* Mini trend chart */}
              <div className="mt-4 pt-3 border-t border-yellow-100">
                <MiniChart data={stat.trend} color={stat.color} />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-[11px] text-slate-500">{stat.changeLabel}</p>
                <ChevronRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div 
              key={metric.label}
              className="bg-white p-4 rounded-xl shadow-sm border border-yellow-100 hover:border-yellow-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 ${metric.bg} rounded-lg border border-yellow-200`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div>
                  <div className="text-xl font-semibold text-slate-900">{metric.value}</div>
                  <div className="text-xs text-slate-600">{metric.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Quick Actions (clickable) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => handleQuickActionClick(action.href)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-yellow-50 hover:bg-yellow-100 text-slate-900 transition-all border border-yellow-100 hover:border-yellow-300"
                >
                  <div className="p-2 rounded-lg bg-white border border-yellow-100">
                    <Icon className="w-5 h-5 text-yellow-700" />
                  </div>
                  <span className="text-xs font-semibold text-left leading-tight">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-slate-900">Pending Tasks</h3>
            <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-200">
              {pendingTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((item, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl bg-white hover:bg-yellow-50 transition-all cursor-pointer border border-slate-200 hover:border-yellow-300 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 mb-2">
                      {item.task}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getPriorityStyles(item.priority)}`}>
                        {item.priority}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.dueDate}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-yellow-800 hover:bg-yellow-50 rounded-lg font-semibold text-sm transition-colors border border-yellow-100">
            View All Tasks
          </button>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-slate-900">Top Products</h3>
            <BarChart3 className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900 text-sm">{product.name}</span>
                    {product.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                  </div>
                  <span className="text-sm font-semibold text-slate-600">{product.sales}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      product.trend === "up" 
                        ? "bg-gradient-to-r from-yellow-300 to-yellow-500" 
                        : "bg-gradient-to-r from-red-300 to-red-500"
                    }`}
                    style={{ width: `${product.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Recent Clients */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-yellow-500" />
              Recent Activity
            </h3>
            <button className="text-yellow-800 hover:text-yellow-900 text-sm font-semibold flex items-center gap-1 group">
              View All 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              const styles = getActivityStyles(activity.type);
              
              return (
                <div 
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-xl border ${styles.border} ${styles.bg} hover:bg-yellow-50 transition-all cursor-pointer group ${styles.left}`}
                >
                  <div className="p-2 rounded-lg bg-yellow-50 border border-yellow-100">
                    <Icon className={`w-4 h-4 ${styles.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 font-semibold mb-1">
                      {activity.message}
                    </p>
                    <p className="text-xs text-slate-600 mb-2">
                      {activity.detail}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                      <button className={`text-xs font-semibold ${styles.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                        {activity.actionLabel} →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Clients */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-yellow-500" />
              Recent Clients
            </h3>
            <button className="text-yellow-800 hover:text-yellow-900 text-sm font-semibold flex items-center gap-1 group">
              View All 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="space-y-3">
            {recentClients.map((client, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl bg-white hover:bg-yellow-50 border border-slate-200 hover:border-yellow-300 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-300 rounded-lg flex items-center justify-center text-black font-bold border border-yellow-500/70">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{client.name}</h4>
                      <p className="text-xs text-slate-600">{client.project}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                    client.status === "active" 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                      : "bg-yellow-50 text-yellow-800 border-yellow-200"
                  }`}>
                    {client.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-sm font-semibold text-yellow-800">{client.value}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-yellow-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg border border-yellow-300">
                <TrendingUp className="w-5 h-5 text-yellow-700" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Performance Overview
              </h3>
            </div>
            <p className="text-sm text-slate-700 mb-4 max-w-2xl">
              Your business is growing steadily. You've achieved{" "}
              <span className="font-semibold text-slate-900">15% more enquiries</span> this month 
              and maintained a{" "}
              <span className="font-semibold text-slate-900">98% client satisfaction rate</span>. 
              Keep up the excellent work.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-semibold text-slate-800">
                  +25% Revenue Growth
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-semibold text-slate-800">
                  5.0 Client Rating
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-semibold text-slate-800">
                  500+ Projects Done
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition-all shadow-sm border border-yellow-500">
              <Eye className="w-5 h-5" />
              View Report
            </button>
            <button className="flex items-center justify-center gap-2 bg-white hover:bg-yellow-50 border border-slate-200 px-6 py-3 rounded-xl font-semibold text-slate-800 transition-all">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4d4d8;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a1a1aa;
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }
        .animate-wave {
          display: inline-block;
          animation: wave 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}