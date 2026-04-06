// import { spawn } from "child_process";
// import path from "path";

// export const predictBatteryDegradation = (req,res)=>{

//   const scriptPath = path.join(process.cwd(),"ai-model","predict_lstm.py");

//   const python = spawn("python",[scriptPath]);

//   let output = "";

//   python.stdout.on("data",(data)=>{
//     output += data.toString();
//   });

//   python.stderr.on("data",(data)=>{
//     console.error("Python Error:",data.toString());
//   });

//   python.on("close",()=>{
//     const prediction = parseFloat(output.trim());
//     res.json({prediction});
//   });

// };



import { spawn } from "child_process";
import path from "path";

export const predictBatteryDegradation = (req, res) => {
  try {
    // ================= INPUT =================
    const {
      batteryLevel = 90,
      cpuUsage = 35,
      charging = 1,
      drainRate = 1.5
    } = req.query;

    const scriptPath = path.join(process.cwd(), "ai-model", "predict_lstm.py");

    const python = spawn("python", [
      scriptPath,
      batteryLevel,
      cpuUsage,
      charging,
      drainRate
    ]);

    let stdout = "";
    let stderr = "";

    // ================= CAPTURE OUTPUT =================
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

    // ================= PROCESS COMPLETE =================
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

        let parsed = null;

        // 🔥 Try to find JSON output (preferred)
        for (let i = lines.length - 1; i >= 0; i--) {
          try {
            parsed = JSON.parse(lines[i]);
            break;
          } catch {
            continue;
          }
        }

        // ================= JSON RESPONSE =================
        if (parsed && typeof parsed === "object") {
          return res.json({
            prediction: parsed.prediction ?? null,
            confidence: parsed.confidence ?? null,
            trend: parsed.trend ?? "stable"
          });
        }

        // ================= FALLBACK =================
        const lastLine = lines[lines.length - 1];
        const prediction = parseFloat(lastLine);

        return res.json({
          prediction: isNaN(prediction) ? null : prediction,
          confidence: null,
          trend: "unknown"
        });

      } catch (err) {
        console.error("Processing Error:", err);

        return res.status(500).json({
          error: "Error processing prediction",
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