const joi = require("joi");

module.exports.postSchema = joi.object({
    post: joi.object({
        username:joi.string().required(),
        title: joi.string().required(),
        content: joi.string().required(),
        url: joi.string().required(),
    }).required(),
});

module.exports.commentSchema = joi.object({
    user: joi.object({
        comment: joi.string().required()
    }).required(),
});