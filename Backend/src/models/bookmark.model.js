import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }

});

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);