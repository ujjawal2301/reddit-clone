const joi = require("joi");

module.exports.postSchema = joi.object({
    post: joi.object({
        username:joi.string().required(),
        title: joi.string().required(),
        content: joi.string().required(),
        url: joi.string().required(),
    }).required(),
});