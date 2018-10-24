var mongoose = require("mongoose");


var eventSchema = new mongoose.Schema({
    createdAt: {type: Date, default: Date.now, expires: 60 },
    title : String,
    subjects : []
})

module.exports = mongoose.model("Event", eventSchema);