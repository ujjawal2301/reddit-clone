const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { title } = require("process");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))


let posts = [
    {
        id: uuidv4(),
        username: "cricketiccofficial",
        title: "ICC reveals official logo and branding for the WC27!",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Ab corporis modi dolores numquam voluptates libero fuga laborum, cumque illum minima molestias dicta sapiente placeat perferendis harum non tempore, reprehenderit alias.",
        src: "https://preview.redd.it/icc-reveals-official-logo-and-branding-for-the-wc27-v0-sccrue3ueegh1.jpg?width=1080&crop=smart&auto=webp&s=4f5eb614b3541a326163135a812db9a5347eff23"
    },
    {
        id: uuidv4(),
        username: "spidermanFan82",
        title: "I tried to recreate every Spider-Man movie poster in photo mode",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab corporis modi dolores numquam voluptates libero fuga laborum, cumque illum minima molestias dicta sapiente placeat perferendis harum non tempore, reprehenderit alias.",
        src: "https://preview.redd.it/i-tried-to-recreate-every-spider-man-movie-poster-in-photo-v0-1wivrbriiagh1.jpg?width=1080&crop=smart&auto=webp&s=dff721775ec2316ff7e1dc935c7913e882ff98de"
    },
    {
        id: uuidv4(),
        username: "BollyBlindsNGossip",
        title: "Which Bollywood movie kept it's plotline perfectly hidden until the movie got released?",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab corporis modi dolores numquam voluptates libero fuga laborum, cumque illum minima molestias dicta sapiente placeat perferendis harum non tempore, reprehenderit alias.",
        src: "https://preview.redd.it/which-bollywood-movie-kept-its-plotline-perfectly-hidden-v0-9sg0aih4a4hh1.jpeg?width=1080&crop=smart&auto=webp&s=4565efd0b32cc066b22a8e48283c790ae4a330a7"
    }
];

app.get("/posts", (req, res) => {
    res.render("head.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, title, content, src } = req.body;
    let id = uuidv4();
    console.log(id);
    posts.push({ id, username, title, content, src });
    res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
     res.render("detail.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("detail.ejs", { post });
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

