
import { Router } from "express";
import { createContact, deleteContact, getListContact } from "../controllers/contact";
import { isAdmin } from "../middlewares/checkRole";
import { jwtVerifyToken } from "../middlewares/jwtVerifyToken";
const router = Router();
router.post("/contact", createContact);
router.get("/contact",getListContact)
router.delete("/contact/:id",jwtVerifyToken,isAdmin,deleteContact)
export default router;