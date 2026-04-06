import express from "express";
import { getBatteryAnalysis } from "../controllers/analysisController.js";

const router = express.Router();

router.get("/", getBatteryAnalysis);

export default router;