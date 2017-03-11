
'use strict';

const mongodb = require('mongodb');
const http = require('http');

const key_str = require('./mongodb/key.json');

const user = key_str.mongoUser;
const pass = key_str.mongoPass;
const host = key_str.mongoHost;
const port = key_str.mongoPort;
const db = key_str.mongoDatabase;

// [START client]
let uri = `mongodb://${user}:${pass}@${host}:${port}/${db}`;

console.log(uri);

mongodb.MongoClient.connect(uri, (err, db) => {
  if (err) {
    throw err;
  }

  // Create a simple little server.
  http.createServer((req, res) => {
    // Track every IP that has visited this site
    const collection = db.collection('IPs');

    const ip = {
      address: req.connection.remoteAddress
    };

    collection.insert(ip, (err) => {
      if (err) {
        throw err;
      }

      // push out a range
      let iplist = '';
      collection.find().toArray((err, data) => {
        if (err) {
          throw err;
        }
        data.forEach((ip) => {
          iplist += `${ip.address}; `;
        });

        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.write('IPs:\n');
        res.end(iplist);
      });
    });
  }).listen(process.env.PORT || 8080, () => {
    console.log('started web process');
  });
});