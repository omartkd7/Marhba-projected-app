import { Router } from "express";
import { register, login, getMe } from "../controllers/authController";
import { validateRegister, validateLogin } from "../middlewares/validate";
import authenticate from "../middlewares/authenticate";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/me", authenticate, getMe);

export default router;
