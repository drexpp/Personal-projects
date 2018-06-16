/* EXPRESS SETUP */
const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()

app.use(flash())
app.use(session({
	cookie: {maxAge : 60000},
	secret: 'secret-cookie',
	resave: false,
	saveUninitialized: false
}))


app.set('views', __dirname + '/public');
app.set('view engine', 'ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const port = process.env.PORT || 8080
app.listen(port, () => console.log('App listen on port : '
	+ port))

/* PASSPORT SETUP */
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())


/* Calling routes here so they can use req.isAuthenticated()) */
app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => res.render('index', { message: req.flash('failedUser')}))
app.get('/success', (req, res) => {
	if(req.isAuthenticated())
		res.send('Welcome to the Authenticated part of the web!!')
	else{
		req.flash('failedUser', "You don't have access");
		res.redirect('/')
	}
})
app.get('/error', (req, res) => res.send('Error login'))
/* -------------------------------------------- */


passport.serializeUser(function(user, done){
	done(null, user.id)
})

passport.deserializeUser(function(id, done){
	UserDetails.findById(id, function(err, user) {
		done(err, user)
	})
})


/* MONGOOSE (DATABASE) SETUP */

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/MyDatabase')

const Schema = mongoose.Schema
const UserDetail = new Schema({
	username: String,
	password: String
})

//The first parameter is the name of the collection in the database.
//The second one is the reference to our Schema
//The third one is the name we’re assigning to the collection inside Mongoose.
const UserDetails = mongoose.model('userInfo', UserDetail,
	'userInfo')

/* PASSPORT-LOCAL AUTHENTICATION SETUP */

const LocalStrategy = require('passport-local').Strategy

passport.use('local', new LocalStrategy({
	passReqToCallback: true
},
	function(req, username, password, done){
	UserDetails.findOne({
		username: username 
	},
	function(err, user) {
		const flashMessage = req.flash('failedUser', 'Incorrect user/password')
		if(err){
			return done(err)	
		}
		if(!user){
			return done(null, false, flashMessage)
		}
		if(user.password != password) {
			return done(null, false, flashMessage)
		} 
		return done(null, user)
	})
}))

app.post('/', passport.authenticate('local', {failureRedirect: '/',
											  failureFlash: true}),
	(req, res) => res.redirect('success'))
