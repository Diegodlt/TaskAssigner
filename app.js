var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

var eventRoutes = require("./routes/event");

var app = express();

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


mongoose.connect("mongodb://localhost:27017/taskAssigner", {useNewUrlParser: true});

app.use(express.static(__dirname + "/public"));


app.get("/",function(req,res){
    res.redirect("/events");
})

app.use("/events",eventRoutes);




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Task assigner server has started...");
})