import {Router} from 'express'
import { disliked, liked } from '../controllers/like.controller.js';
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router();

router.route("/liked/:blogId").post(verifyJWT, liked);
router.route("/disliked/:blogId").post(verifyJWT, disliked);

export default router;