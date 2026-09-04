const express = require("express");
const router = express.Router();
const Post = require("../models/posts");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const {postSchema} = require("../schema");


const validatePost = (req, res, next) => {
    let { error } = postSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// Index Route
router.get("/", wrapAsync(async (req, res) => {
    let posts = await Post.find({});
    res.render("Pages/head.ejs", { posts });
}));

// New Route
router.get("/new", (req, res) => {
    res.render("Pages/new.ejs");
});

// Create Route
router.post("/", validatePost, wrapAsync(async (req, res) => {
    await Post.insertOne({ ...req.body.post });
    res.redirect("/posts");
}));

// Update Route
router.patch("/:id", validatePost, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Post.findByIdAndUpdate(id, { ...req.body.post });
    res.redirect(`/posts/${id}`);
}));

// Edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id);
    res.render("Pages/edit.ejs", { post });
}));

// View Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id);
    res.render("Pages/detail.ejs", { post });
}));

// Delete Route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedPost = await Post.findByIdAndDelete(id);
    res.redirect("/posts");
}));

module.exports = router;