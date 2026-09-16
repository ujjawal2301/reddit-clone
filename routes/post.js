const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const postController = require("../controllers/post");
const { isLoggedIn, isOwner, validatePost } = require("../middleware");

router
    .route("/")
    .get(wrapAsync(postController.index))
    .post(isLoggedIn, validatePost, wrapAsync(postController.createPost));

router.get("/new", isLoggedIn, postController.renderNewform);

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(postController.renderEditForm));

router
    .route("/:id")
    .get(wrapAsync(postController.showPost))
    .put(isLoggedIn, isOwner, validatePost, wrapAsync(postController.updatePost))
    .delete( isLoggedIn, isOwner, wrapAsync(postController.destroyPost));

module.exports = router;