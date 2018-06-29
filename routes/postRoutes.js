const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Input Validation
const validatePostInput = require("../validation/post");
const validateCommentInput = require("../validation/comment");

// Load Models
const Post = require("../models/Post");
const User = require("../models/User");

// @route    GET api/posts
// @desc     Get posts
// @access   Public
router.get("/", (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ noPosts: "No posts found" }))
})

// @route    GET api/posts/:id
// @desc     Get post by id
// @access   Public
router.get("/:id", (req, res) => {
    Post.findById(req.params.id)
        .populate("comments.user", ["avatar", "username",])
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ noPost: "No post found" }))
})

// @route    GET api/posts/user/:id
// @desc     Get post by user
// @access   Public
router.get("/user/:id", (req, res) => {
    Post.find({ user: req.params.id })
        .populate("comments.user", ["avatar", "username",])
        .populate("user", ["avatar", "username"])
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ noPosts: "No posts found for this user" }))
})

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePostInput(req.body);
        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newPost = new Post({
            text: req.body.text,
            user: {
                _id: req.user.id,
                username: req.user.username,
                avatar: req.user.avatar,
            },
            avatar: req.user.avatar,
            username: req.user.username
        })

        newPost.save().then(post => res.json(post))
    }
)

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete("/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        User.findOne({ user: req.user.id })
            .then(user => {
                Post.findById(req.params.id)
                    .then(post => {
                        // Check post owner
                        if (post.user.toString() !== req.user.id) {
                            return res.status(401).json({ notAuthorized: "User is not authorized" })
                        }
                        post.remove().then(() => res.json({ success: true }));
                    })
                    .catch(err => res.status(404).json({ postnotfound: "Post not found" }))
            })
    });

// @route    POST api/posts/like/:id
// @desc     Like a post
// @access   Private
router.post("/like/:id", passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                // If user already liked
                // console.log(post.likes)
                const alreadyLiked = post.likes.filter(like => like.user.toString() === req.user.id);
                // console.log(alreadyLiked)
                if (alreadyLiked.length > 0) {
                    return res.status(400).json({ alreadyLiked: "This user already liked this post" })
                }

                post.likes.push({ user: req.user.id });
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: "Post not found" }))
    })

// @route      POST /api/posts/unlike/:id
// @desc       Unlike a post
// @access     Private
router.post("/unlike/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            const alreadyLiked = post.likes.filter(like => like.user.toString() === req.user.id);
            if (alreadyLiked.length === 0) {
                return res.status(400).json({ notYetLike: "You have not yet liked this post" })
            }

            // Remove index
            const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id)
            // Splice out of the array
            post.likes.splice(removeIndex, 1);
            // Save
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postNotfound: "Post not found" }))
})

// @route       POST /:id/comment
// @desc        Comment a post
// @access      Private

router.post("/:id/comment", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                user: req.user.id,
                text: req.body.text,
                avatar: req.user.avatar,
                username: req.user.username
            }
            // Push comment to post
            post.comments.push(newComment);
            // Save
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postNotfound: "Post not found" }))
})

//@route        DELETE /:postId/comment/:commentId
//@desc         Delete a comment
//@access       Private

router.delete("/:postId/comment/:commentId", passport.authenticate("jwt", { session: false }), (req, res) => {
    // Find the Post
    Post.findById(req.params.postId)
        .then(post => {
            //Check if comment exists
            const comment = post.comments.filter(comment => comment._id.toString() === req.params.commentId);
            if (comment.length == 0) {
                return res.status(404).json({ comment: "Comment does not exist" });
            }

            const commentIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.commentId);
            // Remove comment
            post.comments.splice(commentIndex, 1);
            // Save
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postNotFound: "Post not found" }))
})


module.exports = router;