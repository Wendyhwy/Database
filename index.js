const express = require('express')
const app = express();

app.get("/", function (req,res){
	res.send("WORKING!!");
});

app.listen(process.env.PORT || 3000); //for herouku 