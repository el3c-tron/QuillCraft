import {Router} from 'express'
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { bookmarkDisable, bookmarkEnable, checkBookmark } from '../controllers/bookmark.controller.js';

const router = Router();

router.route("/bookmarkEnable/:blogId").post(verifyJWT, bookmarkEnable);
router.route("/bookmarkDisable/:blogId").post(verifyJWT, bookmarkDisable);
router.route("/checkBookmark/:blogId").get(verifyJWT, checkBookmark)

export default router;