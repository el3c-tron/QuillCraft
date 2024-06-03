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

const getBlogLikes = asyncHandler( async(req, res) => {

    const {id} = req.params;

    if(!id) throw new ApiError("404", "blogController :: getBlogLikes :: Blog Not Found !!!");

    const likesArray = await Blog.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup:{
                from: "likes",
                localField: "_id",
                foreignField: "blog",
                as: "likes"
            }
        },
        {
            $project: {
                likes: 1
            }
        }
    ]);

    const likesCount = likesArray[0].likes.length;

    return res
            .status(200)
            .json(
                new ApiResponse(200, likesCount, "Likes Fetched Successfully")
            );
        

} );

const editBlog = asyncHandler( async(req, res) => {

    const user = req.user;
    if(!user) throw new ApiError(401, "blogController :: editBlog :: UNAUTHORIZED");

    const {id} = req.params;
    const {title, content} = req.body;
    const previousCoverImage = await Blog.findById(id).coverImage;
    const coverImageLocalPath = req.file?.path;

    const isEmpty = [content, title].some( (field) => {
        if(field?.trim() === "") return true;

        return false;
    } );

    if(isEmpty) throw new ApiError(400, "All fields required");

    let coverImage;
    if(coverImageLocalPath) {

        coverImage = await uploadOnCloudinary(coverImageLocalPath);

        if(!coverImage) throw new ApiError(500, "blogController :: editBlog :: Error while uploading coverImage !!");
    }

    const newBlog = await Blog.findByIdAndUpdate(
        id,
        {
            title,
            content,
            coverImage: coverImage?.url || previousCoverImage
        },
        {
            new: true
        }
    );

    return res
            .status(200)
            .json(
                new ApiResponse(200, newBlog, "Blog Edited Successfully")
            );



} );

const getBlogById = asyncHandler( async(req, res) => {

    const user = req.user;
    if(!user) throw new ApiError(400, "blogController :: getBlogById :: UNAUTHORIZED ");

    const {id} = req.params;

    if(!id) throw new ApiError(404, "blogController :: getBlog :: Blog not found");
    
    const blog = await Blog.findById(id);

    return res 
            .status(200)
            .json(
                new ApiResponse(200, blog, "Blog fetched Successfully")
            );

} );

const getAllBlogs = asyncHandler( async(req, res) => {

    const allBlogs = await Blog.find({});

    return res
            .status(200)
            .json(
                new ApiResponse(200, allBlogs, "All blogs Fetched Successfully")
            );

} );

const blogComments = asyncHandler( async(req, res) => {

    const {id} = req.params;

    const commentsArray = await Blog.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup:{
                from: "comments",
                localField: "_id",
                foreignField: "blog",
                as: "comments"
            }
        },
        {
            $project: {
                comments: 1
            }
        }
    ]);

    return res
            .status(200).
            json(
                new ApiResponse(200, commentsArray[0].comments, "Commnets fetched Successfully")
            );

} );

// :TODO: BLOG DELETION

export {
    createNewBlog,
    getBlogLikes,
    editBlog,
    getBlogById,
    getAllBlogs,
    blogComments,
}