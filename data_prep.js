var students = [];
var fs=require("fs");

module.exports.initialize=function(){
    return new Promise((resolve,reject)=>{
        fs.readFile('/students.json',(err,data)=>{
            if (err) reject("unable to read file");
            students = JSON.parse(data);
        })
    
        
    resolve("Data was read successfully");
        
    });
}

module.exports.cpa()=function(){
    return new Promise((resolve,reject)=>{
        if(students.length!=0){
            resolve(students);
        }
        else{
            reject("no results returned");
        }
    })
}

module.exports.highGPA()=function(){
    return new Promise((resolve,reject)=>{
        let highest=0;
        let student=[];
        students.forEach(element => {
            if(element.gpa>highest){
                highest=element.gpa
                student = element;
            }
        });
        if(highest!=0){
            resolve(student);
        }
        else{
            reject("Failed finding the student with the highest GPA");
        }
    })
}
