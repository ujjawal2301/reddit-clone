const ExpressError = require("./utils/ExpressError");
const { commentSchema, postSchema } = require("./schema");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You Must Login First");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let post = await Post.findById(id);
    if (!post.owner.equals(res.locals.currUser.id)) {
        req.flash("error", "You don't have permission to manipulate this post");
        return res.redirect(`/posts/${id}`);
    }
    next();
}

module.exports.validatePost = (req, res, next) => {
    let { error } = postSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.validateComment = (req, res, next) => {
    let { error } = commentSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}