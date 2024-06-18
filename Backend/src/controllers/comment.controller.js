import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Comment} from "../models/comment.model.js"
import mongoose from "mongoose";
import { ApiResponse } from "../utils/apiResponse.js";

const postComment = asyncHandler( async(req, res) => {

    const userId = req.user?._id;
    const {blogId} = req.params;
    const {content} = req.body;

    if(!userId || !blogId) {
        return res
                .status(404)
                .json(new ApiError(404, "Unauthorized Access"));
    }
    // if(!userId || !blogId) throw new ApiError(402, "commentController :: postComment :: Unauthorized");

    if(content.trim() === "") {
        return res
                .status(400)
                .json(new ApiError(400, "Content Required"));
    }
    // if(content.trim() === "") throw new ApiError(400, "commentController :: postComment :: All fields required");

    const comment = await Comment.create(
        {
            owner: new mongoose.Types.ObjectId(userId),
            blog: new mongoose.Types.ObjectId(blogId),
            content
        }
    );

    const createdComment = await Comment.findById(comment._id);

    if(!createdComment) {
        return res
                .status(500)
                .json(new ApiError(500, "Failed to post comment", {content}));
    }
    // if(!createdComment) throw new ApiError(500, "commentController :: postComment :: Failed to post comment");

    return res
            .status(200)
            .json(
                new ApiResponse(200, createdComment, "Successfully post comment")
            );

} );

const deleteComment = asyncHandler( async(req, res) => {

    const {blogId} = req.params;
    const userId = req.user?._id;

    await Comment.deleteOne(
        {
            owner: new mongoose.Types.ObjectId(userId),
            blog: new mongoose.Types.ObjectId(blogId)
        }
    );

    // const isDeleted = await Like.findById()

    return res
            .status(200)
            .json(
                new ApiResponse(200, {}, "Deleted Successfully")
            )

} );

export {
    postComment,
    deleteComment
}