var app = require('./index').app;
var DB = require('./db');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let assert = chai.assert;

chai.use(chaiHttp);

const TEST_APP_1 = {
  "semester": "summer",
  "year": 2012,
  "gpa": 3.5,
  "gre": 320,
  "toefl": 101,
  "school": "NYU",
  "result": "yes"
};

const TEST_APP_2 = {
  "semester": "spring",
  "year": 2015,
  "gpa": 4.0,
  "gre": 340,
  "toefl": 120,
  "school": "Yale",
  "result": "yes"
}

const TEST_APP_INVALID = {
  "semester": "spring",
  "year": "2015y",
  "gpa": 4.0,
  "gre": 340,
  "toefl": 120,
  "school": "Yale",
  "result": "yes"
}

// add one record to database before test, and save the _id for testing.
var _id;

describe('CS Applications API Tests', function() {

  before(function(done) {
    DB.connect(DB.MODE_TEST, done);
  })

  beforeEach(function(done) {
    DB.drop(function() {
      chai.request('http://localhost:8080')
          .post('/applications')
          .send(TEST_APP_1)
          .end((err, res) => {
            _id = res.body._id;
            done();
          });
    });
  })

  it('it should GET all the applications', (done) => {
    chai.request('http://localhost:8080')
        .get('/applications')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
    });
  });

  it('it should GET one application by _id', (done) => {
    chai.request('http://localhost:8080')
        .get('/applications/' + _id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('year').eql(2012);
          res.body.should.have.property('school').eql("NYU");
          res.body.should.have.property('result').eql("yes");
          res.body.should.have.property('gre').eql(320);
          done();
    });
  });

  it('it should GET 404 error with invalid id', (done) => {
    chai.request('http://localhost:8080')
        .get('/applications' + "12345566666")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          //console.log(res.body);
          done();
    });
  });

  it('it should PUT one application, and change the information in database', (done) => {
    chai.request('http://localhost:8080')
        .put('/applications/' + _id)
        .send(TEST_APP_2)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('year').eql(2015);
          res.body.should.have.property('school').eql("Yale");
          res.body.should.have.property('result').eql("yes");
          res.body.should.have.property('gre').eql(340);
          chai.request('http://localhost:8080')
              .get('/applications/' + _id)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('year').eql(2015);
                res.body.should.have.property('school').eql("Yale");
                res.body.should.have.property('result').eql("yes");
                res.body.should.have.property('gre').eql(340);
                done();
          });
    });
  });

  it('it should PUT one application with invalid id and get 404 error', (done) => {
    chai.request('http://localhost:8080')
        .put('/applications/' + "12345566666")
        .send(TEST_APP_2)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          //console.log(err);
          //console.log(res.body);
          done();
    });
  });

  it('it should PUT one invalid application format and get 400 error', (done) => {
    chai.request('http://localhost:8080')
        .put('/applications/' + _id)
        .send(TEST_APP_INVALID)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
    });
  });

  it('it should POST one application, and GET it back by _id', (done) => {
    var id;
    chai.request('http://localhost:8080')
        .post('/applications')
        .send(TEST_APP_1)
        .end((err, res) => {
          id = res.body._id;
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('year').eql(2012);
          chai.request('http://localhost:8080')
              .get('/applications/' + id)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('year').eql(2012);
                res.body.should.have.property('school').eql("NYU");
                res.body.should.have.property('result').eql("yes");
                res.body.should.have.property('gre').eql(320);
                done();
          });
    });
  });  

  it('it should POST one invalid application format and get 400 error', (done) => {
    chai.request('http://localhost:8080')
        .post('/applications')
        .send(TEST_APP_INVALID)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
    });
  });
});
