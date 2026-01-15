import { Router } from "express";
import { addBlog } from "../controllers/blogController.ts";
const router = Router()

router.post('/add',addBlog)

export default router