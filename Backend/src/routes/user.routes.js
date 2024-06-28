import {Router} from 'express'
import { 
    changePassword, 
    getCurrentUser, 
    getUserBlogs, 
    getUserBlogsById, 
    getUserBookmarkedBlogs, 
    getUserById, 
    getUserLikedBlogs, 
    loginUser, 
    logoutUser, 
    registerUser, 
    updateUserInfo
} from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router();

router.route("/register").post(
    upload.single('avatar'),
    registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/changePassword").post(verifyJWT, changePassword);

router.route("/getCurrentUser").get(verifyJWT, getCurrentUser);

router.route("/getUserById/:userId").get(getUserById);

router.route("/getUserBlogs").get(verifyJWT, getUserBlogs);

router.route("/getUserBookmarkedBlogs").get(verifyJWT, getUserBookmarkedBlogs);

router.route("/getUserLikedBlogs").get(verifyJWT, getUserLikedBlogs);

router.route("/getUserBlogsById/:userId").get(getUserBlogsById);

router.route("/updateUserInfo").post(
    upload.single("avatar"),
    verifyJWT,
    updateUserInfo
);

export default router;

