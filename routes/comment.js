
const express = require("express");
const router = express.Router({ mergeParams: true });
const Post = require("../models/posts");
const Comment = require("../models/comments");
const wrapAsync = require("../utils/wrapAsync");

const { validateComment, isLoggedIn, isCommentAuthor } = require("../middleware");

// Create comment
router.post("/", isLoggedIn, validateComment, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id);
    let newComment = new Comment(req.body.user);
    newComment.author = req.user._id;
    post.comments.push(newComment);

    await post.save();
    await newComment.save();

    req.flash("success", "New Comment Added!");
    res.redirect(`/posts/${id}`);
}));

// Delete Comment
router.delete("/:commentId", isLoggedIn, isCommentAuthor,  wrapAsync(async (req, res) => {
    let { id, commentId } = req.params;
    await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash("success", "Comment Deleted!");
    res.redirect(`/posts/${id}`);
}));

module.exports = router;