const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    username: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        // required: true
    },
    content: {
        type: String,
    },
    url: String
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;