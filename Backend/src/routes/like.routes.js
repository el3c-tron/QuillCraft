import {Router} from 'express'
import { checkLike, disliked, liked } from '../controllers/like.controller.js';
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router();

router.route("/liked/:blogId").post(verifyJWT, liked);
router.route("/disliked/:blogId").post(verifyJWT, disliked);
router.route("/checkLike/:blogId").get(verifyJWT, checkLike);

export default router;