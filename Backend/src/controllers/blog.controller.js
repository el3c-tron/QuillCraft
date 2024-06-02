import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";

const createNewBlog = asyncHandler( async (req, res) => {

    const {content, title} = req.body;
    const owner = req.user?._id;
    const coverImageLocalPath = req.file?.path;

    if(!owner) throw new ApiError(404, "blogController :: createNewBlog :: Unauthorized");
    if(!coverImageLocalPath) throw new ApiError(401, "blogController :: createNewBlog :: CoverImage Also Required");

    const isEmpty = [content, title].some( (field) => {
        if(field?.trim() === "") return true;

        return false;
    } );

    if(isEmpty) throw new ApiError(400, "All fields required");

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!coverImage || !coverImage.url) throw new ApiError(500, "blogController :: createNewBlog :: Failed to upload Image");

    const blog = await Blog.create(
        {
            title,
            content,
            owner: new mongoose.Types.ObjectId(owner),
            coverImage: coverImage.url 
        }
    );

    const newBlog = await Blog.findById(blog._id);
    if(!newBlog) throw new ApiError(500, "blogController :: createNewBlog :: Failed in creation of Blog");

    return res
            .status(200)
            .json(
                new ApiResponse(200, newBlog, "Successfully created blog")
            )
    
} );

export {
    createNewBlog,
}