const express = require('express');
const router = express.Router();
const database = require('../config/dbconfig');

router.get('/', function(req, res) {
  let sql = `SELECT *
           FROM Category`;

  database.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send('Something went wrong');

      return;
    }

    res.send(JSON.stringify({rows: JSON.stringify(rows), length: rows.length}));
    return true;
  });
});

module.exports = router;
