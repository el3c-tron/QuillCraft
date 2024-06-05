import {User} from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

export const verifyJWT = asyncHandler(async (req, res, next) => {

    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

        if(!token) {
            return res.status(404).json(new ApiError(404, "auth middleware :: Unauthorised Request"));
        }
        // if(!token) throw new ApiError(400, "auth middleware :: Unauthorised Request")

        const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedUser._id).select("-password -refreshToken");

        if(!user) {
            return res.status(404).json(new ApiError(404, "auth middleware :: User not found"));
        }
        // if(!user) throw new ApiError(400, "auth middleware :: User not found !!");

        req.user = user;
        next();

        
    } catch (error) {
        throw new ApiError(500, error);
    }
});

