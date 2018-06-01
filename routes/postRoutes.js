const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Input Validation
const validatePostInput = require("../validation/post");

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
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ noPost: "No post found" }))
})

// @route   GET api/posts
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
            user: req.user.id
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
            .then(profile => {
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

// @route    POST api/like/:id
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

module.exports = router;