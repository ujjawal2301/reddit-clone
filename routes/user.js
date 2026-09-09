const express = require("express");
const router = express.Router();
const User = require("../models/users");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

router.get("/signup", (req, res) => {
    res.render("users/signup");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, password, email } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to Reddit");
          
            res.redirect("/posts");
        });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}));

router.get("/login", (req,res) => {
    res.render("users/login");
});

router.post("/login",saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req,res) => {
    req.flash("success", "Welcome Back To Reddit");
    let savedUrl = res.locals.redirectUrl || "/posts";
    console.log(savedUrl);
    console.log(res.locals.redirectUrl); // this is showing undefined why?
    
    res.redirect(savedUrl);
});

router.get("/logout", (req,res) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "Logged out!");
        res.redirect("/posts");
    });
});

module.exports = router;