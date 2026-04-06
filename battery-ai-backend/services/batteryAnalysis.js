import BatteryData from "../model/BatteryData.js";

export const analyzeBattery = async () => {

  const data = await BatteryData.find().sort({ createdAt: 1 });

  if (data.length < 2) {
    return {
      message: "Not enough data for analysis"
    };
  }

  let totalDrain = 0;
  let intervals = 0;

  for (let i = 1; i < data.length; i++) {

    const prev = data[i - 1];
    const curr = data[i];

    const drain = prev.batteryLevel - curr.batteryLevel;

    if (drain > 0) {
      totalDrain += drain;
      intervals++;
    }
  }

  const avgDrainRate = intervals > 0 ? totalDrain / intervals : 0;

  const batteryHealth = Math.max(100 - avgDrainRate * 2, 50);

  return {
    recordsAnalyzed: data.length,
    averageDrainRate: avgDrainRate,
    estimatedBatteryHealth: batteryHealth
  };
};