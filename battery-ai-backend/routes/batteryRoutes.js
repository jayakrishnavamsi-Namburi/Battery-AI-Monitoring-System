import express from "express";
import {saveBatteryData,getBatteryHistory} from "../controllers/batteryController.js";

const router = express.Router();

router.post("/save",saveBatteryData);

router.get("/history",getBatteryHistory);

export default router;