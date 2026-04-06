import express from "express";
import { predictBatteryDegradation } from "../controllers/degradationController.js";

const router = express.Router();

router.get("/predict-degradation", predictBatteryDegradation);

export default router;