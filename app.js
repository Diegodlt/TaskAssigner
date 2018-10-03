var express = require("express");




var app = express();
app.set("view engine","ejs");
app.use(express.static("public"));

app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res){
    res.render("tasks");
});
















app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Task assigner server has started...");
})