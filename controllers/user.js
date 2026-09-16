const User = require("../models/users");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
}

module.exports.signup = async (req, res) => {
    try {
        let { username, password, email } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Reddit");

            res.redirect("/posts");
        });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome Back To Reddit");
    let savedUrl = res.locals.redirectUrl || "/posts";
    console.log(savedUrl);
    console.log(res.locals.redirectUrl);
    res.redirect(savedUrl);
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out!");
        res.redirect("/posts");
    });
}