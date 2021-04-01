
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


//GET PROFILE
app.post("/api/profile", (req,res) => {
  const nric = req.body.nric
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const contactNo = req.body.contactNo
  const tokenId = req.body.tokenId
  const registeredAdd = req.body.registeredAdd
  const email = req.body.email
  var contactQuery = "INSERT INTO [Contact] (contactNo, registeredAdd, email) VALUES ('" + contactNo + "','" + registeredAdd + "','" + email + "'); INSERT INTO [Profile] (nric, firstName, lastName,contactId, tokenId) VALUES ('" + nric + "','" + firstName + "','" + lastName + "',(SELECT contactNo from [CONTACT] WHERE contactNo = '" + contactNo + "'),(SELECT tokenId from [Token] WHERE tokenId = '" + tokenId + "'))"
  // , 'SELECT "+tokenId+" WHERE "+tokenId+" = 1')
  // var profileQuery = "INSERT INTO [Profile] (nric, firstName, lastName,contactId, tokenId) VALUES ('" + nric + "','" + firstName + "','" + lastName + "','SELECT contactId WHERE contactId = "+contactNo+"', 'SELECT "+tokenId+" WHERE "+tokenId+" = 1')"
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
    
          
          request.query(contactQuery,function (err, response) {
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


app.get("/api/profile", function(req, res){

  var query = "SELECT nric, firstName , lastName, tokenId,contactId, email, registeredAdd FROM [Profile],[Contact] WHERE [Profile].contactId = [Contact].contactNo";
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

app.get("/api/other", function(req, res){
  const tokenId = req.query.tokenId

  var query = "SELECT nric, firstName , lastName, tokenId,contactId, email, registeredAdd FROM [Profile], [Contact], [TransactionDetails] WHERE [Profile].contactId = [Contact].contactNo and [Profile].tokenId = (SELECT otherTokenId FROM [TransactionDetails] WHERE [TransactionDetails].userTokenId = '" + tokenId + "')";
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




