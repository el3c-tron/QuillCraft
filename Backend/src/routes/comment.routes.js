import {Router} from "express"
import { deleteComment, postComment } from "../controllers/comment.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/postComment/:blogId").post(verifyJWT, postComment);
router.route("/deleteComment/:blogId").post(verifyJWT, deleteComment);

export default router;