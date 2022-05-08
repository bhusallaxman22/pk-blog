const mongoose = require("mongoose")
// link to blogSchema to userSchema
var blogsSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    author: String,
    created: {
        type: Date,
        default: Date.now
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('blogs', blogsSchema);