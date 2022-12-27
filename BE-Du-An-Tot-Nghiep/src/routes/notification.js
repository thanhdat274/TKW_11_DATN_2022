import { Router } from "express";
import {
  readAllNotification,
  readNotification,
} from "../controllers/notification";
import { jwtVerifyToken } from "../middlewares/jwtVerifyToken";
import { isAdmin } from "../middlewares/checkRole";
const router = Router();

router.put("/read-notification/:id", jwtVerifyToken, readNotification);
router.put("/read-all-notification", jwtVerifyToken, readAllNotification);
export default router;
