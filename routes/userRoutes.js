const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// User model
const User = require("../models/User");

// @route    Get api/users/
// @desc     Test Routes
// @access   Public
router.get("/", (req, res) => {
    User.find({})
        .then(users => {
            return res.json(users)
        })
        .catch(err => {
            return res.status(404).json({ noUsers: "No users found" })
        })
})

// @route    Get api/users/newest
// @desc     Get the 5 newest users
// @access   Public
router.get("/newest", (req, res) => {
    User.aggregate([
        { $sort: { date: -1 } },
        { $project: { avatar: 1, date: 1, username: 1, followers: 1, dayMonthyear: { $dateToString: { format: "%d-%m-%Y", date: "$date" } } } },
        { $limit: 5 },
    ])
        .then(users => {
            return res.json(users)
        })
        .catch(err => {
            return res.status(404).json({ noUsers: "No users found" })
        })
})

// @route    Get api/users/followers
// @desc     Get the 5 users with most followers
// @access   Public
router.get("/top", (req, res) => {
    User.find({}, { avatar: 1, username: 1, followers: 1, date: 1 }).sort({ followers: -1 }).limit(5)
        .then(users => {
            return res.json(users)
        })
        .catch(err => {
            return res.status(404).json({ noUsers: "No users found" })
        })
})

// @route    POST api/users/register
// @desc     Register User
// @access   Public
router.post("/register", async (req, res) => {
    // console.log(req.body)
    const { errors, isValid } = validateRegisterInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    await User.findOne({ email: req.body.email })
        .then(user => {
            if (user && user.email.toLowerCase() == req.body.email.toLowerCase()) {
                console.log(user)
                console.log(user.email.toLowerCase() == req.body.email.toLowerCase())
                errors.email = "There is already an user with that email";
            }
        }
        )

    await User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                errors.username = "There is already an user with that username";
            }
        })

    await createUser(errors);

    function createUser(errors) {
        if (errors.email || errors.username) {
            return res.status(400).json(errors)
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) console.log(err);
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        }
    }

})

// @route    POST api/users/login
// @desc     Login User / Get JwToken
// @access   Public
router.post("/login", (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find User

    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = "User not found";
                return res.status(404).json(errors);
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, username: user.username }
                        // Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) console.log(err);
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            }
                        );
                    } else {
                        errors.password = "Password is incorrect";
                        return res.status(400).json(errors)
                    }
                })
        })
})

// @route    GET api/users/current
// @desc     Return current user
// @access   Private
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        avatar: req.user.avatar,
        username: req.user.username,
        email: req.user.email,
        followers: req.user.followers
    })
})

// @route       POST api/users/:id/follow/
// @desc        Follow a user
// @access      Private
router.post("/:id/follow", passport.authenticate("jwt", { session: false }), async (req, res) => {
    await User.findById(req.params.id)
        .then(user => {
            // console.log(user)
            // Check if already following
            const alreadyFollowing = user.followers.filter(follower => follower.user._id.toString() == req.user.id)
            console.log(alreadyFollowing)
            if (alreadyFollowing.length > 0) {
                return res.status(400).json({ alreadyFollow: "You already follow this user" })
            }

            User.findById(req.user.id)
                .then(currentUser => {
                    console.log(currentUser)
                    const newFollowing = {
                        user: req.params.id
                    }
                    // Push into following
                    currentUser.following.push(newFollowing)
                    currentUser.save()
                }
                )
            // Create follower
            const newFollower = {
                user: req.user.id
            }
            // Push into followers
            user.followers.push(newFollower);
            user.save().then(user => res.json(user))

        })
        .catch(err => {
            res.status(404).json({ noUser: "No user found" })
        })
    await console.log("Logged in:" + req.user.id, "Person to follow:" + req.params.id)
})

// @route       POST api/users/:id/unfollow/
// @desc        unfollow a user
// @access      Private
router.post("/:id/unfollow", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            // console.log(user)

            // Check if following
            const alreadyFollowing = user.followers.filter(follower => follower.user._id.toString() == req.user.id)
            console.log(alreadyFollowing)
            if (alreadyFollowing.length === 0) {
                return res.status(400).json({ alreadyFollow: "You can't unfollow a user you don't follow" })
            }

            User.findById(req.user.id)
                .then(currentUser => {
                    // Get Remove Index for Following
                    const removeIndex = currentUser.following.map(item => item.toString()).indexOf(req.params.id)
                    currentUser.following.splice(removeIndex, 1)
                    currentUser.save()
                })
                .catch(err => console.log(err))


            // Remove index
            const removeIndex = user.followers.map(item => item.toString()).indexOf(req.user.id)
            // Splice out of the array
            user.followers.splice(removeIndex, 1);
            // Save
            user.save().then(user => res.json(user))

        })
        .catch(err => {
            res.status(404).json({ noUser: "No user found" })
        })
})

module.exports = router;