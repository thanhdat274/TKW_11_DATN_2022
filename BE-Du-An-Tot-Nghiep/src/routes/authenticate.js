import { Router } from "express";
import { changeStatusAccount, signin, signup} from "../controllers/authenticate";
import { firebaseVerifyIdToken } from "../middlewares/firebaseVerifyIdToken";

const router = Router()

router.post('/signin',signin)
router.post('/signup',signup)
router.put('/change-account-status',firebaseVerifyIdToken,changeStatusAccount)
export default router