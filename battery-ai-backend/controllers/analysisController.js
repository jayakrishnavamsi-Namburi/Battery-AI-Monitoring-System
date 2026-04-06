// import { analyzeBattery } from "../services/batteryAnalysis.js";

// export const getBatteryAnalysis = async (req, res) => {

//   try {

//     const result = await analyzeBattery();

//     res.json(result);

//   } catch (err) {

//     res.status(500).json({
//       error: err.message
//     });

//   }
// };




import { analyzeBattery } from "../services/batteryAnalysis.js";

export const getBatteryAnalysis = async (req, res) => {
  try {
    // ================= INPUT =================
    const {
      batteryLevel = 90,
      cpuUsage = 35,
      charging = 1,
      drainRate = 1.5
    } = req.query;

    // ================= CALL SERVICE =================
    const result = await analyzeBattery({
      batteryLevel: Number(batteryLevel),
      cpuUsage: Number(cpuUsage),
      charging: Number(charging),
      drainRate: Number(drainRate)
    });

    // ================= SMART TIPS =================
    const getTip = ({ batteryLevel, cpuUsage, charging, drainRate }) => {
      if (batteryLevel < 20 && !charging) {
        return "🔋 Battery low! Please plug in your charger.";
      }

      if (cpuUsage > 80) {
        return "⚠️ High CPU usage detected. Close heavy apps.";
      }

      if (drainRate > 2) {
        return "📉 Battery draining fast. Check background apps.";
      }

      if (charging && batteryLevel > 90) {
        return "⚡ Avoid overcharging above 90% to protect battery.";
      }

      if (batteryLevel > 80 && cpuUsage < 40) {
        return "✅ System is running efficiently.";
      }

      return "🔄 Monitoring battery performance...";
    };

    const tip = getTip({
      batteryLevel: Number(batteryLevel),
      cpuUsage: Number(cpuUsage),
      charging: Number(charging),
      drainRate: Number(drainRate)
    });

    // ================= FINAL RESPONSE =================
    res.json({
      predictedBatteryHealth: result.prediction ?? null,
      confidence: result.confidence ?? null,
      remainingLife: result.remainingLife ?? null,
      degradationRate: result.degradationRate ?? null,
      cycleCount: result.cycleCount ?? null,
      tip: tip
    });

  } catch (err) {
    console.error("Controller Error:", err);

    res.status(500).json({
      error: "Battery analysis failed",
      details: err.message
    });
  }
};