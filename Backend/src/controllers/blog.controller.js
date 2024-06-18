import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";
import { Like } from "../models/like.model.js";
import { Bookmark } from "../models/bookmark.model.js"
import { Comment } from "../models/comment.model.js"

const createNewBlog = asyncHandler( async (req, res) => {

    const {content, title} = req.body;
    const owner = req.user?._id;
    const coverImageLocalPath = req.file?.path;

    if(!owner) {
        return res
                .status(404)
                .json(new ApiError(404, "Unauthorized Access", {}));

    }
    // if(!owner) throw new ApiError(404, "blogController :: createNewBlog :: Unauthorized");

    if(!coverImageLocalPath) {
        return res
                .status(400)
                .json(new ApiError(400, "CoverImage Also Required", {content, title}));
    }
    // if(!coverImageLocalPath) throw new ApiError(401, "blogController :: createNewBlog :: CoverImage Also Required");

    const isEmpty = [content, title].some( (field) => {
        if(field?.trim() === "") return true;

        return false;
    } );

    // if(isEmpty) throw new ApiError(400, "All fields required");
    if(isEmpty) {
        return res
                .status(400)
                .json(new ApiError(400, "All Fields Required", {content, title}));
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // if(!coverImage || !coverImage.url) throw new ApiError(500, "blogController :: createNewBlog :: Failed to upload Image");

    if(!coverImage || !coverImage.url) {
        return res
                .status(500)
                .json(new ApiError(500, "Failed to upload Image", {content, title}));
    }

    const blog = await Blog.create(
        {
            title,
            content,
            owner: new mongoose.Types.ObjectId(owner),
            coverImage: coverImage.url 
        }
    );

    const newBlog = await Blog.findById(blog._id);
    // if(!newBlog) throw new ApiError(500, "blogController :: createNewBlog :: Failed in creation of Blog");

    if(!newBlog) {
        return res
                .status(500)
                .json(new ApiError(500, "Failed to post blog", {content, title}));
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200, newBlog, "Successfully created blog")
            )
    
} );

const getBlogLikes = asyncHandler( async(req, res) => {

    const {id} = req.params;

    if(!id) {
        return res
                .status(404)
                .josn(new ApiError(400, "Blog Not Found", {}));
    }
    // if(!id) throw new ApiError("404", "blogController :: getBlogLikes :: Blog Not Found !!!");

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

    if(!user) {
        return res
                .status(400)
                .json(new ApiError(400, "Unauhtorized", {}));
    }

    // if(!user) throw new ApiError(401, "blogController :: editBlog :: UNAUTHORIZED");

    const {id} = req.params;
    const {title, content} = req.body;
    const previousCoverImage = await Blog.findById(id).coverImage;
    const coverImageLocalPath = req.file?.path;

    const isEmpty = [content, title].some( (field) => {
        if(field?.trim() === "") return true;

        return false;
    } );

    if(isEmpty) {
        return res
                .status(400)
                .json(new ApiError(400, "All Fields Required", {content, title}));
    }

    // if(isEmpty) throw new ApiError(400, "All fields required");

    let coverImage;
    if(coverImageLocalPath) {

        coverImage = await uploadOnCloudinary(coverImageLocalPath);

        if(!coverImage) {
            return res
                    .status(500)
                    .json(new ApiError(500, "Error while uploading coverImage", {content, title}));
        }
        // if(!coverImage) throw new ApiError(500, "blogController :: editBlog :: Error while uploading coverImage !!");
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

    if(!user) {
        return res
                .status(404)
                .json(new ApiError(404, "Unathorized Access"));
    }
    // if(!user) throw new ApiError(400, "blogController :: getBlogById :: UNAUTHORIZED ");

    const {id} = req.params;

    if(!id) {
        return res
                .status(404)
                .json(new ApiError(404, "Blog Not Found"));
    }
    // if(!id) throw new ApiError(404, "blogController :: getBlog :: Blog not found");
    
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

const blogCommentsCount = asyncHandler(async (req, res) => {

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

    const commentCount = commentsArray[0].comments.length

    return res
            .status(200).
            json(
                new ApiResponse(200, commentCount, "Commnets Count fetched Successfully")
            );

});

const deleteBlog = asyncHandler( async(req, res) => {

    const {id} = req.params;

    await Like.deleteMany(
        {
            blog: new mongoose.Types.ObjectId(id)
        }
    );

    await Bookmark.deleteMany(
        {
            blog: new mongoose.Types.ObjectId(id)
        }
    );

    await Comment.deleteMany(
        {
            blog: new mongoose.Types.ObjectId(id)
        }
    );

    await Blog.deleteOne(
        {
            _id: new mongoose.Types.ObjectId(id)
        }
    );

    return res
            .status(200)
            .json(
                new ApiResponse(200, {}, "Blog Deleted Successfully")
            );

 
} );

export {
    createNewBlog,
    getBlogLikes,
    editBlog,
    getBlogById,
    getAllBlogs,
    blogComments,
    deleteBlog,
    blogCommentsCount
}