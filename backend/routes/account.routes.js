import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { myBalance, transferMoney } from "../controllers/account.controller.js";

const accountRouter = Router();

accountRouter.route("/balance").get(authMiddleware ,myBalance)
accountRouter.route("/transfer").post(authMiddleware ,transferMoney)


export default accountRouter;