const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            text: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now
            },
            username: {
                type: String,
                required: true,
            },
            avatar: {
                type: String,
                default: "no_image.png"
            }
        }
    ],

    avatar: {
        type: String,
        default: "no_image.png"
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model("Post", postSchema)