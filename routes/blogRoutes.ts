import { Router } from "express";
import { addBlog, getBlog, getSingleBlog, updateBlog } from "../controllers/blogController.ts";
import { authCheck } from "../middlewares/authCheck.js";
const router = Router()

router.use(authCheck)
router.post('/add',addBlog)
router.get('/get',getBlog)
router.get('/get-single',getSingleBlog)

router.put('/update',updateBlog)


export default router