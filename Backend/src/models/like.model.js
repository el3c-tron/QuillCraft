import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }

});

export const Like = mongoose.model("Like", likeSchema);