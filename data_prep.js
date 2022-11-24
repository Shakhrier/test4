const { stdin } = require('process');
const Sequelize = require('sequelize');
var sequelize = new Sequelize('gherwrnv', 'gherwrnv', 'f_YEvXAYVkQZ8IdzXJN48YJ92qhEy9nr', {
 host: 'peanut.db.elephantsql.com',
 dialect: 'postgres',
 port: 5432,
 dialectOptions: {
 ssl: true
},
query:{raw: true} // update here, you. Need this
});

sequelize
    .authenticate()
    .then(function() {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

var Student=sequelize.define('Student',{
    studId:{
        type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
    },
    name: Sequelize.STRING,
    program:Sequelize.STRING,
    gpa:Sequelize.FLOAT
})

exports.prep = ()=>{

   return new Promise((resolve, reject)=>{

    sequelize.sync()
    .then(function(){
        resolve("Success!");
    })
    .catch(function(){
        reject("unable to sync the database");
    })

   });

};



exports.bsd = ()=>{

    return new Promise((resolve, reject)=>{

    });

}





exports.cpa = ()=>{

    return new Promise((resolve, reject)=>{
        Student.findAll({
            where:{
                program:'CPA'
            }

        })
        .then(
            resolve(Student.findAll({where:{program:'CPA'}}))
        )
        .catch(
            reject("no results found")
        )
    });

}

exports.highGPA = ()=>{

    return new Promise((resolve, reject)=>{
        Student.findAll({
            attributes:[
                [sequelize.fn('max', sequelize.col('gpa')), 'gpa']],
          })
        .then(
            resolve(Student.findAll({
                attributes:
                [
                    [sequelize.fn('max', sequelize.col('gpa')), 'gpa']]
              }))
        )
        .catch(
            reject("no results returned")
        )
    }); 

};



exports.lowGPA = ()=>{

    return new Promise((resolve, reject)=>{

        let low = 4.0;

        let lowStudent;

        for (let i=0; i<students.length; i++)

        {

            if (students[i].gpa < low)

            {

                low = students[i].gpa;

                lowStudent = students[i];

            }

        }

        resolve(lowStudent);

    }); 

};



exports.allStudents =()=>{

    return new Promise((resolve, reject)=>{

        Student.findAll()
        .then(
            resolve(Student.findAll())
        )
        .catch(
            reject("no results found")
        )

    })

}



exports.addStudent= (stud)=>{

    return new Promise((resolve, reject)=>{
        
        for(let i in stud){
            if(stud[i]===""){
                stud[i]=null;
                console.log(stud[i]);
            }
        }

        Student.create(stud)
        .then(
            resolve(Student.findAll())
        )
        .catch(
            reject("unable to create student")
        )

    });

}



exports.getStudent = (studId)=>{

    return new Promise((resolve, reject)=>{

        students.forEach(function(student){

            if (student.studId == studId)

                resolve(student);

        });

        reject("No result found!");

    })

}

