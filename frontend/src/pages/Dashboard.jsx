// import { useEffect, useState, useRef } from "react";
// import { getHistory, getPrediction } from "../services/api";
// import io from "socket.io-client";

// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid,
//   Tooltip, ResponsiveContainer, AreaChart, Area,
//   ReferenceLine, ComposedChart, Bar
// } from "recharts";

// import { 
//   Sun, Moon, Battery, Activity, History, Zap, 
//   Gauge, TrendingUp, AlertTriangle, Cpu, 
//   Shield, Sparkles, Waves, Clock, ArrowUpRight,
//   Thermometer, Wifi, RefreshCw, Star, Award,
//   Target, Brain, Cloud, Bell, Settings, Menu,
//   ListChecks
// } from "lucide-react";

// import BatteryCard from "../components/BatteryCard";
// import PredictionCard from "../components/PredictionCard";
// import { useNavigate } from "react-router-dom";

// const socket = io("http://localhost:5000");

// export default function Dashboard() {
//   const [history, setHistory] = useState([]);
//   const [prediction, setPrediction] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [liveBatteryAnimation, setLiveBatteryAnimation] = useState(0);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const chartRef = useRef(null);
//   const navigate = useNavigate();

//   // Handle history click - navigate to history page
//   const handleHistoryClick = () => {
//     navigate("/history");
//   };

//   // Update current time
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Initial API load
//   useEffect(() => {
//     async function loadData() {
//       try {
//         const [h, p] = await Promise.all([
//           getHistory(),
//           getPrediction()
//         ]);
//         setHistory(h);
//         setPrediction(p);
//       } catch (error) {
//         console.error("Data fetch failed", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadData();
//   }, []);

//   // Socket listener
//   useEffect(() => {
//     socket.on("battery-update", (data) => {
//       setHistory(prev => [data, ...prev.slice(0, 99)]);
//       setLiveBatteryAnimation(1);
//       setTimeout(() => setLiveBatteryAnimation(0), 500);
//     });
//     return () => socket.off("battery-update");
//   }, []);

//   // Dark mode handler
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   // Calculate metrics
//   const latestBattery = history[0]?.batteryLevel || 0;
//   const avgBattery = history.length > 0 
//     ? (history.reduce((sum, item) => sum + (item.batteryLevel || 0), 0) / history.length).toFixed(1)
//     : 0;
//   const degradationRate = prediction?.degradationRate || 0;
//   const healthScore = Math.min(100, Math.max(0, 
//     (latestBattery * 0.6) + 
//     (prediction?.remainingCycles ? (prediction.remainingCycles / 1000) * 40 : 40)
//   )).toFixed(0);

//   const getBatteryColor = (level) => {
//     if (level >= 80) return "from-emerald-400 to-green-500";
//     if (level >= 50) return "from-blue-400 to-cyan-500";
//     if (level >= 20) return "from-yellow-400 to-orange-500";
//     return "from-red-500 to-rose-600";
//   };

//   const getStatusText = (level) => {
//     if (level >= 80) return "Excellent";
//     if (level >= 60) return "Good";
//     if (level >= 40) return "Fair";
//     if (level >= 20) return "Poor";
//     return "Critical";
//   };

//   if (isLoading) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
//         <div className="relative">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl animate-pulse"></div>
//           <div className="relative animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Battery className="w-10 h-10 text-blue-400 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-100 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950 transition-all duration-500">
      
//       {/* Modern Animated Background */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-0 -right-4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/5 rounded-full blur-3xl"></div>
//         {/* Simple Grid Pattern */}
//         <div className="absolute inset-0 opacity-30" 
//           style={{
//             backgroundImage: `radial-gradient(circle at 1px 1px, ${darkMode ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.08)'} 1px, transparent 1px)`,
//             backgroundSize: '40px 40px'
//           }}>
//         </div>
//       </div>

//       <div className="relative max-w-7xl mx-auto p-4 md:p-8">
        
//         {/* Modern Header */}
//         <header className="mb-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl animate-pulse"></div>
//                 <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 p-3 rounded-2xl shadow-2xl">
//                   <Battery size={34} className="text-white" />
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
//                   Battery Sentinel
//                 </h1>
//                 <div className="flex items-center gap-2 mt-1">
//                   <Cpu size={12} className="text-blue-500" />
//                   <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
//                     AI-Powered Predictive Analytics
//                   </p>
//                   <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
//                   <div className="flex items-center gap-1">
//                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
//                     <span className="text-xs text-green-600 dark:text-green-400">Live</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               {/* History Button */}
//               <button
//                 onClick={handleHistoryClick}
//                 className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl group"
//               >
//                 <ListChecks size={16} className="group-hover:rotate-3 transition-transform" />
//                 <span className="text-sm font-medium">History</span>
//               </button>

//               {/* Time Display */}
//               <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
//                 <Clock size={14} className="text-blue-500" />
//                 <span className="text-sm font-mono text-slate-700 dark:text-slate-300">
//                   {currentTime.toLocaleTimeString()}
//                 </span>
//               </div>

//               {/* Notification Bell */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowNotifications(!showNotifications)}
//                   className="relative p-2 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 transition-all"
//                 >
//                   <Bell size={18} className="text-slate-600 dark:text-slate-400" />
//                   <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
//                 </button>
//               </div>

//               {/* Dark Mode Toggle */}
//               <button
//                 onClick={() => setDarkMode(!darkMode)}
//                 className="relative p-2 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 transition-all group"
//               >
//                 {darkMode ? 
//                   <Sun size={18} className="text-yellow-500" /> : 
//                   <Moon size={18} className="text-indigo-600" />
//                 }
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Modern Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//           {/* Health Score Card */}
//           <div className="group relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
//             <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg">
//                   <Award size={18} className="text-white" />
//                 </div>
//                 <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{healthScore}%</span>
//               </div>
//               <h3 className="text-slate-600 dark:text-slate-400 text-xs font-medium mb-1">Overall Health</h3>
//               <p className="text-lg font-bold text-slate-900 dark:text-white">System Score</p>
//               <div className="mt-3 flex items-center gap-1">
//                 <Star size={12} className="text-yellow-500 fill-yellow-500" />
//                 <span className="text-xs text-slate-500">{getStatusText(latestBattery)} Performance</span>
//               </div>
//             </div>
//           </div>

//           {/* Battery Level Card */}
//           <div className="group relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
//             <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="p-2.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
//                   <Battery size={18} className="text-white" />
//                 </div>
//                 <span className={`text-2xl font-black ${latestBattery >= 80 ? 'text-emerald-600' : latestBattery >= 50 ? 'text-blue-600' : latestBattery >= 20 ? 'text-amber-600' : 'text-red-600'}`}>
//                   {latestBattery}%
//                 </span>
//               </div>
//               <h3 className="text-slate-600 dark:text-slate-400 text-xs font-medium mb-1">Current Level</h3>
//               <p className="text-lg font-bold text-slate-900 dark:text-white">Battery Capacity</p>
//               <div className="mt-3 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
//                 <div 
//                   className={`h-full bg-gradient-to-r ${getBatteryColor(latestBattery)} rounded-full transition-all duration-700`}
//                   style={{ width: `${latestBattery}%` }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Degradation Card */}
//           <div className="group relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
//             <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="p-2.5 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
//                   <TrendingUp size={18} className="text-white" />
//                 </div>
//                 <span className="text-2xl font-black text-orange-600 dark:text-orange-400">{degradationRate}%</span>
//               </div>
//               <h3 className="text-slate-600 dark:text-slate-400 text-xs font-medium mb-1">Monthly Loss</h3>
//               <p className="text-lg font-bold text-slate-900 dark:text-white">Degradation Rate</p>
//               <div className="mt-3 flex items-center gap-2">
//                 <Clock size={12} className="text-slate-400" />
//                 <span className="text-xs text-slate-500">Lifespan: {Math.max(0, Math.floor((100 - latestBattery) / (degradationRate || 1)))} mo</span>
//               </div>
//             </div>
//           </div>

//           {/* AI Prediction Card */}
//           <div className="group relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
//             <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
//                   <Brain size={18} className="text-white" />
//                 </div>
//                 <Brain size={20} className="text-purple-500 animate-pulse" />
//               </div>
//               <h3 className="text-slate-600 dark:text-slate-400 text-xs font-medium mb-1">AI Analysis</h3>
//               <p className="text-lg font-bold text-slate-900 dark:text-white">Remaining Cycles</p>
//               <div className="mt-3 flex items-center gap-1">
//                 <Target size={12} className="text-purple-500" />
//                 <span className="text-xs text-slate-500">{prediction?.remainingCycles || 850} cycles left</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Chart Section */}
//         <section className="mb-8">
//           <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xl hover:shadow-2xl transition-all duration-500">
//             <div className="flex flex-wrap items-center justify-between mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg">
//                   <Activity size={18} className="text-white" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg text-slate-900 dark:text-white">Battery Performance Timeline</h3>
//                   <p className="text-xs text-slate-500">Real-time degradation tracking with AI forecasts</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-1 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
//                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
//                   <span className="text-xs font-medium text-green-700 dark:text-green-400">Live Streaming</span>
//                 </div>
//                 <RefreshCw size={14} className="text-slate-400 animate-spin-slow" />
//               </div>
//             </div>

//             <div className="h-[380px] w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <ComposedChart data={history.slice().reverse()}>
//                   <defs>
//                     <linearGradient id="batteryGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
//                       <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02}/>
//                     </linearGradient>
//                     <linearGradient id="trendGradient" x1="0" y1="0" x2="1" y2="0">
//                       <stop offset="0%" stopColor="#3b82f6"/>
//                       <stop offset="50%" stopColor="#8b5cf6"/>
//                       <stop offset="100%" stopColor="#ec4899"/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.1} vertical={false} />
//                   <XAxis 
//                     dataKey="createdAt" 
//                     tick={{ fill: '#94a3b8', fontSize: 10 }}
//                     axisLine={{ stroke: '#475569', opacity: 0.3 }}
//                     tickLine={false}
//                   />
//                   <YAxis 
//                     tick={{ fill: '#94a3b8', fontSize: 11 }}
//                     axisLine={{ stroke: '#475569', opacity: 0.3 }}
//                     domain={[0, 100]}
//                     tickFormatter={(value) => `${value}%`}
//                   />
//                   <Tooltip 
//                     contentStyle={{ 
//                       backgroundColor: 'rgba(15, 23, 42, 0.95)', 
//                       border: '1px solid #3b82f6',
//                       borderRadius: '12px',
//                       backdropFilter: 'blur(12px)',
//                       padding: '12px'
//                     }}
//                     labelStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
//                   />
//                   <Area
//                     type="monotone"
//                     dataKey="batteryLevel"
//                     stroke="url(#trendGradient)"
//                     strokeWidth={3}
//                     fill="url(#batteryGradient)"
//                     fillOpacity={1}
//                     animationDuration={1000}
//                   />
//                   <ReferenceLine y={80} stroke="#10b981" strokeDasharray="5 5" strokeWidth={1.5} label={{ value: 'Optimal', fill: '#10b981', fontSize: 10, position: 'right' }} />
//                   <ReferenceLine y={50} stroke="#f59e0b" strokeDasharray="5 5" strokeWidth={1.5} label={{ value: 'Warning', fill: '#f59e0b', fontSize: 10, position: 'right' }} />
//                   <ReferenceLine y={20} stroke="#ef4444" strokeDasharray="5 5" strokeWidth={1.5} label={{ value: 'Critical', fill: '#ef4444', fontSize: 10, position: 'right' }} />
//                 </ComposedChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Chart Legend */}
//             <div className="flex flex-wrap justify-center gap-6 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
//                 <span className="text-xs text-slate-600 dark:text-slate-400">Battery Level</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-0.5 bg-emerald-500"></div>
//                 <span className="text-xs text-slate-600 dark:text-slate-400">Optimal (80%+)</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-0.5 bg-amber-500"></div>
//                 <span className="text-xs text-slate-600 dark:text-slate-400">Warning (20-80%)</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-0.5 bg-red-500"></div>
//                 <span className="text-xs text-slate-600 dark:text-slate-400">Critical (20%-)</span>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Cards Row */}
//         <div className="grid lg:grid-cols-2 gap-8 mb-8">
//           <div className="transition-all duration-500 hover:scale-[1.02]">
//             <BatteryCard data={history[0]} />
//           </div>
//           <div className="transition-all duration-500 hover:scale-[1.02]">
//             <PredictionCard prediction={prediction} />
//           </div>
//         </div>

//         {/* Footer */}
//         <footer className="mt-12 text-center py-6 relative">
//           <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
//           <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
//             <span className="flex items-center gap-1">
//               <Battery size={12} className="text-blue-500" />
//               © 2024 Battery Sentinel
//             </span>
//             <span>•</span>
//             <span className="flex items-center gap-1">
//               <Zap size={12} className="text-yellow-500" />
//               Neural Network Core v3.0
//             </span>
//             <span>•</span>
//             <span className="flex items-center gap-1 animate-pulse">
//               <Activity size={12} className="text-green-500" />
//               Active Monitoring
//             </span>
//           </div>
//         </footer>
//       </div>

//       <style jsx>{`
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-spin-slow {
//           animation: spin-slow 3s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }














import { useEffect, useState, useRef } from "react";
import { getHistory, getPrediction } from "../services/api";
import io from "socket.io-client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area,
  ReferenceLine, ComposedChart, Bar
} from "recharts";

import { 
  Sun, Moon, Battery, Activity, History, Zap, 
  Gauge, TrendingUp, AlertTriangle, Cpu, 
  Shield, Sparkles, Waves, Clock, ArrowUpRight,
  Thermometer, Wifi, RefreshCw, Star, Award,
  Target, Brain, Cloud, Bell, Settings, Menu,
  ListChecks
} from "lucide-react";

import BatteryCard from "../components/BatteryCard";
import PredictionCard from "../components/PredictionCard";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [liveBatteryAnimation, setLiveBatteryAnimation] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const chartRef = useRef(null);
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    navigate("/history");
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const [h, p] = await Promise.all([
          getHistory(),
          getPrediction()
        ]);
        setHistory(h);
        setPrediction(p);
      } catch (error) {
        console.error("Data fetch failed", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    socket.on("battery-update", (data) => {
      setHistory(prev => [data, ...prev.slice(0, 99)]);
      setLiveBatteryAnimation(1);
      setTimeout(() => setLiveBatteryAnimation(0), 500);
    });
    return () => socket.off("battery-update");
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const latestBattery = history[0]?.batteryLevel || 0;
  const avgBattery = history.length > 0 
    ? (history.reduce((sum, item) => sum + (item.batteryLevel || 0), 0) / history.length).toFixed(1)
    : 0;
  const degradationRate = prediction?.degradationRate || 0;
  const healthScore = Math.min(100, Math.max(0, 
    (latestBattery * 0.6) + 
    (prediction?.remainingCycles ? (prediction.remainingCycles / 1000) * 40 : 40)
  )).toFixed(0);

  const getBatteryColor = (level) => {
    if (level >= 80) return "from-emerald-400 to-green-500";
    if (level >= 50) return "from-blue-400 to-cyan-500";
    if (level >= 20) return "from-yellow-400 to-orange-500";
    return "from-red-500 to-rose-600";
  };

  const getStatusText = (level) => {
    if (level >= 80) return "Excellent";
    if (level >= 60) return "Good";
    if (level >= 40) return "Fair";
    if (level >= 20) return "Poor";
    return "Critical";
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Simple animated gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 -right-20 w-72 h-72 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50 animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Header - Clean and simple */}
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl shadow-sm">
              <Battery size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                Battery Sentinel
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Live Monitoring</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleHistoryClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ListChecks size={16} />
              <span>History</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-sm">
              <Clock size={14} />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {/* Stats Cards - Simple, clean metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Health Score */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <Award size={16} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{healthScore}%</span>
            </div>
            <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Health Score</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{getStatusText(latestBattery)}</p>
          </div>

          {/* Battery Level */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Battery size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <span className={`text-xl font-bold ${
                latestBattery >= 80 ? 'text-emerald-600' : 
                latestBattery >= 50 ? 'text-blue-600' : 
                latestBattery >= 20 ? 'text-amber-600' : 'text-red-600'
              }`}>{latestBattery}%</span>
            </div>
            <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Current Level</h3>
            <div className="mt-2 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${getBatteryColor(latestBattery)} rounded-full transition-all duration-500`}
                style={{ width: `${latestBattery}%` }}
              />
            </div>
          </div>

          {/* Degradation */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <TrendingUp size={16} className="text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-xl font-bold text-amber-600 dark:text-amber-400">{degradationRate}%</span>
            </div>
            <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Degradation Rate</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">per month</p>
          </div>

          {/* Remaining Cycles */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Target size={16} className="text-purple-600 dark:text-purple-400" />
              </div>
              <Brain size={18} className="text-purple-400" />
            </div>
            <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Remaining Cycles</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{prediction?.remainingCycles || 850} cycles</p>
          </div>
        </div>

        {/* Chart Section - Clean and readable */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 mb-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-blue-500" />
              <h3 className="font-semibold text-slate-800 dark:text-white">Battery Performance</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live data stream</span>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={history.slice().reverse()}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" dark:stroke="#1e293b" vertical={false} opacity={0.5} />
                <XAxis 
                  dataKey="createdAt" 
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#0f172a' : '#ffffff', 
                    border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    fontSize: '12px',
                    padding: '8px 12px'
                  }}
                  labelStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
                <Area
                  type="monotone"
                  dataKey="batteryLevel"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#areaGradient)"
                  animationDuration={800}
                />
                <ReferenceLine y={80} stroke="#10b981" strokeDasharray="4 4" strokeWidth={1} label={{ value: 'Optimal', fill: '#10b981', fontSize: 9, position: 'right' }} />
                <ReferenceLine y={50} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth={1} label={{ value: 'Warning', fill: '#f59e0b', fontSize: 9, position: 'right' }} />
                <ReferenceLine y={20} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={1} label={{ value: 'Critical', fill: '#ef4444', fontSize: 9, position: 'right' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Simple legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Battery Level</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-0.5 bg-emerald-500"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Optimal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-0.5 bg-amber-500"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Warning</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-0.5 bg-red-500"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Critical</span>
            </div>
          </div>
        </div>

        {/* Cards Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="transition-all duration-300 hover:-translate-y-0.5">
            <BatteryCard data={history[0]} />
          </div>
          <div className="transition-all duration-300 hover:-translate-y-0.5">
            <PredictionCard prediction={prediction} />
          </div>
        </div>

        {/* Simple footer */}
        <footer className="text-center py-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent mb-4"></div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <span>© 2024 Battery Sentinel</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span>AI-Powered Analytics</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="flex items-center gap-1">
              <Activity size={10} />
              Active
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}