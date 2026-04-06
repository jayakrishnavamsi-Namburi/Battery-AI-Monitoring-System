import mongoose from "mongoose";

const batterySchema = new mongoose.Schema({

  batteryLevel: Number,

  charging: Boolean,

  dischargingTime: Number,

  cpuUsage: Number,

  runningApps: [String]

},{
  timestamps:true
});

export default mongoose.model("BatteryData", batterySchema);