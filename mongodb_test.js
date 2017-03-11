var mongoose = require("mongoose");
//mongoose.connect('mongodb://user:user@localhost:27017/mongo');

mongoose.connect('mongodb://user1:yourpassword@localhost:27017/admin?authSource=admin', function(error) {
  console.log(error);
  // Check error in initial connection. There is no 2nd param to the callback.
});

console.log(mongoose.connection.readyState);
