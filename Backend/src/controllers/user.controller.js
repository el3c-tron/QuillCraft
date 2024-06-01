import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/fileUpload.js";

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


} )

export {
    registerUser,
};