// var records = [
//   {
//     id: 1,
//     username: "laxman",
//     password: "laxman",
//     displayName: "laxman",
//     emails: [{ value: "laxmanbhusal612@gmail.com" }]
//   },
//   {
//     id: 2,
//     username: "aakash",
//     password: "birthday",
//     displayName: "Aakash Gajurel",
//     emails: [{ value: "jill@example.com" }]
//   }
// ];

// exports.findById = function(id, cb) {
//   process.nextTick(function() {
//     var idx = id - 1;
//     if (records[idx]) {
//       cb(null, records[idx]);
//     } else {
//       cb(new Error("User " + id + " does not exist"));
//     }
//   });
// };

// exports.findByUsername = function(username, cb) {
//   process.nextTick(function() {
//     for (var i = 0, len = records.length; i < len; i++) {
//       var record = records[i];
//       if (record.username === username) {
//         return cb(null, record);
//       }
//     }
//     return cb(null, null);
//   });
// };
const mongoose = require("mongoose")
var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String
});

module.exports = mongoose.model('users', userSchema);

