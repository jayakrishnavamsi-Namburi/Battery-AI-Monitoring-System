const API = "https://battery-ai-backend.onrender.com/api";

export const getHistory = async () => {

  const res = await fetch(`${API}/battery/history`);
  return res.json();

};

export const getPrediction = async () => {
  try {
    const res = await fetch(
      `${API}/predict?batteryLevel=80&cpuUsage=40&charging=0&drainRate=3`
    );

    if (!res.ok) {
      throw new Error("API Error");
    }

    return await res.json();

  } catch (err) {
    console.error("Prediction fetch failed:", err);
    return null;
  }
};