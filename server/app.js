
var bodyParser = require('./node_modules/body-parser')
const sql = require("mssql");
var app = require('express')();
var http = require('http') 
var cors = require('cors')
// var bodyParser = require("body-parser");
app.use(cors())


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var dbConfig = {
    server: "LAPTOP-DJ1HQ97V",
    database: "DatabaseMod",
    port: 1433,
    user:'test',
    password:'test',
    "synchronize": true,
}

module.exports = dbConfig;

// function getEmp() {
//     var conn = new sql.ConnectionPool(dbConfig);
//     var req = new sql.Request(conn);

//     conn.connect(function (err) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         req.query("SELECT * FROM Users", function(err, recordset) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(recordset);
//             }
//             conn.close();
//         });
//     })
// }


// function getEmp() {
//     var conn = new sql.ConnectionPool(dbConfig);

//     conn.connect(function (err) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//     })
// }

// getEmp();

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




//POST API
// app.post("/api/users", function(req , res){
//   var dbConn = new sql.Connection(dbConfig);
//   dbConn.connect().then(function () {
//   var transaction = new sql.Transaction(dbConn);
//   transaction.begin().then(function () {
//     var request = new sql.Request(transaction);
//           request.query("INSERT INTO [Users] (id,firstName,lastName,email,contactNo) VALUES (2, 'name', 'name', 'name@gmail.com', '98765432')")
//     .then(function 	() {
//       transaction.commit().then(function (resp) {
//                   console.log(resp);
//                   dbConn.close();
//               }).catch(function (err) {
//                   console.log("Error in Transaction Commit " + err);
//                   dbConn.close();
//               });
//     }).catch(function (err) {
//               console.log("Error in Transaction Begin " + err);
//               dbConn.close();
//           })
//   }).catch(function (err) {
//           console.log(err);
//           dbConn.close();
//       }).catch(function (err) {
//       //12.
//       console.log(err);
//   });
// });
// });

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



//app.post("/api/users", function(req , res){
    // var query = "INSERT INTO [Users] (id,firstName,lastName,email,contactNo) VALUES (2, 'name', 'name', 'name@gmail.com', '98765432');"
    // // executeQuery (res, query);
    // sql.connect(dbConfig, function (err) {
    //   console.log("connectedfsafasdfsad")
    //     if (err) {   
    //         console.log("Error while connecting database :- " + err);
    //         res.send(err);
    //     }
    //     else {
    //       // create Request object
    //       var request = new sql.Request();
    //       // query to the database
          
    //       request.query(query, function (err, response) {
    //           console.log(response)
    //         if (err) {
    //           console.log("Error while querying database :- " + err);
    //           res.send(err);
            
    //           }
    //           else {
    //             console.log(response);
    //             res.send(response);
    //           }
           
    //       });
    //     }
    // });  
//});

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




// http.createServer(app).listen(3001, () => {
//     console.log("hello")
// });

// http.createServer(app).get((res,req) => {
//     res.send("hello world")
// });


