var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    comment: String,
    link: String,
    name: String,
    postTime: Date
});

var Comments = mongoose.model("Comment", CommentSchema);

module.exports = Comments;
