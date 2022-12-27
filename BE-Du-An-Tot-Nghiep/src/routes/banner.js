import { Router } from "express";
import { post, update, read, list, remove } from "../controllers/banner";
import { jwtVerifyToken } from "../middlewares/jwtVerifyToken";
import {isAdmin} from '../middlewares/checkRole'
const router = Router();
router.post("/banners",jwtVerifyToken,isAdmin,post);
router.patch("/banners/:id",jwtVerifyToken,isAdmin,update);
router.get("/banners/:id",read);
router.get("/banners",list);
router.delete("/banners/:id",jwtVerifyToken,isAdmin,remove);

export default router;
