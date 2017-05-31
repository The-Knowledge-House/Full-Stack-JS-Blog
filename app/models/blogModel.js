var mongoose = require("mongoose");

var blogPost = new mongoose.Schema({
    title: String,
    post: String,
    date: {
        month: String,
        day: String,
        year: String
    },
    user: String,
    comments: [
        {
            comment: String,
            user: String
        }
    ]
});

module.exports = mongoose.model("posts", blogPost);
