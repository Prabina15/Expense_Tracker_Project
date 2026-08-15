import express from 'express';
import authMiddleware from "../middleware/auth.js";
import { getAnalyticsOverview } from '../controllers/analyticsController.js';

const analyticsRouter = express.Router();

analyticsRouter.get("/overview", authMiddleware, getAnalyticsOverview);

export default analyticsRouter;