import { Router } from "express";
import { createNewBlog } from "../controllers/blog.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/createNewBlog").post(
    upload.single("coverImage"),
    verifyJWT,
    createNewBlog
)

export default router;