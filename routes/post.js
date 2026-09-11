const express = require("express");
const router = express.Router();
const Post = require("../models/posts");
const Comment = require("../models/comments");
const wrapAsync = require("../utils/wrapAsync");

const { isLoggedIn, isOwner,validatePost } = require("../middleware");

// Index Route
router.get("/", wrapAsync(async (req, res) => {
    let posts = await Post.find({}).populate("owner");
    res.render("Pages/head.ejs", { posts });
}));

// New Route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("Pages/new.ejs");
});

// Create Route
router.post("/", isLoggedIn, validatePost, wrapAsync(async (req, res) => {
    const newPost = new Post(req.body.post);
    newPost.owner = req.user._id;
    await newPost.save();
    req.flash("success", "New Post Created!");
    res.redirect("/posts");
}));


// Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id).populate("owner");
    if (!post) {
        req.flash("error", "Post does not Exist");
        return res.redirect("/posts");
    }
    res.render("Pages/edit.ejs", { post });
}));

// View Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id).populate("comments").populate("owner");
    console.log(post);
    if (!post) {
        req.flash("error", "Post does not Exist");
        return res.redirect("/posts");
    }
    res.render("Pages/detail.ejs", { post });
}));


// Update Route
router.put("/:id", isLoggedIn,isOwner, validatePost, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Post.findByIdAndUpdate(id, { ...req.body.post });
    req.flash("success", "Post Updated!");
    res.redirect(`/posts/${id}`);
}));

// Delete Route
router.delete("/:id", isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Comment.findByIdAndUpdate(id, { $pull: { comments: id } });
    let deletedPost = await Post.findByIdAndDelete(id);
    req.flash("success", "Post Deleted Succesfully!");
    res.redirect("/posts");
}));

module.exports = router;