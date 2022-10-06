var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var dataService = require("data_prep.js");

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "home.html"));
})

app.get("/students.json",(req,res)=>{
    dataService.cpa()
    .then(function(data){
        res.send(JSON.stringify(data));
    })
    .catch(function(reason){
        res.send(reason);
    })
})

app.get("/students.json",(req,res)=>{
    dataService.highGPA()
    .then(function(data){
        res.send(JSON.stringify(data));
    })
    .catch(function(reason){
        res.send(reason);
    })
})

dataService.prep()
.then(function(data){
    app.listen(HTTP_PORT);
})
.catch(function(reason){
    console.log(reason);
});