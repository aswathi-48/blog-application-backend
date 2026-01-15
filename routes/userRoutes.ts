import { Router } from "express";
import { register } from "../controllers/userController.ts";
const router = Router()

router.post('/register',register)

export default router