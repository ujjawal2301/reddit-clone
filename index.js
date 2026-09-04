const express = require("express");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require("path");
const { title } = require("process");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");

const posts = require("./routes/post");

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

app.use("/posts", posts);

app.all("/{*splat}", (req,res,next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err,req, res, next) => {
    let {statusCode=500, message="Something Went Wrong!"} = err;
    res.status(statusCode).render("error.ejs", {err});
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

