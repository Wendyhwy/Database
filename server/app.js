
var bodyParser = require('./node_modules/body-parser')
const sql = require("mssql");
var app = require('express')();
var http = require('http') 
var cors = require('cors')
// var bodyParser = require("body-parser");
app.use(cors())


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// var dbConfig = {
//     server: "LAPTOP-DJ1HQ97V",
//     database: "DatabaseMod",
//     port: 1433,
//     user:'test',
//     password:'test',
//     "synchronize": true,
// }

var dbConfig = {
  server: "csc2008database.database.windows.net",
  database: "databaseproject",
  port: 1433,
  user:'database',
  password:'Password123',
  "synchronize": true,
}

module.exports = dbConfig;


//Function to connect to database and execute query

var executeQuery = function(res, query){             
    sql.connect(dbConfig, function (err) {
        if (err) {   
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
          // create Request object
          var request = new sql.Request();
          // query to the database
          request.query(query, function (err, response) {
              console.log(response)
            if (err) {
              console.log("Error while querying database :- " + err);
              res.send(err);
              }
              else {
                console.log(response);
                res.send(response);
              }
           
          });
        }
    });           
}


//GET ALL ACTIVE USERS FOR PATHWAYS


app.post("/api/users", (req,res) => {
  const id = req.body.id
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const contactNo = req.body.contactNo
   var query = "INSERT INTO [Users] (id,firstName,lastName,email,contactNo) VALUES ('" + id + "','" + firstName + "','" + lastName + "','" + email + "','" + contactNo + "')"
    // executeQuery (res, query);
    sql.connect(dbConfig, function (err) {
      console.log("connectedfsafasdfsad")
        if (err) {   
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
          // create Request object
          var request = new sql.Request();
          // query to the database
    
          
          request.query(query,function (err, response) {
              console.log(response)
            if (err) {
              console.log("Error while querying database :- " + err);
              res.send(err);
            
              }
              else {
                console.log(response);
                res.send(response);
              }
           
          });
        }
    });  
})



app.get("/api/users", function(req, res){
    var query = "SELECT * FROM [Users]";
    // executeQuery(res, query);
    sql.connect(dbConfig, function (err) {

        if (err) {   
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
          
          // create Request object
          var request = new sql.Request();
          // query to the database
          request.query(query, function (err, response) {
              console.log(response)
            if (err) {
              console.log("Error while querying database :- " + err);
              res.send(err);
              }
              else {
                res.send(response);

              }
           
          });
        }
    });  
});

app.listen(3001, () => {
    console.log("hello")
});




