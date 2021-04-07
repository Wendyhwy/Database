
var bodyParser = require('./node_modules/body-parser')
const sql = require("mssql");
var app = require('express')();
var http = require('http') 
const crypto = require('crypto');
var cors = require('cors')
app.use(cors())


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var dbConfig = {
  server: "nuhsserversg.database.windows.net",
  database: "nuhsDB",
  port: 1433,
  user:'nuhsdbadmin',
  password:'Password123',
  "synchronize": true,

}


module.exports = dbConfig;




app.get("/api/nuhs", function(req, res){


    var query = "SELECT hospitalName, totalNumofCases , totalConfirmedCases, totalNewlyReportedCases FROM [covidCases],[hospitalInfo] WHERE [covidCases].hospitalId = [hospitalInfo].hospitalId";
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
            if (err) {
              console.log("Error while querying database :- " + err);
              res.send(err);
              }
              else {
       
              res.send(response)
              }
           
          });
        }
    });  
  });


app.listen(3002, () => {
    console.log("hellowho")
});




