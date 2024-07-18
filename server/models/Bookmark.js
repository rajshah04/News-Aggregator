const mongoose = require("mongoose") ;

const bookmarkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
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
    }
}) ;

module.exports = mongoose.model("Bookmark", bookmarkSchema) ;