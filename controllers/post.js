const Post = require("../models/posts");
const Comment = require("../models/comments");

module.exports.index = async (req, res) => {
    let posts = await Post.find({}).populate("owner");
    res.render("Pages/head.ejs", { posts });
}

module.exports.createPost = async (req, res) => {
    const newPost = new Post(req.body.post);
    newPost.owner = req.user._id;
    await newPost.save();
    req.flash("success", "New Post Created!");
    res.redirect("/posts");
}

module.exports.renderNewform = (req, res) => {
    res.render("Pages/new.ejs");
}

module.exports.showPost = async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id).populate({ path: "comments", populate: { path: "author" } }).populate("owner");
    console.log(post);
    if (!post) {
        req.flash("error", "Post does not Exist");
        return res.redirect("/posts");
    }
    res.render("Pages/detail.ejs", { post });
}

module.exports.updatePost = async (req, res) => {
    let { id } = req.params;
    await Post.findByIdAndUpdate(id, { ...req.body.post });
    req.flash("success", "Post Updated!");
    res.redirect(`/posts/${id}`);
}

module.exports.destroyPost = async (req, res) => {
    let { id } = req.params;
    await Comment.findByIdAndUpdate(id, { $pull: { comments: id } });
    let deletedPost = await Post.findByIdAndDelete(id);
    req.flash("success", "Post Deleted Succesfully!");
    res.redirect("/posts");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id).populate("owner");
    if (!post) {
        req.flash("error", "Post does not Exist");
        return res.redirect("/posts");
    }
    res.render("Pages/edit.ejs", { post });
}