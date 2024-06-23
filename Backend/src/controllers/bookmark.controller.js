import { ApiError } from "../utils/apiError.js";
import { ApiResponse} from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { Bookmark } from "../models/bookmark.model.js"
import mongoose from "mongoose";

const bookmarkEnable = asyncHandler( async(req, res) => {

    const {blogId} = req.params;
    const userId = req.user?._id;

    if(!blogId || !userId) {
        return res
                .status(404)
                .json(new ApiError(404, "Unauthorized Access"));
    }

    // if(!blogId || !userId) throw new ApiError(402, "bookmarkController :: bookmarkEnable :: UnAuthorized");

    const bookmardDoc = await Bookmark.create(
        {
            owner: new mongoose.Types.ObjectId(userId),
            blog: new mongoose.Types.ObjectId(blogId)
        }
    );

    const bookmark = await Bookmark.findById(bookmardDoc._id);

    if(!bookmark) {
        return res
                .status(500)
                .json(new ApiError(500, "Error on marking bookmark"));
    }

    // if(!bookmark) throw new ApiError(500, "bookmarkController :: bookmarkEnable :: Error on registring Bookmark");

    return res
            .status(200)
            .json(
                new ApiResponse(200, bookmark, "Successfully registered Bookmark")
            );

} );

const bookmarkDisable = asyncHandler( async(req, res) => {

    const {blogId} = req.params;
    const userId = req.user?._id;

    await Bookmark.deleteOne(
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

const checkBookmark = asyncHandler( async(req, res) => {
    const {blogId} = req.params;
    const userId = req.user?._id;

    if(!blogId || !userId) {
        return res
                .status(404)
                .json(new ApiError(404, "Unauthorized Access"));
    }

    const bookmarkDocument = await Bookmark.findOne(
        {
            owner: new mongoose.Types.ObjectId(userId),
            blog: new mongoose.Types.ObjectId(blogId)
        }
    )

    if(!bookmarkDocument) {
        return res
                .status(404)
                .json(new ApiError(404, "Bookmark Not Found", {bookmarked: false}))
    }

    return res
            .status(200)
            .json(new ApiResponse(200, {bookmarked : true}, "bookmarked" ))

});

export {
    bookmarkEnable,
    bookmarkDisable,
    checkBookmark
}