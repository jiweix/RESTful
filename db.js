const mongodb = require('mongodb');
const key_str = process.env.MONGO_ENV || require('./mongodb/key.json');
const dummy_data = require('./dummy.json');
var async = require('async');

const user = key_str.mongoUser;
const pass = key_str.mongoPass;
const host = key_str.mongoHost;
const port = key_str.mongoPort;
const db = key_str.mongoDatabase;

var test_user;
var test_pass;
var test_host;
var test_port;
var test_db;

if (!process.env.MONGO_ENV) {
  const test_key_str = require('./mongodb/test_key.json');
   test_user = test_key_str.mongoUser;
   test_pass = test_key_str.mongoPass;
   test_host = test_key_str.mongoHost;
   test_port = test_key_str.mongoPort;
   test_db = test_key_str.mongoDatabase;
} else {
   test_user = process.env.MONGO_USER;
   test_pass = process.env.MONGO_PASS;
   test_host = process.env.MONGO_HOST;
   test_port = process.env.MONGO_PORT;
   test_db = process.env.MONGO_DATABASE;
}

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

exports.connect = function(mode, done) {
  if (state.db) return;

  var uri = mode === exports.MODE_TEST ? TEST_URI : PRODUCTION_URI
  test_mode = mode === exports.MODE_TEST;
  mongodb.MongoClient.connect(uri, function(err, db) {
    if (err) return done(err)
    state.db = db
    state.mode = mode
    console.log("Connected correctly to server");
    done();
  })
}

exports.getDB = function() {
  return state.db
}

exports.drop = function(done) {
  if (!state.db) return done()
  var collection  = state.db.collection("cs_application");
  collection.drop(function(err, reply) {
    done();
  });
}
