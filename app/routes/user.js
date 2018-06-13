const express = require('express');
const router = express.Router();
const database = require('../config/dbconfig');
const bcrypt = require('bcrypt');
const session = require('express-session');

router.post('/', function(req, res) {
  const email = req.body.email;
  let password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if (!email || !validateEmail(email)) {
    res.status(400).send('Please specify correct email');

    return;
  }

  if (!firstName || firstName.length < 5) {
    res.status(400).send('Please enter firstName with at least 5 characters!');

    return;
  }

  if (!lastName || lastName.length < 5) {
    res.status(400).send('Please enter lastName with at least 5 characters!');

    return;
  }

  if (!password || password.length < 6) {
    res.status(400).send('Please enter a STRONG password!');

    return;
  }

  let sql = `SELECT *
           FROM User
           WHERE email = ?`;

  let sqlInsert = `INSERT INTO User (first_name, last_name, email, password) VALUES (?, ?, ?, ?) `;

  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      return err;
    }

    password = hash;

    database.get(sql, [email], (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Something went wrong');

        return;
      }

      if (!row) {
        database.run(sqlInsert, [firstName, lastName, email, password], function(err) {
          if (! err) {
            const userId = this.lastID;

            req.session.regenerate(function () {
              req.session.user = {
                'id': userId
              };

              res.status(200).send('Successful registration');
            });
          } else {
            res.status(500).send('Something went wrong');
          }
        });
      } else {
        res.status(400).send('User with this email already exists');
      }
    });
  });
});

router.get('/:userId', function(req, res) {
  // send data to DB - check if such user exists
  // hash password
  // return status codes for fail/success
  // return user object (without the password)
  const userId = parseInt(req.params.userId);

  if (userId <= 0) {
    res.status(400).send('Please enter a valid user id');

    return;
  }

  let sql = `SELECT *
           FROM User
           WHERE id = ?`;

  database.get(sql, [userId], (err, row) => {
    if (err) {
      res.status(500).send('Something went wrong');

      return;
    }

    if (!row) {
      res.status(400).send('No such user found');
      return;
    }

    res.send(JSON.stringify(row));
    return true;
  });
});

router.put('/:userId', function(req, res) {
  // hash password
  // return status codes for fail/success
  // return user object (without the password)
  const userId = parseInt(req.params.userId);

  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if (!email || !validateEmail(email)) {
    res.status(400).send('Please send a correct email');

    return;
  }

  if (!password) {
    res.status(400).send('Please send a password');

    return;
  }

  if (!firstName) {
    res.status(400).send('Please send firstName');

    return;
  }

  if (!lastName) {
    res.status(400).send('Please send lastName');

    return;
  }

  if (userId <= 0) {
    res.status(400).send('Please enter a valid user id');

    return;
  }

  let sql = `SELECT *
           FROM User
           WHERE id = ?`;

  let updateSql = `UPDATE User
            SET email = ?,
                password = ?,
                first_name = ?,
                last_name = ?
            WHERE id = ?`;

  database.get(sql, [userId], (err, row) => {
    if (err) {
      res.status(500).send('Something went wrong');

      return;
    }

    if (!row) {
      res.status(400).send('There is no such user');
    } else {
      database.run(updateSql, [email, password, firstName, lastName, userId], (err) => {
        if (err) {
          res.status(500).send('Something went wrong');

          return;
        }

        database.get(sql, [userId], (err, row) => {
          if (err) {
            console.error(err.message);
            res.status(500).send('Something went wrong');

            return;
          }

          res.send(JSON.stringify(row));
        });

      });
    }
  });
});

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
}

module.exports = router;
