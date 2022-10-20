var fs = require("fs");
const { resolve } = require("path");
var students=[];
exports.prep = ()=>{
   // console.log("Testing");
   return new Promise((resolve, reject)=>{
        fs.readFile("./students.json", (err, data)=>{
            if (err) {reject("unable to read file.");}
            students = JSON.parse(data);
           // console.log(students);
            resolve("File read success.");
        }); 
   });
};

exports.cpa = ()=>{
    return new Promise((resolve, reject)=>{
       let results = students.filter(student => student.program == "CPA");
       (results.length == 0)? reject("No CPA students."):resolve(results);
    });
}
exports.highGPA = ()=>{
    return new Promise((resolve, reject)=>{
        let high = 0;
        let highStudent;
        
        for (let i=0; i<students.length; i++)
        {
            //console.log(students[i].gpa, high);
            if (students[i].gpa > high)
            {
                high = students[i].gpa;
                highStudent = students[i];
            }
        }
        (highStudent) ? resolve(highStudent): reject("Failed finding student with highest GPA");
    }); 
};

exports.allStudents=()=>{
    return new Promise((resolve,reject)=>{
        if(students.length>0){
            resolve(students)
        }
        else{
            reject("no results returned")
        }
    });
};

exports.addStudent=(data)=>{
    return new Promise((resolve,reject)=>{
        let name = data.querySelector("#name");
        let id = data.querySelector("#studID");
        let program = data.querySelector("#programs");
        let gpa = data.querySelector("#GPA");
        let element = {"studId": parseInt(id),
        "name": name,
        "program": program,
        "gpa": parseFloat(gpa)
      }
      students.push(element);
      if(element.length>0){
        resolve(students);
      }
      else{
        reject("Error!");
      }
    });
};

exports.getStudent=(studID)=>{
    return new Promise((resolve,reject)=>{
        for(let i=0;i<students.length;i++){
            if(studID==students[i].studId){
                resolve(studID);
            }
            else{
                reject("Student was not found!");
            }
        }
    });
};