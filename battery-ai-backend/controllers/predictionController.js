
// import { spawn } from "child_process";
// import path from "path";

// export const predictBatteryHealth = (req, res) => {
//   try {
//     // ================= INPUT =================
//     const {
//       batteryLevel = 90,
//       cpuUsage = 35,
//       charging = 1,
//       drainRate = 1.5
//     } = req.query;

//     const scriptPath = path.join(process.cwd(), "ai-model", "predict.py");

//     const python = spawn("python", [
//       scriptPath,
//       batteryLevel,
//       cpuUsage,
//       charging,
//       drainRate
//     ]);

//     let stdout = "";
//     let stderr = "";

//     // ================= CAPTURE OUTPUT =================
//     python.stdout.on("data", (data) => {
//       stdout += data.toString();
//     });

//     python.stderr.on("data", (data) => {
//       stderr += data.toString();
//       console.error("PYTHON STDERR:", data.toString());
//     });

//     python.on("error", (err) => {
//       console.error("Spawn Error:", err);
//       return res.status(500).json({
//         error: "Failed to start Python process"
//       });
//     });

//     // ================= PROCESS COMPLETE =================
//     python.on("close", (code) => {
//       try {
//         console.log("PYTHON RAW OUTPUT:\n", stdout);

//         if (code !== 0) {
//           return res.status(500).json({
//             error: "Python script failed",
//             details: stderr
//           });
//         }

//         // 🔥 IMPORTANT: Extract only JSON from mixed logs
//         const lines = stdout.trim().split("\n");

//         let jsonLine = null;

//         // find last valid JSON line
//         for (let i = lines.length - 1; i >= 0; i--) {
//           try {
//             const parsed = JSON.parse(lines[i]);
//             jsonLine = parsed;
//             break;
//           } catch {
//             continue;
//           }
//         }

//         // ================= SMART TIP FUNCTION =================
//         const getTip = ({ batteryLevel, cpuUsage, charging, drainRate }) => {
//           if (batteryLevel < 20 && !charging) {
//             return "🔋 Battery low! Please plug in your charger.";
//           }

//           if (cpuUsage > 80) {
//             return "⚠️ High CPU usage! Close heavy applications.";
//           }

//           if (drainRate > 2) {
//             return "📉 Battery draining fast. Check background apps.";
//           }

//           if (charging && batteryLevel > 90) {
//             return "⚡ Avoid overcharging above 90% to protect battery.";
//           }

//           if (batteryLevel >= 80 && cpuUsage < 40) {
//             return "✅ System is running efficiently.";
//           }

//           if (batteryLevel < 40) {
//             return "📉 Battery dropping quickly. Reduce usage.";
//           }

//           return "🔄 Monitoring battery performance...";
//         };

//         const tip = getTip({
//           batteryLevel: Number(batteryLevel),
//           cpuUsage: Number(cpuUsage),
//           charging: Number(charging),
//           drainRate: Number(drainRate)
//         });

//         // ================= SUCCESS CASE =================
//         if (jsonLine && typeof jsonLine === "object") {
//           return res.json({
//             predictedBatteryHealth: jsonLine.prediction ?? null,
//             confidence: jsonLine.confidence ?? null,
//             remainingLife: jsonLine.remainingLife ?? null,
//             degradationRate: jsonLine.degradationRate ?? null,
//             cycleCount: jsonLine.cycleCount ?? null,
//             tip: tip // ✅ ADDED
//           });
//         }

//         // ================= FALLBACK =================
//         const lastLine = lines[lines.length - 1];
//         const health = parseFloat(lastLine);

//         return res.json({
//           predictedBatteryHealth: isNaN(health) ? null : health,
//           confidence: null,
//           remainingLife: null,
//           degradationRate: null,
//           cycleCount: null,
//           tip: tip // ✅ ADDED
//         });

//       } catch (err) {
//         console.error("Processing Error:", err);

//         return res.status(500).json({
//           error: "Error processing prediction result",
//           rawOutput: stdout
//         });
//       }
//     });

//   } catch (err) {
//     console.error("Controller Error:", err);

//     return res.status(500).json({
//       error: "Internal server error"
//     });
//   }
// };



import { spawn } from "child_process";
import path from "path";

export const predictBatteryHealth = (req, res) => {
  try {
    const {
      batteryLevel = 90,
      cpuUsage = 35,
      charging = 1,
      drainRate = 1.5
    } = req.query;

    // ✅ FIXED PATH
    const scriptPath = path.resolve("ai-model", "predict.py");

    // ✅ FIXED PYTHON COMMAND
    const python = spawn("python3", [
      scriptPath,
      batteryLevel,
      cpuUsage,
      charging,
      drainRate
    ]);

    let stdout = "";
    let stderr = "";

    python.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    python.stderr.on("data", (data) => {
      stderr += data.toString();
      console.error("PYTHON STDERR:", data.toString());
    });

    python.on("error", (err) => {
      console.error("Spawn Error:", err);
      return res.status(500).json({
        error: "Failed to start Python process"
      });
    });

    python.on("close", (code) => {
      try {
        console.log("PYTHON RAW OUTPUT:\n", stdout);

        if (code !== 0) {
          return res.status(500).json({
            error: "Python script failed",
            details: stderr
          });
        }

        const lines = stdout.trim().split("\n");

        let jsonLine = null;

        for (let i = lines.length - 1; i >= 0; i--) {
          try {
            const parsed = JSON.parse(lines[i]);
            jsonLine = parsed;
            break;
          } catch {
            continue;
          }
        }

        const getTip = ({ batteryLevel, cpuUsage, charging, drainRate }) => {
          if (batteryLevel < 20 && !charging) {
            return "🔋 Battery low! Please plug in your charger.";
          }
          if (cpuUsage > 80) {
            return "⚠️ High CPU usage! Close heavy applications.";
          }
          if (drainRate > 2) {
            return "📉 Battery draining fast. Check background apps.";
          }
          if (charging && batteryLevel > 90) {
            return "⚡ Avoid overcharging above 90% to protect battery.";
          }
          if (batteryLevel >= 80 && cpuUsage < 40) {
            return "✅ System is running efficiently.";
          }
          if (batteryLevel < 40) {
            return "📉 Battery dropping quickly. Reduce usage.";
          }
          return "🔄 Monitoring battery performance...";
        };

        const tip = getTip({
          batteryLevel: Number(batteryLevel),
          cpuUsage: Number(cpuUsage),
          charging: Number(charging),
          drainRate: Number(drainRate)
        });

        if (jsonLine && typeof jsonLine === "object") {
          return res.json({
            predictedBatteryHealth: jsonLine.prediction ?? null,
            confidence: jsonLine.confidence ?? null,
            remainingLife: jsonLine.remainingLife ?? null,
            degradationRate: jsonLine.degradationRate ?? null,
            cycleCount: jsonLine.cycleCount ?? null,
            tip
          });
        }

        const lastLine = lines[lines.length - 1];
        const health = parseFloat(lastLine);

        return res.json({
          predictedBatteryHealth: isNaN(health) ? null : health,
          confidence: null,
          remainingLife: null,
          degradationRate: null,
          cycleCount: null,
          tip
        });

      } catch (err) {
        console.error("Processing Error:", err);

        return res.status(500).json({
          error: "Error processing prediction result",
          rawOutput: stdout
        });
      }
    });

  } catch (err) {
    console.error("Controller Error:", err);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
};