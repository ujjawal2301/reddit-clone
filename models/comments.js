const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model("Comment", commentSchema);