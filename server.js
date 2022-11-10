var express = require("express");
var app = express();
var data_prep = require("./data_prep.js");
const path = require ("path");
var HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() 
{
    console.log("Express http server listening on " + HTTP_PORT);
}

app.get("/",(req,res)=>{
    let resText = "<h2>Declaration (text size in heading 2): </h2> ";
     student Id, e.g.,<p>
                <p>http://localhost:8080/student/3<p>`
                
    res.send(resText);
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

app.get('/allStudents', function (req, res) {
  data_prep.allStudents().then((data) => {
      res.json(data);});
});

app.get("/addstudent", (req, res)=>{
  //send the html view with the form to the client
 // res.sendFile(path.join(__dirname, "/views/registerUser_file.html"));
  res.sendFile(path.join(__dirname, "/views/addStudent.html"));
});

app.post("/addstudent", (req,res)=>{
     const formData = req.body;
     const dataReceived = " Form data: " + JSON.stringify(formData) + "<br>" ;
                          
      res.send(dataReceived);
  });
  app.get('/student/:id', function (request, res) {
    console.log(request.params);
    res.json(request.params); // return parameter obj: {"uName":"Jack","uid":"101"}
    
  });

app.get("*", (req, res)=>{
    res.status(404).send("Error 404: page not found.")
})

data_prep.prep().then((data)=>{
    //console.log(data);
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err)=>{
    console.log(err);
});
