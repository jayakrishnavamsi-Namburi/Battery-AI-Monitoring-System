

// import { BatteryMedium, Zap, Cpu, Activity, Thermometer, Gauge, TrendingUp, Shield, Sparkles } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function BatteryCard({ data }) {
//   const [animatedLevel, setAnimatedLevel] = useState(0);
//   const [rippleEffect, setRippleEffect] = useState(false);

//   useEffect(() => {
//     if (data?.batteryLevel !== undefined) {
//       setAnimatedLevel(data.batteryLevel);
//       // Trigger ripple effect on update
//       setRippleEffect(true);
//       setTimeout(() => setRippleEffect(false), 800);
//     }
//   }, [data?.batteryLevel]);

//   if (!data) return (
//     <div className="relative overflow-hidden animate-pulse bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl h-56 border border-slate-200 dark:border-gray-700 shadow-xl">
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
//     </div>
//   );

//   // Enhanced dynamic color logic with gradients
//   const getBatteryGradient = (level) => {
//     if (level >= 80) return "from-emerald-400 to-green-500";
//     if (level >= 60) return "from-green-400 to-emerald-500";
//     if (level >= 40) return "from-blue-400 to-cyan-500";
//     if (level >= 20) return "from-amber-400 to-orange-500";
//     return "from-red-500 to-rose-600";
//   };

//   const getBatteryStatus = (level) => {
//     if (level >= 80) return { text: "Excellent", color: "text-emerald-500", icon: Sparkles };
//     if (level >= 60) return { text: "Good", color: "text-green-500", icon: Shield };
//     if (level >= 40) return { text: "Moderate", color: "text-blue-500", icon: Activity };
//     if (level >= 20) return { text: "Warning", color: "text-amber-500", icon: TrendingUp };
//     return { text: "Critical", color: "text-red-500", icon: Zap };
//   };

//   const status = getBatteryStatus(data.batteryLevel);
//   const StatusIcon = status.icon;
//   const batteryGradient = getBatteryGradient(data.batteryLevel);
//   const isCharging = data.charging;

//   // ================= MULTIPLE TIPS =================
//   const generateTips = (data) => {
//     const tips = [];

//     if (!data) return ["🔄 Analyzing system..."];

//     if (data.batteryLevel < 20 && !data.charging) {
//       tips.push("🔋 Battery low! Please plug in your charger.");
//     }

//     if (data.cpuUsage > 80) {
//       tips.push("⚠️ High CPU usage! Close heavy applications.");
//     }

//     if (data.batteryLevel > 90 && data.charging) {
//       tips.push("⚡ Avoid overcharging above 90%.");
//     }

//     if (data.temperature && data.temperature > 40) {
//       tips.push("🌡️ High temperature detected! Cool your device.");
//     }

//     if (data.batteryLevel < 40) {
//       tips.push("📉 Battery draining fast. Reduce background apps.");
//     }

//     if (data.cpuUsage < 40 && data.batteryLevel > 70) {
//       tips.push("✅ System running efficiently.");
//     }

//     // Additional smart tips based on battery health
//     if (data.batteryLevel >= 80 && !data.charging) {
//       tips.push("💪 Battery health is excellent! Optimal performance.");
//     }

//     if (data.batteryLevel >= 50 && data.batteryLevel <= 80 && !data.charging) {
//       tips.push("📊 Battery at optimal level. Consider charging at 20%.");
//     }

//     // fallback
//     if (tips.length === 0) {
//       tips.push("🔄 Monitoring battery performance...");
//     }

//     return tips.slice(0, 3); // Limit to 3 tips
//   };

//   const tipsList = generateTips(data);

//   // Calculate health score based on battery level and other metrics
//   const healthScore = Math.min(100, Math.max(0, 
//     (data.batteryLevel * 0.7) + 
//     (data.cpuUsage ? (100 - data.cpuUsage) * 0.3 : 30)
//   )).toFixed(0);

//   return (
//     <div className="group relative bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      
//       {/* Animated Gradient Border */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
      
//       {/* Ripple Effect on Update */}
//       {rippleEffect && (
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute inset-0 bg-blue-500/20 animate-ripple rounded-2xl"></div>
//         </div>
//       )}
      
//       {/* Shimmer Effect on Hover */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
//       <div className="relative p-6 z-10">
//         {/* Header Section with Animated Status */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-2">
//             <div className="relative">
//               <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-50 animate-pulse"></div>
//               <div className="relative p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
//                 <Activity size={14} className="text-white" />
//               </div>
//             </div>
//             <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//               Real-Time Telemetry
//             </h2>
//           </div>
          
//           {/* Animated Charging Indicator */}
//           {isCharging && (
//             <div className="relative">
//               <div className="absolute inset-0 bg-amber-400 rounded-full blur-md animate-ping opacity-75"></div>
//               <span className="relative flex items-center gap-1 text-xs font-bold px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-lg">
//                 <Zap size={12} className="animate-pulse" fill="currentColor" /> 
//                 CHARGING
//                 <Sparkles size={10} className="animate-spin-slow" />
//               </span>
//             </div>
//           )}
//         </div>

//         <div className="space-y-5">
//           {/* Battery Level Section with Animation */}
//           <div>
//             <div className="flex justify-between items-end mb-3">
//               <div className="flex items-baseline gap-1">
//                 <span className="text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
//                   {data.batteryLevel}
//                 </span>
//                 <span className="text-lg text-slate-400 font-medium">%</span>
//               </div>
//               <div className="relative">
//                 <div className={`absolute inset-0 ${status.color} blur-md opacity-50 animate-pulse`}></div>
//                 <BatteryMedium 
//                   className={`relative ${status.color} transition-all duration-300 hover:scale-110 cursor-pointer`} 
//                   size={36} 
//                 />
//               </div>
//             </div>
            
//             {/* Animated Progress Bar with Glow */}
//             <div className="relative">
//               <div className="w-full bg-slate-100 dark:bg-gray-800 rounded-full h-4 overflow-hidden shadow-inner">
//                 <div 
//                   className={`h-full bg-gradient-to-r ${batteryGradient} rounded-full transition-all duration-1000 ease-out relative`}
//                   style={{ width: `${animatedLevel}%` }}
//                 >
//                   {/* Animated Shimmer Effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
//                 </div>
//               </div>
              
//               {/* Status Label */}
//               <div className="flex justify-between mt-2">
//                 <div className="flex items-center gap-1">
//                   <StatusIcon size={12} className={status.color} />
//                   <span className={`text-xs font-semibold ${status.color}`}>{status.text}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Thermometer size={10} className="text-slate-400" />
//                   <span className="text-xs text-slate-500">{data.temperature || "24"}°C</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Stats Grid with Animations */}
//           <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-gray-800">
//             {/* CPU Load Card */}
//             <div className="group/stat relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white dark:from-gray-800 dark:to-gray-900 p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
//               <div className="flex items-center gap-2">
//                 <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 group-hover/stat:animate-pulse">
//                   <Cpu size={14} />
//                 </div>
//                 <div>
//                   <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">CPU Load</p>
//                   <p className="font-bold text-sm text-slate-700 dark:text-slate-200">{data.cpuUsage}%</p>
//                 </div>
//               </div>
//               <div className="mt-1 h-1 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-blue-500 rounded-full transition-all duration-500"
//                   style={{ width: `${Math.min(100, data.cpuUsage)}%` }}
//                 ></div>
//               </div>
//             </div>

//             {/* Voltage Card */}
//             <div className="group/stat relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white dark:from-gray-800 dark:to-gray-900 p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
//               <div className="flex items-center gap-2">
//                 <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
//                   <Zap size={14} />
//                 </div>
//                 <div>
//                   <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Voltage</p>
//                   <p className="font-bold text-sm text-slate-700 dark:text-slate-200">{data.voltage || "3.8"}V</p>
//                 </div>
//               </div>
//               <div className="mt-1 text-[10px] text-slate-400 flex items-center gap-1">
//                 <TrendingUp size={8} />
//                 <span>Nominal</span>
//               </div>
//             </div>

//             {/* Health Score Card */}
//             <div className="group/stat relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white dark:from-gray-800 dark:to-gray-900 p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
//               <div className="flex items-center gap-2">
//                 <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
//                   <Gauge size={14} />
//                 </div>
//                 <div>
//                   <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Health</p>
//                   <p className="font-bold text-sm text-slate-700 dark:text-slate-200">{healthScore}%</p>
//                 </div>
//               </div>
//               <div className="mt-1 h-1 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500"
//                   style={{ width: `${healthScore}%` }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           {/* Additional Metrics Row */}
//           <div className="flex items-center justify-between pt-2 text-[10px] text-slate-500">
//             <div className="flex items-center gap-2">
//               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
//               <span>Last update: {new Date().toLocaleTimeString()}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Shield size={10} />
//               <span>AI Verified</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= AI TIPS LIST ================= */}
//       <div className="mt-2 mx-6 mb-6 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700 shadow-sm">
//         <div className="flex items-center gap-2 mb-2">
//           <div className="p-1.5 bg-blue-500 text-white rounded-lg">
//             <Sparkles size={12} />
//           </div>
//           <p className="text-[10px] uppercase font-bold text-blue-500 tracking-wider">
//             AI Insights
//           </p>
//         </div>

//         <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
//           {tipsList.map((tip, index) => (
//             <li key={index} className="flex items-start gap-2">
//               <span className="text-blue-500 mt-[2px]">•</span>
//               <span>{tip}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <style jsx>{`
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(200%); }
//         }
//         @keyframes ripple {
//           0% { transform: scale(0); opacity: 0.5; }
//           100% { transform: scale(4); opacity: 0; }
//         }
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-shimmer {
//           animation: shimmer 2s infinite;
//         }
//         .animate-ripple {
//           animation: ripple 0.8s ease-out forwards;
//         }
//         .animate-spin-slow {
//           animation: spin-slow 2s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }




import { BatteryMedium, Zap, Cpu, Activity, Thermometer, Gauge, TrendingUp, Shield, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function BatteryCard({ data }) {
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const [rippleEffect, setRippleEffect] = useState(false);

  useEffect(() => {
    if (data?.batteryLevel !== undefined) {
      setAnimatedLevel(data.batteryLevel);
      setRippleEffect(true);
      setTimeout(() => setRippleEffect(false), 600);
    }
  }, [data?.batteryLevel]);

  if (!data) return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 h-48 animate-pulse">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-3"></div>
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
    </div>
  );

  const getBatteryGradient = (level) => {
    if (level >= 80) return "from-emerald-500 to-green-500";
    if (level >= 50) return "from-blue-500 to-cyan-500";
    if (level >= 20) return "from-amber-500 to-orange-500";
    return "from-red-500 to-rose-600";
  };

  const getBatteryStatus = (level) => {
    if (level >= 80) return { text: "Excellent", color: "text-emerald-600 dark:text-emerald-400", icon: Sparkles };
    if (level >= 60) return { text: "Good", color: "text-green-600 dark:text-green-400", icon: Shield };
    if (level >= 40) return { text: "Moderate", color: "text-blue-600 dark:text-blue-400", icon: Activity };
    if (level >= 20) return { text: "Warning", color: "text-amber-600 dark:text-amber-400", icon: TrendingUp };
    return { text: "Critical", color: "text-red-600 dark:text-red-400", icon: Zap };
  };

  const status = getBatteryStatus(data.batteryLevel);
  const StatusIcon = status.icon;
  const batteryGradient = getBatteryGradient(data.batteryLevel);
  const isCharging = data.charging;

  const generateTips = (data) => {
    const tips = [];

    if (!data) return ["Loading insights..."];

    if (data.batteryLevel < 20 && !data.charging) {
      tips.push("Low battery. Plug in your charger.");
    } else if (data.batteryLevel < 20 && data.charging) {
      tips.push("Battery is low but charging. Keep plugged in.");
    }

    if (data.cpuUsage > 85) {
      tips.push("High CPU usage. Close unused apps.");
    } else if (data.cpuUsage > 70) {
      tips.push("CPU is busy. Consider restarting if slow.");
    }

    if (data.batteryLevel > 90 && data.charging) {
      tips.push("Battery nearly full. Unplug to preserve health.");
    }

    if (data.temperature && data.temperature > 42) {
      tips.push("Device is hot. Remove case or cool down.");
    }

    if (data.batteryLevel >= 40 && data.batteryLevel <= 70 && !data.charging) {
      tips.push("Battery in sweet spot. Healthy range.");
    }

    if (tips.length === 0) {
      if (data.batteryLevel >= 70) {
        tips.push("Battery looks great. Keep up good habits.");
      } else if (data.batteryLevel >= 40) {
        tips.push("Battery is fine. Consider charging at 20%.");
      } else {
        tips.push("Monitor your usage for better battery life.");
      }
    }

    return tips.slice(0, 2);
  };

  const tipsList = generateTips(data);

  const healthScore = Math.min(100, Math.max(0, 
    (data.batteryLevel * 0.6) + 
    (data.cpuUsage ? (100 - data.cpuUsage) * 0.4 : 40)
  )).toFixed(0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      
      {/* Subtle ripple effect on update */}
      {rippleEffect && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-blue-500/5 animate-ripple rounded-xl"></div>
        </div>
      )}
      
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <Activity size={14} className="text-slate-500 dark:text-slate-400" />
            </div>
            <h2 className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Current Status
            </h2>
          </div>
          
          {isCharging && (
            <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <Zap size={12} className="text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400">Charging</span>
            </div>
          )}
        </div>

        {/* Battery Level */}
        <div className="mb-4">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-4xl font-bold text-slate-800 dark:text-white">
                {data.batteryLevel}
              </span>
              <span className="text-base text-slate-400">%</span>
            </div>
            <BatteryMedium className={status.color} size={32} />
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${batteryGradient} rounded-full transition-all duration-700 ease-out`}
              style={{ width: `${animatedLevel}%` }}
            />
          </div>
          
          {/* Status and Temp */}
          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-1">
              <StatusIcon size={12} className={status.color} />
              <span className={`text-xs font-medium ${status.color}`}>{status.text}</span>
            </div>
            <div className="flex items-center gap-1">
              <Thermometer size={10} className="text-slate-400" />
              <span className="text-xs text-slate-500">{data.temperature || "24"}°C</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {/* CPU */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2">
            <div className="flex items-center gap-1.5 mb-1">
              <Cpu size={12} className="text-blue-500" />
              <span className="text-xs text-slate-500">CPU</span>
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{data.cpuUsage}%</p>
            <div className="mt-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${data.cpuUsage}%` }} />
            </div>
          </div>

          {/* Voltage */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2">
            <div className="flex items-center gap-1.5 mb-1">
              <Zap size={12} className="text-purple-500" />
              <span className="text-xs text-slate-500">Voltage</span>
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{data.voltage || "3.8"}V</p>
            <span className="text-[10px] text-slate-400">Nominal</span>
          </div>

          {/* Health */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2">
            <div className="flex items-center gap-1.5 mb-1">
              <Gauge size={12} className="text-emerald-500" />
              <span className="text-xs text-slate-500">Health</span>
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{healthScore}%</p>
            <div className="mt-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full">
              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${healthScore}%` }} />
            </div>
          </div>
        </div>

        {/* Last update time */}
        <div className="flex items-center justify-between mt-3 pt-2 text-[10px] text-slate-400">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span>Live</span>
          </div>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* AI Tips - Clean and minimal */}
      {tipsList.length > 0 && (
        <div className="mx-5 mb-5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles size={12} className="text-blue-500" />
            <p className="text-[10px] font-medium uppercase text-blue-500 tracking-wider">Tip</p>
          </div>
          <ul className="space-y-1">
            {tipsList.map((tip, index) => (
              <li key={index} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <span className="text-blue-400 text-sm leading-5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style jsx>{`
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.4; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}