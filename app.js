var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");



var app = express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


mongoose.connect("mongodb://localhost:27017/taskAssigner", {useNewUrlParser: true});

app.use(express.static(__dirname + "/public"));


var eventSchema = new mongoose.Schema({
    created: {type: Date, default: Date.now, expires: '12h' },
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
    let event= {
        title: eventTitle,
        subjects : incomingEvent
    }
    Event.create(event, function(err, newEvent){
        if(err){
            res.redirect("/");
        }else{
             res.writeHead(200, { 'Content-Type': 'text/plain'});
             res.end(""+newEvent._id);
        }
    });
    
 

    
    
});

//Show an individual event
app.get("/:id",function(req,res){
    
     Event.findById({_id: req.params.id}, function(err, foundEvent){
         if(err){
             
         }else{
             
             res.render("results",{event : foundEvent});
         }
     });
    
});


// Display the event page with the name chosen by the user
//    this will not load if event name is left blank
app.post("/new",function(req,res){

    var name = req.body.event;
    if( req.body.event == ""){
        res.redirect("/");
    }else{
        res.render("event", {name: name});
    }
});



// Delete an event
app.delete("/:id",function(req,res){
    Event.findByIdAndRemove(req.params.id,function(err){
        if(err){
            
        }else{
            res.redirect("/");
        }
    })
})




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Task assigner server has started...");
})