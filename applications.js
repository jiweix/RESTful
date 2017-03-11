const mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
const key_str = require('./mongodb/key.json');

const user = key_str.mongoUser;
const pass = key_str.mongoPass;
const host = key_str.mongoHost;
const port = key_str.mongoPort;
const db = key_str.mongoDatabase;

// [START client]
let uri = `mongodb://${user}:${pass}@${host}:${port}/${db}`;

console.log(uri);

// collection 
var cs_application_db;

mongodb.MongoClient.connect(uri, (err, db) => {
  if (err) {
    throw err;
  }
  cs_application_db = db;
  console.log("Connected correctly to server");
});

exports.findById = function(req, res) {
  res.contentType('application/json');
  var id = req.params.id;
  console.log('Retrieving application: ' + id);
  cs_application_db.collection('cs_application', function(err, collection) {
    if (!collection) {
      console.log("collection is null");
    }
    collection.findOne({ '_id': new ObjectID(id) }, function(err, item) {
      res.send(item);
    });
  });
};

exports.findAll = function (req, res) {
  res.contentType('application/json');
  cs_application_db.collection('cs_application', function (err, collection) {
    collection.find().toArray(function (err, items) {
      res.send(items);
    });
  });
};

exports.addApplication = function (req, res) {
  res.contentType('application/json');
  var application = req.body;
  console.log('Adding application: ' + JSON.stringify(application));
  cs_application_db.collection('cs_application', function (err, collection) {
    collection.insert(application, { safe: true }, function (err, result) {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
}

exports.updateApplication = function (req, res) {
  res.contentType('application/json');
  var id = req.params.id;
  var application = req.body;
  console.log('Updating application: ' + id);
  console.log(JSON.stringify(application));
  cs_application_db.collection('cs_application', function (err, collection) {
    collection.update({ '_id': new ObjectID(id) }, application, { safe: true }, function (err, result) {
      if (err) {
        console.log('Error updating application: ' + err);
        res.send({ 'error': 'An error has occurred' });
      } else {
        console.log('' + result + ' document(s) updated');
        res.send(application);
      }
    });
  });
}

exports.deleteApplication = function (req, res) {
  res.contentType('application/json');
  var id = req.params.id;
  console.log('Deleting application: ' + id);
  cs_application_db.collection('cs_application', function (err, collection) {
    collection.remove({ '_id': new ObjectID(id) }, { safe: true }, function (err, result) {
      if (err) {
        res.send({ 'error': 'An error has occurred - ' + err });
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(req.body);
      }
    });
  });
}