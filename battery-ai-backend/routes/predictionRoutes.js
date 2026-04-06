import express from "express";
import { predictBatteryHealth } from "../controllers/predictionController.js";

const router = express.Router();

// router.get("/predict", predictBatteryHealth);
router.get("/", predictBatteryHealth);

export default router;