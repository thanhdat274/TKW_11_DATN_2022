import { Router } from "express";
import {list,create,update,read,deleteEmployee, employeeOrderStatistics, statisticsForOneEmployee} from "../controllers/employee";
import { isAdmin, isEmployee,isAdminOrEmployee } from "../middlewares/checkRole";
import { jwtVerifyToken } from "../middlewares/jwtVerifyToken";
const router = Router();
router.get("/employees",list)
router.post("/employees",jwtVerifyToken,isAdmin,create)    
router.patch("/employees/:id",jwtVerifyToken,isAdmin,update)
router.delete("/employees/:id",jwtVerifyToken,isAdmin,deleteEmployee)
router.get("/employees/:id",jwtVerifyToken,isAdmin,read)
router.get("/employee/order-statistics",jwtVerifyToken,isAdmin,employeeOrderStatistics)
router.get("/statistics-for-employee/:id",jwtVerifyToken,isAdminOrEmployee,statisticsForOneEmployee)
export default router;