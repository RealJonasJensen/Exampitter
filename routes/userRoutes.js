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
    res.send("Hej fra User")
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
        username: req.user.username,
        email: req.user.email
    })
})

module.exports = router;