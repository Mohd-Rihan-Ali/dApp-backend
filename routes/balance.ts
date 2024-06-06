import express from "express";
import { bnbBalance, ethBalance } from "../controllers/balanceController";

const router = express.Router();

router.get("/eth-balance/:id", ethBalance);
router.get("/bnb-balance/:id", bnbBalance);

export default router;
