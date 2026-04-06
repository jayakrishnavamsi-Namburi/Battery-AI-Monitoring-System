// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { 
//   ArrowLeft, Calendar, Clock, Battery, Activity, Zap, 
//   Cpu, Thermometer, Gauge, TrendingUp, Shield, Sparkles,
//   Download, Filter, Search, ChevronLeft, ChevronRight,
//   Eye, HardDrive, Wifi, AlertTriangle, CheckCircle
// } from "lucide-react";
// import { getHistory } from "../services/api";

// export default function HistoryPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [history, setHistory] = useState([]);
//   const [filteredHistory, setFilteredHistory] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(15);
//   const [dateFilter, setDateFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     // Check if dark mode is enabled
//     const isDark = document.documentElement.classList.contains("dark");
//     setDarkMode(isDark);
//   }, []);

//   useEffect(() => {
//     loadHistory();
//   }, []);

//   useEffect(() => {
//     filterHistory();
//   }, [searchTerm, dateFilter, statusFilter, history]);

//   const loadHistory = async () => {
//     try {
//       const data = await getHistory();
//       setHistory(data);
//       setFilteredHistory(data);
      
//       // Check if a specific item was passed via state
//       if (location.state?.selectedItem) {
//         setSelectedItem(location.state.selectedItem);
//       }
//     } catch (error) {
//       console.error("Failed to load history:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filterHistory = () => {
//     let filtered = [...history];

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(item => 
//         item.batteryLevel.toString().includes(searchTerm) ||
//         item.cpuUsage.toString().includes(searchTerm) ||
//         new Date(item.createdAt).toLocaleString().toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Date filter
//     const now = new Date();
//     if (dateFilter === "today") {
//       filtered = filtered.filter(item => {
//         const itemDate = new Date(item.createdAt);
//         return itemDate.toDateString() === now.toDateString();
//       });
//     } else if (dateFilter === "week") {
//       const weekAgo = new Date(now.setDate(now.getDate() - 7));
//       filtered = filtered.filter(item => new Date(item.createdAt) >= weekAgo);
//     } else if (dateFilter === "month") {
//       const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
//       filtered = filtered.filter(item => new Date(item.createdAt) >= monthAgo);
//     }

//     // Status filter
//     if (statusFilter === "excellent") {
//       filtered = filtered.filter(item => item.batteryLevel >= 80);
//     } else if (statusFilter === "good") {
//       filtered = filtered.filter(item => item.batteryLevel >= 60 && item.batteryLevel < 80);
//     } else if (statusFilter === "moderate") {
//       filtered = filtered.filter(item => item.batteryLevel >= 40 && item.batteryLevel < 60);
//     } else if (statusFilter === "warning") {
//       filtered = filtered.filter(item => item.batteryLevel >= 20 && item.batteryLevel < 40);
//     } else if (statusFilter === "critical") {
//       filtered = filtered.filter(item => item.batteryLevel < 20);
//     }

//     setFilteredHistory(filtered);
//     setCurrentPage(1);
//   };

//   const getStatusBadge = (level) => {
//     if (level >= 80) return { text: "Excellent", color: "emerald", icon: CheckCircle };
//     if (level >= 60) return { text: "Good", color: "green", icon: CheckCircle };
//     if (level >= 40) return { text: "Moderate", color: "blue", icon: Activity };
//     if (level >= 20) return { text: "Warning", color: "amber", icon: AlertTriangle };
//     return { text: "Critical", color: "red", icon: AlertTriangle };
//   };

//   const getBatteryColor = (level) => {
//     if (level >= 80) return "from-emerald-400 to-green-500";
//     if (level >= 60) return "from-green-400 to-emerald-500";
//     if (level >= 40) return "from-blue-400 to-cyan-500";
//     if (level >= 20) return "from-amber-400 to-orange-500";
//     return "from-red-500 to-rose-600";
//   };

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

//   const exportData = () => {
//     const dataStr = JSON.stringify(filteredHistory, null, 2);
//     const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
//     const exportFileDefaultName = `battery_history_${new Date().toISOString()}.json`;
//     const linkElement = document.createElement('a');
//     linkElement.setAttribute('href', dataUri);
//     linkElement.setAttribute('download', exportFileDefaultName);
//     linkElement.click();
//   };

//   if (isLoading) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//         <div className="relative">
//           <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Battery className="w-8 h-8 text-blue-400 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-all duration-500">
      
//       {/* Header */}
//       <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
//         <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 group"
//               >
//                 <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:-translate-x-1 transition-transform" />
//               </button>
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   History Analytics
//                 </h1>
//                 <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
//                   Complete battery telemetry history with advanced filtering
//                 </p>
//               </div>
//             </div>
            
//             <button
//               onClick={exportData}
//               className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
//             >
//               <Download size={16} />
//               Export Data
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
//         {/* Stats Summary */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-200 dark:border-slate-700">
//             <p className="text-xs text-slate-500 mb-1">Total Records</p>
//             <p className="text-2xl font-bold text-slate-900 dark:text-white">{history.length}</p>
//           </div>
//           <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-200 dark:border-slate-700">
//             <p className="text-xs text-slate-500 mb-1">Average Battery</p>
//             <p className="text-2xl font-bold text-emerald-600">
//               {(history.reduce((sum, item) => sum + item.batteryLevel, 0) / history.length).toFixed(1)}%
//             </p>
//           </div>
//           <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-200 dark:border-slate-700">
//             <p className="text-xs text-slate-500 mb-1">Avg CPU Load</p>
//             <p className="text-2xl font-bold text-blue-600">
//               {(history.reduce((sum, item) => sum + item.cpuUsage, 0) / history.length).toFixed(1)}%
//             </p>
//           </div>
//           <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-200 dark:border-slate-700">
//             <p className="text-xs text-slate-500 mb-1">Charging Events</p>
//             <p className="text-2xl font-bold text-amber-600">
//               {history.filter(item => item.charging).length}
//             </p>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700 mb-8">
//           <div className="flex flex-wrap gap-4">
//             <div className="flex-1 min-w-[200px]">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by battery level, CPU, or date..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
            
//             <select
//               value={dateFilter}
//               onChange={(e) => setDateFilter(e.target.value)}
//               className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Time</option>
//               <option value="today">Today</option>
//               <option value="week">Last 7 Days</option>
//               <option value="month">Last 30 Days</option>
//             </select>

//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Status</option>
//               <option value="excellent">Excellent (80-100%)</option>
//               <option value="good">Good (60-79%)</option>
//               <option value="moderate">Moderate (40-59%)</option>
//               <option value="warning">Warning (20-39%)</option>
//               <option value="critical">Critical (0-19%)</option>
//             </select>

//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setDateFilter("all");
//                 setStatusFilter("all");
//               }}
//               className="px-4 py-2 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors"
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>

//         {/* History Table */}
//         <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-gray-800/80 dark:to-gray-800/40 border-b-2 border-slate-200 dark:border-gray-700">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">#</th>
//                   <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
//                     <div className="flex items-center gap-2"><Battery size={14}/> Battery</div>
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
//                     <div className="flex items-center gap-2"><Cpu size={14}/> CPU</div>
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Status</th>
//                   <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Power</th>
//                   <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
//                     <div className="flex items-center gap-2"><Calendar size={14}/> Date & Time</div>
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
//                 {currentItems.map((item, idx) => {
//                   const status = getStatusBadge(item.batteryLevel);
//                   const StatusIcon = status.icon;
//                   const date = new Date(item.createdAt);
                  
//                   return (
//                     <tr 
//                       key={idx}
//                       onClick={() => setSelectedItem(item)}
//                       className="cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
//                     >
//                       <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
//                         {(currentPage - 1) * itemsPerPage + idx + 1}
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <span className={`font-mono font-bold text-lg ${
//                             item.batteryLevel >= 80 ? 'text-emerald-600' :
//                             item.batteryLevel >= 60 ? 'text-green-600' :
//                             item.batteryLevel >= 40 ? 'text-blue-600' :
//                             item.batteryLevel >= 20 ? 'text-amber-600' :
//                             'text-red-600'
//                           }`}>
//                             {item.batteryLevel}%
//                           </span>
//                           <div className="w-20 bg-slate-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
//                             <div 
//                               className={`h-full bg-gradient-to-r ${getBatteryColor(item.batteryLevel)} rounded-full transition-all`}
//                               style={{ width: `${item.batteryLevel}%` }}
//                             />
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <div className="w-10 h-10 relative">
//                             <svg className="w-10 h-10 transform -rotate-90">
//                               <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-slate-200 dark:text-gray-700" />
//                               <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeDasharray={`${2 * Math.PI * 16}`} strokeDashoffset={`${2 * Math.PI * 16 * (1 - item.cpuUsage / 100)}`} className="text-blue-500 transition-all" />
//                             </svg>
//                             <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">{item.cpuUsage}</span>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-${status.color}-100 text-${status.color}-700 dark:bg-${status.color}-900/30 dark:text-${status.color}-400`}>
//                           <StatusIcon size={10} />
//                           {status.text}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         {item.charging ? (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
//                             <Zap size={10} fill="currentColor"/> Charging
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 dark:bg-gray-800 dark:text-slate-400">
//                             <Battery size={10}/> Discharging
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex flex-col">
//                           <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
//                             {date.toLocaleDateString()}
//                           </span>
//                           <span className="text-xs text-slate-400 font-mono">
//                             {date.toLocaleTimeString()}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedItem(item);
//                           }}
//                           className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-all"
//                         >
//                           <Eye size={12} />
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-700">
//               <p className="text-sm text-slate-500">
//                 Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredHistory.length)} of {filteredHistory.length} entries
//               </p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
//                 >
//                   <ChevronLeft size={16} />
//                 </button>
//                 <span className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium">
//                   {currentPage} / {totalPages}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                   disabled={currentPage === totalPages}
//                   className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
//                 >
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Details Modal */}
//       {selectedItem && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
//           <div className="relative bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
//             <div className="sticky top-0 bg-white dark:bg-slate-900 p-6 border-b border-slate-200 dark:border-slate-700">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-xl font-bold text-slate-900 dark:text-white">Telemetry Details</h3>
//                 <button onClick={() => setSelectedItem(null)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
//                   <span className="text-2xl">&times;</span>
//                 </button>
//               </div>
//             </div>
//             <div className="p-6 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
//                   <p className="text-xs text-slate-500 mb-1">Battery Level</p>
//                   <p className="text-3xl font-bold text-blue-600">{selectedItem.batteryLevel}%</p>
//                 </div>
//                 <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
//                   <p className="text-xs text-slate-500 mb-1">CPU Usage</p>
//                   <p className="text-3xl font-bold text-purple-600">{selectedItem.cpuUsage}%</p>
//                 </div>
//                 <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl">
//                   <p className="text-xs text-slate-500 mb-1">Power State</p>
//                   <p className="text-xl font-bold text-amber-600">{selectedItem.charging ? "Charging" : "Discharging"}</p>
//                 </div>
//                 <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl">
//                   <p className="text-xs text-slate-500 mb-1">Timestamp</p>
//                   <p className="text-sm font-medium text-emerald-600">{new Date(selectedItem.createdAt).toLocaleString()}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, Calendar, Clock, Battery, Activity, Zap, 
  Cpu, Thermometer, Gauge, TrendingUp, Shield, Sparkles,
  Download, Filter, Search, ChevronLeft, ChevronRight,
  Eye, HardDrive, Wifi, AlertTriangle, CheckCircle
} from "lucide-react";
import { getHistory } from "../services/api";

export default function HistoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    filterHistory();
  }, [searchTerm, dateFilter, statusFilter, history]);

  const loadHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
      setFilteredHistory(data);
      
      if (location.state?.selectedItem) {
        setSelectedItem(location.state.selectedItem);
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterHistory = () => {
    let filtered = [...history];

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.batteryLevel.toString().includes(searchTerm) ||
        item.cpuUsage.toString().includes(searchTerm) ||
        new Date(item.createdAt).toLocaleString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const now = new Date();
    if (dateFilter === "today") {
      filtered = filtered.filter(item => new Date(item.createdAt).toDateString() === now.toDateString());
    } else if (dateFilter === "week") {
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      filtered = filtered.filter(item => new Date(item.createdAt) >= weekAgo);
    } else if (dateFilter === "month") {
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      filtered = filtered.filter(item => new Date(item.createdAt) >= monthAgo);
    }

    if (statusFilter === "excellent") {
      filtered = filtered.filter(item => item.batteryLevel >= 80);
    } else if (statusFilter === "good") {
      filtered = filtered.filter(item => item.batteryLevel >= 60 && item.batteryLevel < 80);
    } else if (statusFilter === "moderate") {
      filtered = filtered.filter(item => item.batteryLevel >= 40 && item.batteryLevel < 60);
    } else if (statusFilter === "warning") {
      filtered = filtered.filter(item => item.batteryLevel >= 20 && item.batteryLevel < 40);
    } else if (statusFilter === "critical") {
      filtered = filtered.filter(item => item.batteryLevel < 20);
    }

    setFilteredHistory(filtered);
    setCurrentPage(1);
  };

  const getStatusBadge = (level) => {
    if (level >= 80) return { text: "Excellent", color: "emerald", icon: CheckCircle };
    if (level >= 60) return { text: "Good", color: "green", icon: CheckCircle };
    if (level >= 40) return { text: "Moderate", color: "blue", icon: Activity };
    if (level >= 20) return { text: "Warning", color: "amber", icon: AlertTriangle };
    return { text: "Critical", color: "red", icon: AlertTriangle };
  };

  const getBatteryColor = (level) => {
    if (level >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (level >= 60) return "text-green-600 dark:text-green-400";
    if (level >= 40) return "text-blue-600 dark:text-blue-400";
    if (level >= 20) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getBatteryBg = (level) => {
    if (level >= 80) return "bg-emerald-500";
    if (level >= 60) return "bg-green-500";
    if (level >= 40) return "bg-blue-500";
    if (level >= 20) return "bg-amber-500";
    return "bg-red-500";
  };

  const getBadgeStyle = (color) => {
    const styles = {
      emerald: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
      green: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400",
      blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
      amber: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
      red: "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400"
    };
    return styles[color] || styles.blue;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  const exportData = () => {
    const dataStr = JSON.stringify(filteredHistory, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `battery_history_${new Date().toISOString()}.json`);
    linkElement.click();
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-500 text-sm">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                  History
                </h1>
                <p className="text-xs text-slate-400">Battery telemetry records</p>
              </div>
            </div>
            
            <button
              onClick={exportData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
            >
              <Download size={14} />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Records</p>
            <p className="text-xl font-bold text-slate-800 dark:text-white">{history.length}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Avg Battery</p>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {(history.reduce((sum, item) => sum + item.batteryLevel, 0) / history.length).toFixed(1)}%
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Avg CPU</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {(history.reduce((sum, item) => sum + item.cpuUsage, 0) / history.length).toFixed(1)}%
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Charging</p>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
              {history.filter(item => item.charging).length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[180px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All status</option>
              <option value="excellent">Excellent (80-100%)</option>
              <option value="good">Good (60-79%)</option>
              <option value="moderate">Moderate (40-59%)</option>
              <option value="warning">Warning (20-39%)</option>
              <option value="critical">Critical (0-19%)</option>
            </select>

            {(searchTerm || dateFilter !== "all" || statusFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setDateFilter("all");
                  setStatusFilter("all");
                }}
                className="px-3 py-1.5 text-sm rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">#</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Battery</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">CPU</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Power</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {currentItems.map((item, idx) => {
                  const status = getStatusBadge(item.batteryLevel);
                  const StatusIcon = status.icon;
                  const date = new Date(item.createdAt);
                  
                  return (
                    <tr 
                      key={idx}
                      onClick={() => setSelectedItem(item)}
                      className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-slate-400 text-xs">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${getBatteryColor(item.batteryLevel)}`}>
                            {item.batteryLevel}%
                          </span>
                          <div className="w-12 bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                            <div 
                              className={`${getBatteryBg(item.batteryLevel)} h-full rounded-full transition-all`}
                              style={{ width: `${item.batteryLevel}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Cpu size={12} className="text-slate-400" />
                          <span className="text-slate-700 dark:text-slate-300">{item.cpuUsage}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getBadgeStyle(status.color)}`}>
                          <StatusIcon size={10} />
                          {status.text}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {item.charging ? (
                          <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                            <Zap size={12} />
                            Charging
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                            <Battery size={12} />
                            Discharging
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-700 dark:text-slate-300">
                            {date.toLocaleDateString()}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {date.toLocaleTimeString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItem(item);
                          }}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-400">
                {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredHistory.length)} of {filteredHistory.length}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-md disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft size={14} />
                </button>
                <span className="px-3 py-1 text-sm text-slate-600 dark:text-slate-400">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-md disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <Battery size={32} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No matching records found</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-800 dark:text-white">Record Details</h3>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Battery</span>
                <span className={`font-semibold ${getBatteryColor(selectedItem.batteryLevel)}`}>{selectedItem.batteryLevel}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">CPU Usage</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedItem.cpuUsage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Power State</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">{selectedItem.charging ? "Charging" : "Discharging"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Timestamp</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">{new Date(selectedItem.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}