import { BrainCircuit, ShieldCheck, AlertTriangle, TrendingDown, TrendingUp, Sparkles, Cpu, Calendar, Target, Activity, Zap, Gauge, Shield, Award, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function PredictionCard({ prediction }) {
  const [animatedHealth, setAnimatedHealth] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (prediction?.predictedBatteryHealth !== undefined) {
      setAnimatedHealth(prediction.predictedBatteryHealth);
    }
  }, [prediction]);

  if (!prediction) return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 h-64 animate-pulse">
      <div className="flex flex-col items-center justify-center h-full">
        <BrainCircuit className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
        <p className="text-sm text-slate-400">Loading prediction...</p>
      </div>
    </div>
  );

  const health = prediction.predictedBatteryHealth;
  const confidence = prediction.confidence || 94;
  const remainingLife = prediction.remainingLife || "18 months";
  const degradationRate = prediction.degradationRate || 3.2;
  const cycleCount = prediction.cycleCount || 342;
  
  const getStatus = (val) => {
    if (val > 80) return { 
      label: "Excellent", 
      color: "text-emerald-600 dark:text-emerald-400", 
      bg: "bg-emerald-50 dark:bg-emerald-900/20", 
      icon: Shield,
      description: "Battery in great shape"
    };
    if (val > 65) return { 
      label: "Good", 
      color: "text-blue-600 dark:text-blue-400", 
      bg: "bg-blue-50 dark:bg-blue-900/20", 
      icon: Activity,
      description: "Normal operation"
    };
    if (val > 50) return { 
      label: "Fair", 
      color: "text-amber-600 dark:text-amber-400", 
      bg: "bg-amber-50 dark:bg-amber-900/20", 
      icon: TrendingUp,
      description: "Monitor regularly"
    };
    if (val > 30) return { 
      label: "Warning", 
      color: "text-orange-600 dark:text-orange-400", 
      bg: "bg-orange-50 dark:bg-orange-900/20", 
      icon: AlertTriangle,
      description: "Degradation accelerating"
    };
    return { 
      label: "Critical", 
      color: "text-red-600 dark:text-red-400", 
      bg: "bg-red-50 dark:bg-red-900/20", 
      icon: AlertTriangle,
      description: "Replace soon"
    };
  };

  const status = getStatus(health);
  const StatusIcon = status.icon;
  const isCritical = health < 30;
  const isExcellent = health > 80;

  const getHealthGradient = () => {
    if (health >= 80) return "from-emerald-500 to-green-500";
    if (health >= 65) return "from-blue-500 to-cyan-500";
    if (health >= 50) return "from-amber-500 to-orange-500";
    return "from-red-500 to-rose-600";
  };

  const estimatedLifespan = Math.max(0, Math.floor((health - 20) / (degradationRate || 1)));

  return (
    <div 
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <BrainCircuit size={14} className="text-slate-500 dark:text-slate-400" />
              </div>
              <h2 className="text-xs font-medium uppercase tracking-wider text-slate-400">
                AI Prediction
              </h2>
            </div>
            <p className="text-[10px] text-slate-400 ml-8">Neural network forecast</p>
          </div>
          
          <div className={`p-2 rounded-lg ${status.bg} ${status.color}`}>
            <StatusIcon size={18} />
          </div>
        </div>

        {/* Health Score */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-5xl font-bold text-slate-800 dark:text-white">
              {animatedHealth}
            </span>
            <span className="text-base text-slate-400">%</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.color} ml-2`}>
              {status.label}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getHealthGradient()} rounded-full transition-all duration-700`}
              style={{ width: `${animatedHealth}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">{status.description}</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Target size={10} className="text-blue-500" />
              <span className="text-[10px] text-slate-400">Confidence</span>
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{confidence}%</p>
          </div>

          <div>
            <div className="flex items-center gap-1 mb-1">
              <Calendar size={10} className="text-purple-500" />
              <span className="text-[10px] text-slate-400">RUL</span>
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{remainingLife}</p>
          </div>

          <div>
            <div className="flex items-center gap-1 mb-1">
              <Activity size={10} className="text-emerald-500" />
              <span className="text-[10px] text-slate-400">Cycles</span>
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{cycleCount}</p>
          </div>
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 animate-fadeIn">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-slate-400">Degradation Rate</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{degradationRate}% / mo</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Est. Lifespan</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{estimatedLifespan} months</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] text-slate-400">AI Model</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">LSTM Neural Network v3.2</p>
              </div>
            </div>
          </div>
        )}

        {/* Recommendation Banner */}
        {health < 80 && (
          <div className={`mt-4 p-3 rounded-lg ${health < 50 ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'}`}>
            <div className="flex items-start gap-2">
              {health < 50 ? (
                <AlertTriangle size={14} className="text-red-500 mt-0.5" />
              ) : (
                <TrendingDown size={14} className="text-amber-500 mt-0.5" />
              )}
              <div>
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                  {health < 50 ? "Critical: Replacement recommended" : "Optimization suggested"}
                </p>
                <p className="text-[11px] text-amber-600 dark:text-amber-500">
                  {health < 50 
                    ? "Consider battery replacement in the next 3 months" 
                    : "Reduce charge cycles to extend battery life"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Expand Hint */}
        <div className="mt-3 text-center">
          <p className="text-[10px] text-slate-400">
            {showDetails ? "Tap to collapse" : "Tap for details"}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}