


// import { Clock, HardDrive, Battery, Zap, Calendar, ChevronRight, Eye, TrendingUp, Thermometer, Activity } from "lucide-react";
// import { useState } from "react";

// export default function HistoryTable({ data, onRowClick }) {
//   const [hoveredRow, setHoveredRow] = useState(null);

//   if (!data || data.length === 0) return (
//     <div className="p-10 text-center text-slate-400 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-slate-300 dark:border-gray-700">
//       No historical telemetry data available.
//     </div>
//   );

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return {
//       date: date.toLocaleDateString([], { 
//         month: 'short', 
//         day: 'numeric',
//         year: 'numeric'
//       }),
//       time: date.toLocaleTimeString([], { 
//         hour: '2-digit', 
//         minute: '2-digit',
//         second: '2-digit'
//       }),
//       full: date.toLocaleString()
//     };
//   };

//   // Get status color based on battery level
//   const getBatteryColor = (level) => {
//     if (level >= 80) return "text-emerald-600 dark:text-emerald-400";
//     if (level >= 50) return "text-blue-600 dark:text-blue-400";
//     if (level >= 20) return "text-amber-600 dark:text-amber-400";
//     return "text-rose-600 dark:text-rose-400";
//   };

//   const getBatteryBgColor = (level) => {
//     if (level >= 80) return "bg-emerald-500";
//     if (level >= 50) return "bg-blue-500";
//     if (level >= 20) return "bg-amber-500";
//     return "bg-rose-500";
//   };

//   // Get status badge with dynamic colors
//   const getStatusBadge = (level) => {
//     if (level >= 80) return { text: "Excellent", color: "emerald", bgColor: "bg-emerald-100 dark:bg-emerald-900/30", textColor: "text-emerald-700 dark:text-emerald-400" };
//     if (level >= 60) return { text: "Good", color: "green", bgColor: "bg-green-100 dark:bg-green-900/30", textColor: "text-green-700 dark:text-green-400" };
//     if (level >= 40) return { text: "Moderate", color: "blue", bgColor: "bg-blue-100 dark:bg-blue-900/30", textColor: "text-blue-700 dark:text-blue-400" };
//     if (level >= 20) return { text: "Warning", color: "amber", bgColor: "bg-amber-100 dark:bg-amber-900/30", textColor: "text-amber-700 dark:text-amber-400" };
//     return { text: "Critical", color: "rose", bgColor: "bg-rose-100 dark:bg-rose-900/30", textColor: "text-rose-700 dark:text-rose-400" };
//   };

//   // Get dot color for status
//   const getDotColor = (color) => {
//     const colors = {
//       emerald: "bg-emerald-500",
//       green: "bg-green-500",
//       blue: "bg-blue-500",
//       amber: "bg-amber-500",
//       rose: "bg-rose-500"
//     };
//     return colors[color] || "bg-gray-500";
//   };

//   return (
//     <div className="overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-gray-800/80 dark:to-gray-800/40 border-b-2 border-slate-200 dark:border-gray-700">
//               <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
//                 <div className="flex items-center gap-2"><Battery size={14}/> Battery</div>
//               </th>
//               <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
//                 <div className="flex items-center gap-2"><HardDrive size={14}/> CPU Load</div>
//               </th>
//               <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
//                 <div className="flex items-center gap-2"><Activity size={14}/> Status</div>
//               </th>
//               <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
//                 Power State
//               </th>
//               <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
//                 <div className="flex items-center gap-2"><Clock size={14}/> Timestamp</div>
//               </th>
//               <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
//             {data.map((item, i) => {
//               const status = getStatusBadge(item.batteryLevel);
//               const formattedDate = formatDate(item.createdAt);
//               const isHovered = hoveredRow === i;
              
//               return (
//                 <tr 
//                   key={i} 
//                   onClick={() => onRowClick && onRowClick(item)}
//                   onMouseEnter={() => setHoveredRow(i)}
//                   onMouseLeave={() => setHoveredRow(null)}
//                   className="cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent dark:hover:from-blue-900/20 dark:hover:to-transparent group"
//                   style={{
//                     transform: isHovered ? 'scale(1.01)' : 'scale(1)',
//                     transition: 'all 0.3s ease'
//                   }}
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <span className={`font-mono font-bold text-lg ${getBatteryColor(item.batteryLevel)}`}>
//                         {item.batteryLevel}%
//                       </span>
//                       <div className="hidden sm:block w-20 bg-slate-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
//                         <div 
//                           className={`${getBatteryBgColor(item.batteryLevel)} h-full transition-all duration-500 rounded-full relative`}
//                           style={{ width: `${item.batteryLevel}%` }}
//                         >
//                           <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
//                         </div>
//                       </div>
//                     </div>
//                   </td>
                  
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <div className="w-12 h-12 relative">
//                         <svg className="w-12 h-12 transform -rotate-90">
//                           <circle
//                             cx="24"
//                             cy="24"
//                             r="20"
//                             stroke="currentColor"
//                             strokeWidth="3"
//                             fill="none"
//                             className="text-slate-200 dark:text-gray-700"
//                           />
//                           <circle
//                             cx="24"
//                             cy="24"
//                             r="20"
//                             stroke="currentColor"
//                             strokeWidth="3"
//                             fill="none"
//                             strokeDasharray={`${2 * Math.PI * 20}`}
//                             strokeDashoffset={`${2 * Math.PI * 20 * (1 - item.cpuUsage / 100)}`}
//                             className="text-blue-500 transition-all duration-700"
//                             style={{ transition: 'stroke-dashoffset 0.7s ease' }}
//                           />
//                         </svg>
//                         <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">
//                           {item.cpuUsage}
//                         </span>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${status.bgColor} ${status.textColor}`}>
//                       <div className={`w-1.5 h-1.5 rounded-full ${getDotColor(status.color)} animate-pulse`}></div>
//                       {status.text}
//                     </span>
//                   </td>

//                   <td className="px-6 py-4">
//                     {item.charging ? (
//                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 dark:from-amber-900/30 dark:to-orange-900/30 dark:text-amber-400 shadow-sm">
//                         <Zap size={12} fill="currentColor" className="animate-pulse"/> 
//                         CHARGING
//                       </span>
//                     ) : (
//                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-gray-800 dark:text-slate-400">
//                         <Battery size={12} /> 
//                         DISCHARGING
//                       </span>
//                     )}
//                   </td>

//                   <td className="px-6 py-4">
//                     <div className="flex flex-col">
//                       <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
//                         {formattedDate.date}
//                       </span>
//                       <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
//                         {formattedDate.time}
//                       </span>
//                     </div>
//                   </td>

//                   <td className="px-6 py-4">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onRowClick && onRowClick(item);
//                       }}
//                       className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-all duration-300 group-hover:translate-x-1"
//                     >
//                       <Eye size={12} />
//                       Details
//                       <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
      
//       {/* Footer Info with enhanced styling */}
//       <div className="px-6 py-4 bg-gradient-to-r from-slate-50/50 to-transparent dark:from-gray-800/30 dark:to-transparent border-t border-slate-200 dark:border-gray-700 text-[11px] text-slate-500 flex justify-between items-center">
//         <div className="flex items-center gap-2">
//           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
//           <span>Showing {data.length} telemetry entries</span>
//         </div>
//         <div className="flex items-center gap-3">
//           <span className="flex items-center gap-1">
//             <TrendingUp size={10} />
//             Live updates
//           </span>
//           <span className="uppercase tracking-widest font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
//             Encrypted Stream
//           </span>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(200%); }
//         }
//         .animate-shimmer {
//           animation: shimmer 2s infinite;
//         }
//       `}</style>
//     </div>
//   );
// }



import { Clock, HardDrive, Battery, Zap, Calendar, ChevronRight, Eye, TrendingUp, Thermometer, Activity } from "lucide-react";
import { useState } from "react";

export default function HistoryTable({ data, onRowClick }) {
  const [hoveredRow, setHoveredRow] = useState(null);

  if (!data || data.length === 0) return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-10 text-center">
      <Battery size={32} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" />
      <p className="text-slate-400">No historical data available</p>
    </div>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString([], { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      full: date.toLocaleString()
    };
  };

  const getBatteryColor = (level) => {
    if (level >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (level >= 50) return "text-blue-600 dark:text-blue-400";
    if (level >= 20) return "text-amber-600 dark:text-amber-400";
    return "text-rose-600 dark:text-rose-400";
  };

  const getBatteryBg = (level) => {
    if (level >= 80) return "bg-emerald-500";
    if (level >= 50) return "bg-blue-500";
    if (level >= 20) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getStatusBadge = (level) => {
    if (level >= 80) return { text: "Excellent", color: "emerald" };
    if (level >= 60) return { text: "Good", color: "green" };
    if (level >= 40) return { text: "Moderate", color: "blue" };
    if (level >= 20) return { text: "Warning", color: "amber" };
    return { text: "Critical", color: "rose" };
  };

  const getDotColor = (color) => {
    const colors = { emerald: "bg-emerald-500", green: "bg-green-500", blue: "bg-blue-500", amber: "bg-amber-500", rose: "bg-rose-500" };
    return colors[color] || "bg-gray-500";
  };

  const getBadgeBg = (color) => {
    const colors = { 
      emerald: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
      green: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400",
      blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
      amber: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
      rose: "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400"
    };
    return colors[color] || "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400";
  };

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Battery
              </th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                CPU
              </th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Power
              </th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.map((item, i) => {
              const status = getStatusBadge(item.batteryLevel);
              const formattedDate = formatDate(item.createdAt);
              const isHovered = hoveredRow === i;
              
              return (
                <tr 
                  key={i} 
                  onClick={() => onRowClick && onRowClick(item)}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`cursor-pointer transition-all duration-200 ${isHovered ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className={`font-semibold ${getBatteryColor(item.batteryLevel)}`}>
                        {item.batteryLevel}%
                      </span>
                      <div className="hidden sm:block w-16 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`${getBatteryBg(item.batteryLevel)} h-full rounded-full transition-all`}
                          style={{ width: `${item.batteryLevel}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 relative">
                        <svg className="w-10 h-10 -rotate-90">
                          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-slate-200 dark:text-slate-700" />
                          <circle cx="20" cy="20" r="16" stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeDasharray="100.53" strokeDashoffset={`${100.53 * (1 - item.cpuUsage / 100)}`} className="transition-all duration-500" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300">
                          {item.cpuUsage}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeBg(status.color)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(status.color)}`}></span>
                      {status.text}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {item.charging ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
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
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {formattedDate.date}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {formattedDate.time}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowClick && onRowClick(item);
                      }}
                      className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                    >
                      <Eye size={12} />
                      View
                      <ChevronRight size={10} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          <span>{data.length} records</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Live stream</span>
        </div>
      </div>
    </div>
  );
}