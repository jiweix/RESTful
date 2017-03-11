var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var application =   require('./applications.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.get("/",function(req,res){
    res.json({"API name" : "application info",
              "url" : "/applications"});
});
app.get('/applications', application.findAll);
app.get('/applications/:id', application.findById);
app.post('/applications', application.addApplication);
app.put('/applications/:id', application.updateApplication);
app.delete('/applications/:id', application.deleteApplication);

app.use('/',router);

app.listen(8080);
console.log("Listening to PORT 8080");