module.exports.isLoggedIn = (req,res,next) => {
    // console.log(req.originalUrl);
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You Must Login First");
        return res.redirect("/login");
    }
    next();
}

module.exports.savedRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl) {
        req.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
