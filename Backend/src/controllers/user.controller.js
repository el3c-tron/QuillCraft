import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/fileUpload.js";
import jwt from 'jsonwebtoken'

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
    const avatarLoaclPath = req.file?.path;

    const isEmpty = [fullname, username, email, password].some( (field) => {
        if(field?.trim() === "") return true;

        return false;
    } );

    if(isEmpty) throw new ApiError(400, "All fields required");

    const existingUsername = await User.findOne({username});
    const existingEmail = await User.findOne({email});

    if(existingUsername) throw new ApiError(400, "User already exists with this username");
    if(existingEmail) throw new ApiError(400, "User already exists with this email");

    let avatar;

    if(avatarLoaclPath) {
        avatar = await uploadOnCloudinary(avatarLoaclPath);
        if(!avatar) throw new ApiError(500, "userController :: registerUser :: Error while uploading avatar");
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

    if(!createdUser) throw new ApiError(500, "userColtroller :: registerUser :: Error while creating user");

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User Created Successfully")
    );


} );

const loginUser = asyncHandler( async (req, res) => {

    const {username, password} = req.body;

    if(!username) throw new ApiError(400, "userController :: loginUser :: Username required !!");
    if(!password) throw new ApiError(400, "userController :: loginUser :: Password required !!");

    const user = await User.findOne({username});
    if(!user) throw new ApiError(400, "userController :: loginUser :: User with this username doesn't exists");

    const passwordVerify = await user.isPasswordCorrect(password);
    if(!passwordVerify) throw new ApiError(400, "userController :: loginUser :: Password is Incorrect !!");

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
    if(!user) throw new ApiError(400, "userController :: changePassword :: User doesn't exists");


    const verifyPassword = await user.isPasswordCorrect(oldPassword);
    if(!verifyPassword) throw new ApiError(400, "userController: :: changePassword :: Old Passowrd is incorrect");

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

export {
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    getCurrentUser
};