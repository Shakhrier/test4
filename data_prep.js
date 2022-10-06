var students = [];
var fs=require("fs");

module.exports.prep=function(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./students.json',(err,data)=>{
            if (err) reject("unable to read file");
            students = JSON.parse(data);
        })
    
        
    resolve("Data was read successfully");
        
    });
}

module.exports.cpa=function(){
    return new Promise((resolve,reject)=>{
        let CPA=[];
        students.forEach(element=>{
            if(element.program==="CPA"){
                CPA.push(element);
            }
        })

        if(CPA.length!=0){
            resolve(students);
        }
        else{
            reject("no results returned");
        }
    })
}

module.exports.highGPA=function(){
    return new Promise((resolve,reject)=>{
        let highest=0;
        let student=[];
        students.forEach(element => {
            if(element.gpa>highest){
                highest=element.gpa
                student=[];
                student.push(element);
            }
        });
        console.log(student);
        if(highest!=0){
            let text="<h1>Highest GPA:</h1><br>";
            text+='<p>Student ID:',student.studId ,'</p></br>';
            text+='<p>Name:', student.name,'</p><br>';
            text+='<p>Program:', student.program,'</p><br>';
            text+='<p>GPA:', student.gpa,'</p>';
            resolve(text);
        }
        else{
            reject("Failed finding the student with the highest GPA");
        }
    })
}

