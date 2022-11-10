var express = require("express");

var app = express();

var data_prep = require("./data_prep.js");

var path = require("path");

const { engine }=require('express-handlebars');



app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.engine(".hbs",engine({
    extname:".hbs",
    defaultLayout:"main",
    helpers:{
        navLink: function(url, options){
        return '<li' +
        ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
        '><a href=" ' + url + ' ">' + options.fn(this) + '</a></li>';
       },
       equal: function (lvalue, rvalue, options) {
        if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
        if (lvalue != rvalue) {
        return options.inverse(this);
        } else {
        return options.fn(this);
        }
       } 
    }
}))

app.set("view engine",".hbs")

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() 

{

    console.log("Express http server listening on " + HTTP_PORT);

}



app.get("/",(req,res)=>{

    res.render("home");

});



app.get("/BSD", (req,res)=>{

    data_prep.bsd().then((data)=>{

        const students=Object.values(data);
        res.render("allstudents",{students:students});

    }).catch(function(data){
        res.render({message: "no results"});
    });

});



app.get("/CPA", (req,res)=>{

    data_prep.cpa().then((data)=>{
        res.render("student",{data:data});

    }).catch(function(data){
        res.render({message: "no results"});
    });

});



app.get("/highGPA", (req, res)=>{

    data_prep.highGPA().then((data)=>{
        res.render("Gstudent",{data:data});

    }).catch(function(data){
        res.render({message: "no results"});
    });

});



app.get("/allStudents", (req, res)=>{

    data_prep.allStudents().then((data)=>{
        const students=Object.values(data);
        res.render("allstudents",{students:students});

    }).catch(function(data){
        res.render({message: "no results"});
    });

});



app.get("/addStudent", (req, res)=>{

    res.sendFile(path.join(__dirname, "/views/addStudent.html"));

});



app.post("/addStudent", (req, res)=>{

    data_prep.addStudent(req.body).then(()=>{

        var students = req.body;

        res.render("student",{students:students})

        //res.redirect("/allStudents");



    }).catch(function(data){
        res.render({message: "no results"});
    });

});



app.get("/student/:studId",(req, res)=>{

    data_prep.getStudent(req.params.studId).then((data)=>{
        res.render("student",{data:data});

       // res.json(data);

       // {"studId":3,"name":"name3","program":"BSD","gpa":3.3}

    }).catch(function(data){
        res.render({message: "no results"});
    });

});



app.get("*", (req, res)=>{

    res.status(404).send("Error 404: page not found.")

});



data_prep.prep().then((data)=>{

    //console.log(data);

    app.listen(HTTP_PORT, onHttpStart);

}).catch((err)=>{

    console.log(err);

});