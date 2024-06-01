import {Router} from 'express'
import { 
    changePassword, 
    getCurrentUser, 
    getUserBlogs, 
    getUserBookmarkedBlogs, 
    getUserLikedBlogs, 
    loginUser, 
    logoutUser, 
    registerUser 
} from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router();

router.route("/register").post(
    upload.single("avatar"),
    registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/changePassword").post(verifyJWT, changePassword);

router.route("/getCurrentUser").get(verifyJWT, getCurrentUser);

router.route("/getUserBlogs").get(verifyJWT, getUserBlogs);

router.route("/getUserBookmarkedBlogs").get(verifyJWT, getUserBookmarkedBlogs);

router.route("/getUserLikedBlogs").get(verifyJWT, getUserLikedBlogs);

export default router;

