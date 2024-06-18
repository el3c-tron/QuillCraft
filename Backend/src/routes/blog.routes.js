import { Router } from "express";
import { 
    createNewBlog, 
    editBlog, 
    getBlogLikes,
    getBlogById, 
    getAllBlogs,
    blogComments,
    deleteBlog,
    blogCommentsCount
} from "../controllers/blog.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/createNewBlog").post(
    upload.single("coverImage"),
    verifyJWT,
    createNewBlog
);

router.route("/getBlogLikes/:id").get(getBlogLikes);

router.route("/editBlog/:id").post(
    upload.single("coverImage"),
    verifyJWT,
    editBlog
)

router.route("/getBlogById/:id").get(verifyJWT, getBlogById);

router.route("/getAllBlogs").get(getAllBlogs);

router.route("/blogComments/:id").get(verifyJWT, blogComments);

router.route("/blogCommentsCount/:id").get(blogCommentsCount)

router.route("/deleteBlog/:id").post(verifyJWT, deleteBlog);

export default router;