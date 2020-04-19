const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {type: String, required: true, maxlength:20, minlength: 3},
    body: {type: String,},
    author: {type: mongoose.Schema.Types.ObjectId,required: true},
})

postSchema.methods.getPostDetails = function getPostDetails() {
    return this.title + " " + this.body
}

const postModel = mongoose.model('Post', postSchema)

module.exports = postModel