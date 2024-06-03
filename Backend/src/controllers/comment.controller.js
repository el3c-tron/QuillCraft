import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Comment} from "../models/comment.model.js"
import mongoose from "mongoose";
import { ApiResponse } from "../utils/apiResponse.js";

const postComment = asyncHandler( async(req, res) => {

    const userId = req.user?._id;
    const {blogId} = req.params;
    const {content} = req.body;

    if(!userId || !blogId) throw new ApiError(402, "commentController :: postComment :: Unauthorized");

    if(content.trim() === "") throw new ApiError(400, "commentController :: postComment :: All fields required");

    const comment = await Comment.create(
        {
            owner: new mongoose.Types.ObjectId(userId),
            blog: new mongoose.Types.ObjectId(blogId),
            content
        }
    );

    const createdComment = await Comment.findById(comment._id);

    if(!createdComment) throw new ApiError(500, "commentController :: postComment :: Failed to post comment");

    return res
            .status(200)
            .json(
                new ApiResponse(200, createdComment, "Successfully post comment")
            );

} );

const deleteComment = asyncHandler( async(req, res) => {

} );

export {
    postComment,
    deleteComment
}