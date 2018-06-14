const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const database = require('./config/dbconfig');
const bcrypt = require('bcrypt');
const cors = require('cors');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const recipeRouter = require('./routes/recipe');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const categoriesRouter = require('./routes/categories');

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'work',
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (req.session.user && req.session.user.id) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/login', function (req, res, next) {
  console.log('req: ', req.body.email);
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !validateEmail(email)) {
    res.status(400).send('Please specify correct email');

    return;
  }

  if (!password || password.length < 6) {
    res.status(400).send('Please enter a STRONG password');

    return;
  }

  let sql = `SELECT *
           FROM User
           WHERE email = ?`;

  database.get(sql, [email], (err, row) => {
    if (err) {
      res.status(500).send('Something went wrong');
      return;
    }

    if (!row) {
      res.status(400).send('No such user found');
      return;
    }

    bcrypt.compare(password, row.password, function(err, result) {
      if (err) {
        res.status(500).send('Something went wrong');
        return;
      }

      if (result) {
        // Passwords match
        const userId = row.id;

        req.session.regenerate(function () {
          req.session.user = {
            'id': userId
          };

          res.status(200).send('Successful login');
        });
      } else {
        // Passwords don't match
        res.status(400).send('No such user found');
      }
    });
  });
});

app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);
app.use('/categories', categoriesRouter);
app.use('/recipe', sessionChecker, recipeRouter);

app.use('/logout', function (req, res) {
  if (req.cookies && req.session.user) {
    req.session.destroy();
    res.status(200).send('User logged out');
  } else {
    res.status(500).send('Something went wrong');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
}

module.exports = app;
