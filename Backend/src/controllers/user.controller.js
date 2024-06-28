import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import {Blog} from "../models/blog.model.js"
import { uploadOnCloudinary } from "../utils/fileUpload.js";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    
    try {
        const user = await User.findById(userId);
        // if(!user) throw new ApiError(400, "userController :: generateAccessAndRefreshToekn :: User doesn't exists");
        
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        user.refreshToken = refreshToken;
    
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};

    } catch (error) {
        throw new ApiError(400, "userController :: generateAccessAndRefreshToekn :: Failed to generate tokens");
    }
}

const registerUser = asyncHandler( async (req, res) => {

    const {fullname, username, email, password} = req.body;
    const avatarLocalPath = req.file?.path;

    // console.log(fullname, username, email, password);
    // console.log(req.file);

    const isEmpty = [fullname, username, email, password].some( (field) => {
        if(field?.trim() === "") return true;

        return false;
    } );

    if(isEmpty) {
        return res
                .status(400)
                .json(new ApiError(400, "All fields required", {fullname, username, email, password}));
    }
    // if(isEmpty) throw new ApiError(400, "All fields required");

    const existingUsername = await User.findOne({username});
    const existingEmail = await User.findOne({email});

    if(existingUsername) {
        return res
                .status(400)
                .json(new ApiError(400, "User already exists with this username", {fullname, email, password}));
    }
    if(existingEmail) {
        return res
                .status(400)
                .json(new ApiError(400, "User already exists with this email", {fullname, username, password}));
    }

    // if(existingUsername) throw new ApiError(400, "User already exists with this username");
    // if(existingEmail) throw new ApiError(400, "User already exists with this email");

    let avatar;

    if(avatarLocalPath) {
        avatar = await uploadOnCloudinary(avatarLocalPath);

        if(!avatar) {
            return res
                    .status(500)
                    .json(new ApiError(500, "Error while uploading avatar", {fullname, username, email, password}));
        }
        // if(!avatar) throw new ApiError(500, "userController :: registerUser :: Error while uploading avatar");
    } 

    const user = await User.create(
        {
            fullname,
            username: username.toLowerCase(),
            email,
            password,
            avatar: avatar?.url || ""
        }
    );

    const createdUser = await User.findById(user._id).select("-password -refreshtoken");
    
    if(!createdUser) {
        return res
                .status(500)
                .json(new ApiError(500, "Failed to create user", {fullname, username, email, password}));
    }
    // if(!createdUser) throw new ApiError(500, "userColtroller :: registerUser :: Error while creating user");

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, createdUser, "User Created Successfully")
            );


} );

const loginUser = asyncHandler( async (req, res) => {

    const {username, password} = req.body;
    
    if(!username) {
        return res.status(400).json(new ApiError(400, "Username required !!"));
    }
    if(!password) {
        return res.status(400).json(new ApiError(400, "Password required !!"));
    }

    // if(!username) throw new ApiError(400, "userController :: loginUser :: Username required !!");
    // if(!password) throw new ApiError(400, "userController :: loginUser :: Password required !!");

    const user = await User.findOne({username});

    if(!user) {
        return res.status(400).json(new ApiError(400, "User with this username doesn't exists"))
    }
    // if(!user) throw new ApiError(400, "userController :: loginUser :: User with this username doesn't exists");

    const passwordVerify = await user.isPasswordCorrect(password);

    if(!passwordVerify) {
        return res.status(400).json(new ApiError(400, "Password is Incorrect !!"))
    }
    // if(!passwordVerify) throw new ApiError(400, "userController :: loginUser :: Password is Incorrect !!");

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, loggedInUser, "user LoggedIn Successfully")
            )

} );

const logoutUser = asyncHandler( async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(
                new ApiResponse(200, {}, "User Logged Out Successfullt")
            );

} );

const changePassword = asyncHandler( async (req, res) => {
    
    const userId = req.user?._id;
    const {oldPassword, newPassword} = req.body;

    const user = await User.findById(userId);
    if(!user) {
        return res.status(400).json(new ApiError(400, "User with this username doesn't exists"))
    }
    // if(!user) throw new ApiError(400, "userController :: changePassword :: User doesn't exists");


    const verifyPassword = await user.isPasswordCorrect(oldPassword);

    if(!verifyPassword) {
        return res.status(400).json(new ApiError(400, "Old Password is Incorrect !!"))
    }
    // if(!verifyPassword) throw new ApiError(400, "userController: :: changePassword :: Old Passowrd is incorrect");

    user.password = newPassword;

    await user.save({validateBeforeSave: false});

    return res
            .status(200)
            .json(
                new ApiResponse(200, user, "Password Changed SuccesFully")
            );

} );

const getCurrentUser = asyncHandler( async (req, res) => {

    return res
            .status(200)
            .json(
                new ApiResponse(200, req.user, "User Fetched Successfully")
            );
} );

const getUserById = asyncHandler( async(req, res) => {
    const {userId} = req.params;

    const user = await User.findById(userId);
    
    if(!user) {
        
        return res
                .status(404)
                .json(new ApiError(404, "No User Found"))
    }

    return res
            .status(200)
            .json(new ApiResponse(200, user, "User Extracted"))
} )

const getUserBlogs = asyncHandler( async(req, res) => {

    const userId = req?.user._id;

    const user = await User.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from: "blogs",
                localField: "_id",
                foreignField: "owner",
                as: "blogs"
            }
        },
        {
            $project:{
                blogs: 1
            }
        }
    ]);


    return res.status(200).json(new ApiResponse(200, user[0].blogs, "User Blogs Fetched"));

} );

const getUserBlogsById = asyncHandler( async(req, res) => {

    const {userId} = req.params;

    if(!userId) {
        return res
                .status(404)
                .json(new ApiError(404, 'No user Found'));
    }

    const user = await User.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from: "blogs",
                localField: "_id",
                foreignField: "owner",
                as: "blogs"
            }
        },
        {
            $project:{
                blogs: 1
            }
        }
    ]);


    return res.status(200).json(new ApiResponse(200, user[0].blogs, "User Blogs Fetched"));

} )

const getUserBookmarkedBlogs = asyncHandler( async(req, res) => {
    const userId = req?.user._id;

    const userBookmarkedBlogs = await User.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from: "bookmarks",
                localField: "_id",
                foreignField: "owner",
                as: "bookmarks"
            }
        },
        {
            $project:{
                bookmarks:1
            }
        }
    ]);

    const allIds = [];
    userBookmarkedBlogs[0].bookmarks.forEach(obj => {
        allIds.push(obj.blog);
    });

    let blogs = [];

    for (let id of allIds) {
        blogs.push(await Blog.findById(id));
    }

    return res.status(200).json(new ApiResponse(200, blogs, "Bookmarked Blogs Fetched Successfully"));
} );

const getUserLikedBlogs = asyncHandler( async(req, res) => {
    const userId = req?.user._id;

    const userLikedBlogs = await User.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from: "likes",
                localField: "_id",
                foreignField: "owner",
                as: "likedBlogs"
            }
        },
        {
            $project:{
                likedBlogs:1
            }
        }
    ]);

    const allIds = [];
    userLikedBlogs[0].likedBlogs.forEach(obj => {
        allIds.push(obj.blog);
    });

    let blogs = [];

    for (let id of allIds) {
        blogs.push(await Blog.findById(id));
    }

    return res.status(200).json(new ApiResponse(200, blogs, "Liked Blogs Fetched Successfully"));
} );

const updateUserInfo = asyncHandler( async(req, res) => {

    const userId = req.user?._id;
    const previousAvatar = req.user.avatar;

    if(!userId) {
        return res.status(404).json(new ApiError(404, "User Not Found !! (unauthorized)"))
    }
    // if(!userId) throw new ApiError(404, "userController :: updateUserInfo :: User Not Found !! (unauthorized)");

    const {fullname, username, email} = req.body;
    const avatarLocalPath = req.file?.path;

    const existingUsername = await User.findOne({username});
    const existingEmail = await User.findOne({email});

    if(existingUsername) {
        return res
                .status(400)
                .json(new ApiError(400, "User already exists with this username", {fullname, email}));
    }
    if(existingEmail) {
        return res
                .status(400)
                .json(new ApiError(400, "User already exists with this email", {fullname, username}));
    }

    // if(existingUsername) throw new ApiError(400, "User already exists with this username");
    // if(existingEmail) throw new ApiError(400, "User already exists with this email");

    let avatar;

    if(avatarLocalPath) {
        console.log("AVATAR HERE");
        avatar = await uploadOnCloudinary(avatarLocalPath);
        if(!avatar) {
            return res
                    .status(500)
                    .json(new ApiError(500, "Error while uploading avatar", {fullname, username, email}));
        }
        // if(!avatar) throw new ApiError(500, "userController :: updateUserInfo :: Error while uploading avatar");
    }

    const user = await User.findByIdAndUpdate(
        userId,
        {
            fullname,
            username: username.toLowerCase(),
            email,
            avatar: avatar?.url || previousAvatar
        },
        {
            new: true
        }
    );

    return res
            .status(200)
            .json(
                new ApiResponse(200, user, "UserInfo Updated successfully")
            );


} );


export {
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    getCurrentUser,
    getUserBlogs,
    getUserBookmarkedBlogs,
    getUserLikedBlogs,
    updateUserInfo,
    getUserById,
    getUserBlogsById
};