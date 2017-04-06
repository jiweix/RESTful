var DB = require('./db');
var ObjectID = require('mongodb').ObjectID;
var cs_application_db;

const NOT_FOUND_MESSAGE = { error: "Resource Not Exists" };

exports.findById = function(req, res) {
  cs_application_db = DB.getDB();
  res.contentType('application/json');
  var id = req.params.id;
  console.log('Retrieving application: ' + id);
  cs_application_db.collection('cs_application', function(err, collection) {
    if (!collection) {
      console.log("collection is null");
    }
    collection.findOne({ '_id': new ObjectID(id) }, function(err, item) {
      if (!item) {
        res.status(404).send(NOT_FOUND_MESSAGE);
      } else {
        res.status(200).send(item);
      }
    });
  });
};

exports.findAll = function (req, res) {
  cs_application_db = DB.getDB();
  res.contentType('application/json');
  cs_application_db.collection('cs_application', function (err, collection) {
    collection.find().toArray(function (err, items) {
      res.status(200).send(items);
    });
  });
};

exports.addApplication = function (req, res) {
  cs_application_db = DB.getDB();
  res.contentType('application/json');
  var application = req.body;
  console.log('Adding application: ' + JSON.stringify(application));
  cs_application_db.collection('cs_application', function (err, collection) {
    collection.insert(application, { safe: true }, function (err, result) {
      if (err) {
        res.status(400).send({ 'error': 'An error has occurred' });
      } else {
        console.log('Success: ' + JSON.stringify(result["ops"][0]));
        res.status(201).send(result["ops"][0]);
      }
    });
  });
}

exports.updateApplication = function (req, res) {
  cs_application_db = DB.getDB();
  res.contentType('application/json');
  var id = req.params.id;
  var application = req.body;
  console.log('Updating application: ' + id);
  console.log(JSON.stringify(application));
  cs_application_db.collection('cs_application', function (err, collection) {
    collection.update({ '_id': new ObjectID(id) }, application, { safe: true }, function (err, result) {
      if (err) {
        console.log('Error updating application: ' + err);
        res.status(400).send({ 'error': 'An error has occurred' });
      } else {
        console.log('' + result + ' document(s) updated');
        res.status(200).send(application);
      }
    });
  });
}

exports.deleteApplication = function (req, res) {
  cs_application_db = DB.getDB();
  var id = req.params.id;
  console.log('Deleting application: ' + id);
  cs_application_db.collection('cs_application', function (err, collection) {
    collection.remove({ '_id': new ObjectID(id) }, { safe: true }, function (err, result) {
      if (err) {
        res.send({ 'error': 'An error has occurred - ' + err });
      } else {
        console.log('' + result + ' document(s) deleted');
        res.status(204).send();
      }
    });
  });
}
