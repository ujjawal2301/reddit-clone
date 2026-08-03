const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { title } = require("process");
const { v4: uuidv4 } = require("uuid");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id: uuidv4(),
        username: "cricketiccofficial",
        title: "ICC reveals official logo and branding for the WC27!",
        content: "lorem",
        img: "https://preview.redd.it/icc-reveals-official-logo-and-branding-for-the-wc27-v0-sccrue3ueegh1.jpg?width=1080&crop=smart&auto=webp&s=4f5eb614b3541a326163135a812db9a5347eff23"
    },
    {
        id: uuidv4(),
        username: "spidermanFan82",
        title: "I tried to recreate every Spider-Man movie poster in photo mode",
        content: "lorem",
        img: "https://preview.redd.it/i-tried-to-recreate-every-spider-man-movie-poster-in-photo-v0-1wivrbriiagh1.jpg?width=1080&crop=smart&auto=webp&s=dff721775ec2316ff7e1dc935c7913e882ff98de"
    },
    {
        id: uuidv4(),
        username: "BollyBlindsNGossip",
        title: "Which Bollywood movie kept it's plotline perfectly hidden until the movie got released?",
        content: "lorem",
        img: "https://preview.redd.it/which-bollywood-movie-kept-its-plotline-perfectly-hidden-v0-9sg0aih4a4hh1.jpeg?width=1080&crop=smart&auto=webp&s=4565efd0b32cc066b22a8e48283c790ae4a330a7"
    }
];

app.get("/", (req,res)=>{
    res.render("head.ejs");
});

app.listen(port, ()=>{
    console.log(`Listening at port ${port}`);
});

