const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../test.db', (err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log('Connected to SQlite database.');
});

// close the database connection
let close = function() {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
};

module.exports = db;