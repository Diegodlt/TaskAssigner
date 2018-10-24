var express = require('express');
var router = express.Router();
var Event = require("../models/event");



// Show all of events
router.get("/", function(req, res){
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
router.post("/", function(req,res){
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
router.get("/:id",function(req,res){
    
     Event.findById({_id: req.params.id}, function(err, foundEvent){
         if(err){
             res.redirect("/");
         }else{
             
             res.render("results",{event : foundEvent});
         }
     });
    
});


// Display the event page with the name chosen by the user
//    this will not load if event name is left blank
router.post("/new",function(req,res){

    var name = req.body.event;
    if( req.body.event == ""){
        res.redirect("/");
    }else{
        res.render("event", {name: name});
    }
});



// Delete an event
router.delete("/:id",function(req,res){
    Event.findByIdAndRemove(req.params.id,function(err){
        if(err){
            
        }else{
            res.redirect("/events");
        }
    })
});


module.exports = router;