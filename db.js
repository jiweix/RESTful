const mongodb = require('mongodb');
const key_str = require('./mongodb/key.json');
const dummy_data = require('./dummy.json');

const user = key_str.mongoUser;
const pass = key_str.mongoPass;
const host = key_str.mongoHost;
const port = key_str.mongoPort;
const db = key_str.mongoDatabase;

const test_key_str = require('./mongodb/test_key.json');

const test_user = test_key_str.mongoUser;
const test_pass = test_key_str.mongoPass;
const test_host = test_key_str.mongoHost;
const test_port = test_key_str.mongoPort;
const test_db = test_key_str.mongoDatabase;

// [START client]
var PRODUCTION_URI = `mongodb://${user}:${pass}@${host}:${port}/${db}`;
var TEST_URI = `mongodb://${test_user}:${test_pass}@${test_host}:${test_port}/${test_db}`;

var state = {
  db: null,
  mode: null,
}

var test_mode;

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

exports.connect = function(mode) {
  if (state.db) return;

  var uri = mode === exports.MODE_TEST ? TEST_URI : PRODUCTION_URI
  test_mode = mode === exports.MODE_TEST;
  mongodb.MongoClient.connect(uri, function(err, db) {
    if (err) return done(err)
    state.db = db
    state.mode = mode
    console.log("Connected correctly to server");
  })
}

exports.getDB = function() {
  return state.db
}

// The following functions are for test mode ONLY!!!!
exports.dropCollection = function() {
  if (test_mode) {
    state.db.dropCollection("cs_application");
  }
}

exports.loadDummyData = function() {
  if (test_mode) {
    state.db.createCollection("cs_application", function(err, collection){
      for (var dummy in dummy_data) {
        collection.insert(dummy, { safe: true }, function (err, result) {
          if (err) {
            console.log("Err");
          }
        });
      }
    });
  }
}
