const express = require("express");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require("path");
const { title } = require("process");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override');
const Post = require("./models/posts");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))

main()
    .then((res) => console.log("Connection Succesful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/reddit-replica');
}

app.get("/posts", async (req, res) => {
    let posts = await Post.find({});
    res.render("head.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// Create Route
app.post("/posts", async (req, res) => {
    await Post.insertOne({ ...req.body.post });
    res.redirect("/posts");
});

// Update Route
app.patch("/posts/:id", async (req, res) => {
    let { id } = req.params;
    await Post.findByIdAndUpdate(id, { ...req.body.post });
    res.redirect(`/posts/${id}`);
});

// Edit Route
app.get("/posts/:id/edit", async (req, res) => {
    let { id } = req.params;
    let postData = await Post.findById(id);
    res.render("edit.ejs", { postData });
});

// View Route
app.get("/posts/:id", async (req, res) => {
    let { id } = req.params;
    let postData = await Post.findById(id);
    res.render("detail.ejs", { postData });
});

// Delete Route
app.delete("/posts/:id", async (req, res) => {
    let { id } = req.params;
    let deletedPost = await Post.findByIdAndDelete(id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

