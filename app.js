var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");



var app = express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/taskAssigner", {useNewUrlParser: true});

app.use(express.static(__dirname + "/public"));


var eventSchema = new mongoose.Schema({
    title : String,
    subjects : []
})

var Event = mongoose.model("Event", eventSchema);


// Show all of events
app.get("/", function(req, res){
    Event.find( {}, function(err,events){
      
        if(err){
            res.send("Could not load database")
        }
        else{
        res.render("home", {events: events});
        }
    })
});


// Create a new event
app.post("/", function(req,res){
    let incomingEvent = req.body.subjects;
    let eventTitle = req.body.title;
    let ojb = {
        title: eventTitle,
        subjects : incomingEvent
    }
    Event.create(ojb);
    
});

//Show an individual event
app.get("/:id",function(req,res){
     Event.findById({_id: req.params.id}, function(err, foundEvent){
         if(err){
             console.log("error")
         }else{
             console.log(foundEvent);
             res.render("show",{event : foundEvent});
         }
     });
    
});

app.post("/new",function(req,res){

    var name = req.body.event;
    if( req.body.event == ""){
        res.redirect("/");
    }else{
        res.render("event", {name: name});
    }
});















app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Task assigner server has started...");
})