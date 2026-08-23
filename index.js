const express = require("express");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require("path");
const { title } = require("process");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override');
const Post = require("./models/posts");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);

main()
    .then((res) => console.log("Connection Succesful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/reddit-replica');
}

app.get("/posts", wrapAsync(async (req, res) => {
    let posts = await Post.find({});
    res.render("Pages/head.ejs", { posts });
}));

app.get("/posts/new", (req, res) => {
    res.render("Pages/new.ejs");
});

// Create Route
app.post("/posts", wrapAsync(async (req, res) => {
    await Post.insertOne({ ...req.body.post });
    res.redirect("/posts");
}));

// Update Route
app.patch("/posts/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Post.findByIdAndUpdate(id, { ...req.body.post });
    res.redirect(`/posts/${id}`);
}));

// Edit Route
app.get("/posts/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id);
    res.render("Pages/edit.ejs", { post });
}));

// View Route
app.get("/posts/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id);
    res.render("Pages/detail.ejs", { post });
}));

// Delete Route
app.delete("/posts/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedPost = await Post.findByIdAndDelete(id);
    res.redirect("/posts");
}));

app.all("/{*splat}", (req,res,next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err,req, res, next) => {
    let {statusCode=500, message="Something Went Wrong!"} = err;
    res.status(statusCode).render("error.ejs", {err});
    // res.status(statusCode).send(message);
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

