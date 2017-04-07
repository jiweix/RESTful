var app = require('./index').app;
var DB = require('./db');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

const TEST_APP_1 = {
  "semester": "summer",
  "year": "2012",
  "gpa": "3.5",
  "gre": "320",
  "toefl": "101",
  "school": "NYU",
  "result": "yes"
};

const TEST_APP_2 = {
  "semester": "spring",
  "year": "2015",
  "gpa": "4.0",
  "gre": "340",
  "toefl": "120",
  "school": "Yale",
  "result": "yes"
}

describe('CS Applications API Tests', function() {

  before(function(done) {
    DB.connect(DB.MODE_TEST, done);
  })

  beforeEach(function(done) {
    DB.drop(done);
  })

  it('it should GET all the applications', (done) => {
    chai.request('http://localhost:8080')
        .get('/applications')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
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
          res.body.should.have.property('year').eql("2012");
          chai.request('http://localhost:8080')
              .get('/applications/' + id)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('year').eql("2012");
                res.body.should.have.property('school').eql("NYU");
                res.body.should.have.property('result').eql("yes");
                res.body.should.have.property('gre').eql("320");
                done();
          });
    });
  });

  it('it should GET 404 error with invalid id', (done) => {
    chai.request('http://localhost:8080')
        .get('/applications' + "12345566666")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
    });
  });

});
