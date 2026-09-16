const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const commentController = require("../controllers/comments");
const { validateComment, isLoggedIn, isCommentAuthor } = require("../middleware");

// Create comment
router.post("/", isLoggedIn, validateComment, wrapAsync(commentController.createComment));

// Delete Comment
router.delete("/:commentId", isLoggedIn, isCommentAuthor, wrapAsync(commentController.destroyComment));

module.exports = router;