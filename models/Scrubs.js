var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ScrubSchema = new Schema({
    title: String,
    link: String,
    summ: String,
    scrubTime: Date
});

var Scrub = mongoose.model("Scrub", ScrubSchema);

module.exports = Scrub;
