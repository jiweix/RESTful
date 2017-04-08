var express           =   require("express");
var app               =   express();
var bodyParser        =   require("body-parser");
var router            =   express.Router();
var application       =   require('./applications.js');
var expressValidator  =   require('express-validator');
var DB                =   require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use(expressValidator());
// validation function
function validateApplication(req, res, next) {
  req.checkBody('semester', 'invalid semester').notEmpty();
  req.checkBody('school', 'invalid school').notEmpty();
  req.checkBody('result', 'invlid result').notEmpty();
  req.checkBody('year', 'invalid year').notEmpty().isInt();
  req.checkBody('gpa', 'invalid gpa').notEmpty();
  req.checkBody('gre', 'invalid gre').notEmpty().isInt();
  req.checkBody('toefl', 'invalid toefl').notEmpty().isInt();
  var errors = req.validationErrors();
  if (errors) {
    var response = { errors: [] };
    errors.forEach(function(err) {
      response.errors.push(err.msg);
    });
    res.statusCode = 400;
    return res.json(response);
  }
  return next();
}

app.get("/",function(req,res){
    res.json({"API name" : "application info",
              "url" : "/applications"});
});
router.get('/', application.findAll);
router.get('/:id', application.findById);
router.post('/', validateApplication, application.addApplication);
router.put('/:id', validateApplication, application.updateApplication);
router.delete('/:id', application.deleteApplication);

app.use('/applications',router);

var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  DB.connect(DB.MODE_PRODUCTION, start_app);
}

function start_app() {
  console.log("DB connection OK!");
}

console.log(env);

app.listen(8080);
console.log("Listening to PORT 8080");
