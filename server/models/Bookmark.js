const mongoose = require("mongoose") ;

const bookmarkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    author: {
        type: String,
        trim: true
    },
    image: {
        type: String,
    },
    url: {
        type: String,
    },
    publishedAt: {
        type: Date,
        default: Date.now ,
    },
    bookmarkedAt:{
        type: Date,
        default: Date.now
    }
}) ;

module.exports = mongoose.model("Bookmark", bookmarkSchema) ;