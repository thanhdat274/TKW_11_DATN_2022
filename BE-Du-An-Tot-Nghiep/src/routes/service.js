import { Router } from "express";
import {
  createService,
  list,
  read,
  remove,
  update,
  readslug,
  groupAgeByService,
  servicesStatistic,
  turnoverServicesMonth,
  groupGenderByService,
} from "../controllers/service";
import { isAdmin } from "../middlewares/checkRole";
import { jwtVerifyToken } from "../middlewares/jwtVerifyToken";

const router = Router();
router.get("/service", list);
router.post("/service",jwtVerifyToken,isAdmin,createService);
router.patch("/service/:id",jwtVerifyToken,isAdmin,update);
router.delete("/service/:id",jwtVerifyToken,isAdmin,remove);
router.get("/service-slug/:slug", readslug);
router.get("/service/:id", read);
router.get('/age-by-service',jwtVerifyToken,isAdmin,groupAgeByService)
router.get('/gender-by-service',jwtVerifyToken,isAdmin,groupGenderByService)
router.get('/service-statistics',jwtVerifyToken,isAdmin,servicesStatistic)
router.get('/turnover-month-service',jwtVerifyToken,isAdmin,turnoverServicesMonth)
export default router;
