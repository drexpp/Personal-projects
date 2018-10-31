/* EXPRESS SETUP */
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');


const app = express();

app.use(flash());
app.use(session({
  cookie: { maxAge: 6000000 },
  secret: 'secret-cookie',
  resave: true,
  saveUninitialized: false,
}));

app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`App listen on port : ${port}`);
  /* eslint-enable no-console */
});

/* -------------------------------------------------------- */

/* MONGOOSE (DATABASE) SETUP */
const mongoURI = 'mongodb://localhost:27017/mydb';
const conn = mongoose.createConnection(mongoURI);

let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => new Promise((resolve) => {
    const filename = file.originalname;
    const fileInfo = {
      filename,
      bucketName: 'uploads',
    };
    resolve(fileInfo);
  }),
});
const upload = multer({ storage });

const UserDetail = new mongoose.Schema({
  username: String,
  password: String,
});

/* The first parameter is the name of the collection in the database.
The second one is the reference to our Schema
The third one is the name we’re assigning to the collection inside Mongoose. */

const UserDetails = conn.model('userInfo', UserDetail, 'userInfo');

/* -------------------------------------------------------- */

/* PASSPORT-LOCAL AUTHENTICATION SETUP */
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => UserDetails.findById(id, (err, user) => done(err, user)));

passport.use('local', new LocalStrategy(
  {
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    UserDetails.findOne({
      username,
    },
    (err, user) => {
      const flashMessage = req.flash('message', 'Incorrect user/password');
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, flashMessage);
      }
      if (user.password !== password) {
        return done(null, false, flashMessage);
      }
      return done(null, user);
    });
  },
));

/* -------------------------------------------------------- */

/* ROUTES SETUP */
app.use(express.static(path.join(__dirname, '/public')));

// @Route GET /
// @desc Login view
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/userFiles');
  } else {
    res.render('login', { message: '' });
  }
});

// @Route POST /
// @desc Process of authentification
app.post('/', passport.authenticate('local', {
  failureRedirect: '/',
  failureFlash: true,
}),
(req, res) => res.redirect('success'));

// @Route GET /success
/* @desc If login was successful redirect to userFiles
  if it fails redirect to login */
app.get('/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/userFiles');
  } else {
    res.render('login', { message: "You don't have access" });
  }
});

// @Route GET /singup
// @desc Sing-up view
app.get('/singup', (req, res) => res.render('singup', { message: '' }));

// @Route POST /singup
// @desc Either registers a new user or returns to /singup
app.post('/singup', (req, res) => {
  UserDetails.findOne({
    username: req.body.username,
  },
  (err, user) => {
    const flashMessage = 'User already registered';
    if (err) {
      res.render('singup', { message: flashMessage });
    }
    if (!user) {
      const newUser = new UserDetails({
        username: req.body.username,
        password: req.body.password,
      });
      newUser.save();
      res.redirect('/');
    } else {
      res.render('singup', { message: flashMessage });
    }
  });
});

// @Route GET /upload
// @desc Loads upload view
app.get('/upload', (req, res) => {
  res.render('upload_picture');
});

// @Route POST /upload
// @desc Uploads file to DB
app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect('/userFiles');
});

// @Route GET /userFiles
// @desc Place of user files
app.get('/userFiles', (req, res) => {
  if (!req.isAuthenticated()) {
    res.render('login', { message: "You don't have access" });
  } else {
    res.render('main', {});
  }
});
