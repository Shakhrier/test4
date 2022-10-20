var express = require("express");
var app = express();
var path = require("path");
const { stringify } = require("querystring");
var data_prep = require("./data_prep.js");

var HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() 
{
    console.log("Express http server listening on " + HTTP_PORT);
}

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/CPA", (req,res)=>{
    data_prep.cpa().then((data)=>{
        res.json(data);
    }).catch((reason)=>{
        res.json({message:reason});
    });
});

app.get("/highGPA", (req, res)=>{
    data_prep.highGPA().then((data)=>{
        let resText = `<h2> Highest GPA: </h2>
        <p> Student ID: ${data.studId} </p>
        <p> Name:  ${data.name} </p>
        <p> Program: ${data.program} </p>
        <p> GPA: ${data.gpa} </p> `;
        res.send(resText);
    });
});

app.get("/allstudents",(req,res)=>{
    data_prep.allStudents().then((data)=>{
        res.send(data);
    })
})

app.get("/newStudent",(req,res)=>{
    res.sendFile(path.join(__dirname, "addStudent.html"));
})

app.post("/newStudent",(req,res)=>{
    const newData=req.body
    data_prep.addStudent(stringify(req.body)).then((data)=>{
        let resText=`<h2 style="color: red"> This student Information </h2>
        <p> Student ID: ${data.studId} </p>
        <p> Name:  ${data.name} </p>
        <p> Program: ${data.program} </p>
        <p> GPA: ${data.gpa} </p> 
        <a role="link" href="/">Go home</a>
    <br>
    <a role="link" href="/allstudents">Click to see All Students</a>
    <br>`;
        res.send(resText);
    });

})

app.get("/getStudent/:3",(req,res)=>{
    console.log(req.params);
    data_prep.getStudent(res.json(req.params)).then((data)=>{
        let resText=`<h2 style="color: red"> This student Information </h2>
        <p> Student ID: ${data.studId} </p>
        <p> Name:  ${data.name} </p>
        <p> Program: ${data.program} </p>
        <p> GPA: ${data.gpa} </p> 
        <a role="link" href="/">Go home</a>
    <br>
    <a role="link" href="/allstudents">Click to see All Students</a>
    <br>`;
        res.send(resText);
    })
})


app.get("*", (req, res)=>{
    res.status(404).send("Error 404: page not found.")
})

data_prep.prep().then((data)=>{
    //console.log(data);
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err)=>{
    console.log(err);
});