var express = require("express");




var app = express();


app.get("/", function(req, res){
    res.send("Hey there Diego");
});
















app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Task assigner server has started...");
})