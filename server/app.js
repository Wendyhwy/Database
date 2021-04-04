
var bodyParser = require('./node_modules/body-parser')
const sql = require("mssql");
var app = require('express')();
var http = require('http') 
const crypto = require('crypto');
var cors = require('cors')
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

// var dbConfig = {
//   server: "csc2008database.database.windows.net",
//   database: "databaseproject",
//   port: 1433,
//   user:'database',
//   password:'Password123',
//   "synchronize": true,
// }

// var dbConfig = {
//   server: "mohserversg.database.windows.net",
//   database: "mohDb",
//   port: 1433,
//   user:'mohadmin',
//   password:'Password123',
//   "synchronize": true,

// }

var dbConfig = {
  server: "mohserversg.database.windows.net",
  database: "MOH",
  port: 1433,
  user:'mohadmin',
  password:'Password123',
  "synchronize": true,

}


module.exports = dbConfig;

let secret = '123456781234567812345678';
// let iv = crypto.randomBytes(16)
let iv = Buffer.from('qwertyuiopasdfgh','utf-8')
let key =  crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);

app.post("/api/profile", (req,res) => {
  const nric = req.body.nric
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const contactNo = req.body.contactNo
  const tokenId = req.body.tokenId
  const registeredAdd = req.body.registeredAdd
  const email = req.body.email



  // let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  // let encrypted = cipher.update(nric, 'utf-8', 'hex');

  // encrypted += cipher.final('hex')
  // console.log("encrypted",encrypted)
  // console.log("type of", typeof(encrypted))

  var contactQuery = "INSERT INTO [Contact] (contactNo, registeredAdd, email) VALUES ('" + contactNo + "','" + registeredAdd + "','" + email + "'); INSERT INTO [Profile] (nric, firstName, lastName,contactNo, tokenId) VALUES ('" + tokenId + "','" + firstName + "','" + lastName + "',(SELECT contactNo from [CONTACT] WHERE contactNo = '" + contactNo + "'),'" + tokenId + "'"

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
})


app.get("/api/profile", function(req, res){



  var query = "SELECT nric, firstName , lastName, tokenId, [Profile].contactNo, email, registeredAdd FROM [Profile],[Contact] WHERE [Profile].contactNo = [Contact].contactNo";
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
            //   var obj = {
            //     table: []
            //  };

            //   (response.recordset).map((row) => {

            //     let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            //     let decrypted = decipher.update(row.nric, 'hex', 'utf-8')
            //     decrypted += decipher.final('utf-8')
            //     obj.table.push({"nric":decrypted, "firstName":row.firstName, "lastName":row.lastName,"tokenId":row.tokenId,"contactId":row.contactId,"email":row.email,"registeredAdd":row.registeredAdd})

            //   })
            //   console.log(obj)
            //   res.send(obj)
            res.send(response)
            }
         
        });
      }
  });  
});

app.get("/api/other", function(req, res){
  const tokenId = req.query.tokenId

  var query = "SELECT DISTINCT nric, firstName , lastName, tokenId,[Profile].contactNo, email, registeredAdd FROM [Profile], [Contact], [TransactionDetails] WHERE [Profile].contactNo = [Contact].contactNo and [Profile].tokenId IN (SELECT otherTokenId FROM [TransactionDetails] WHERE [TransactionDetails].userTokenId = '" + tokenId + "')";
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
              res.send(response);
            }
         
        });
      }
  });  
});



app.listen(3001, () => {
    console.log("hello")
});




