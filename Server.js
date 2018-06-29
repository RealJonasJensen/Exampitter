const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");


// DB
const keys = require("./config/keys");
mongoose
    .connect(keys.db)
    .then(() => console.log("Database Connected"))
    .catch(error => console.log(error))

// Import Routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// Passport
app.use(passport.initialize());
// Config
require("./config/passport")(passport);

// Uses
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, (req, res) => {
    console.log("Server listening on: " + PORT)
}
)