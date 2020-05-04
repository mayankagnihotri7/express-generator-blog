const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let articlesSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    tags: String
}, {timestamps: true});

let Article = mongoose.model('Articles', articlesSchema);
module.exports = Article;