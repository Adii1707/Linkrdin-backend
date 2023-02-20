const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
     title: String,
     body: String,
     device:String,
     no_if_comments:Number,
     
});

const PostModel = mongoose.model("posts", PostSchema);

module.exports = {
    PostModel
}