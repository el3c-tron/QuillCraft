import {Router} from 'express'
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { bookmarkDisable, bookmarkEnable } from '../controllers/bookmark.controller.js';

const router = Router();

router.route("/bookmarkEnable/:blogId").post(verifyJWT, bookmarkEnable);
router.route("/bookmarkDisable/:blogId").post(verifyJWT, bookmarkDisable);

export default router;