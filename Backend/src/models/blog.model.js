import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({

    coverImage: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likesCount: {
        type: Number
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]

},{timestamps: true});

export const Blog = mongoose.Model("Blog", blogSchema);