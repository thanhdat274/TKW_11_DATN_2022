import { Router } from "express";
import {
  bookingGenderStatistics,
  createBooking,
  employeeBookingList,
  listBooking,
  read,
  updateStatus,
  userBookingList,
  employeeBookingList2,
  statusStatistic,
} from "../controllers/booking";
import {
  isAdmin,
  isAdminOrEmployee,
  isEmployee,
} from "../middlewares/checkRole";
import { firebaseVerifyIdToken } from "../middlewares/firebaseVerifyIdToken";
import { jwtVerifyToken } from "../middlewares/jwtVerifyToken";
const router = Router();
router.post("/booking", createBooking);
router.get("/booking", listBooking);
router.get("/booking/:id", read);
router.patch("/booking/:id", updateStatus);
router.get("/booking-history/:id", userBookingList);
router.get(
  "/booking-employee-list/:id",
  jwtVerifyToken,
  isAdminOrEmployee,
  employeeBookingList
);
router.get(
  "/booking-gender-statistics",
  jwtVerifyToken,
  isAdmin,
  bookingGenderStatistics
);
router.post("/bookingAddByEmployee", createBooking);
router.get(
  "/booking-employee",
  jwtVerifyToken,
  isEmployee,
  employeeBookingList2
);
router.get("/status-statistics", jwtVerifyToken, isAdmin, statusStatistic);
export default router;
