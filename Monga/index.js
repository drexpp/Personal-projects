/* EXPRESS SETUP */
const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
var multer  = require('multer')
var upload = multer()
const app = express()

app.use(flash())
app.use(session({
	cookie: {maxAge : 6000000},
	secret: 'secret-cookie',
	resave: true,
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
app.get('/', (req, res) => 	res.render('login', { message: ""}));
app.get('/success', (req, res) => {
	if(req.isAuthenticated()){
		res.redirect('/userFiles')
	}else{
		res.render('login', { message: "You don't have access" })
	}
})
app.get('/error', (req, res) => res.send('Error login'))

app.get('/singup', (req, res) => res.render('singup',  { message: ""}))

app.post('/singup', (req, res) => {
	UserDetails.findOne({
		username: req.body.username 
	},
	function(err, user) {
		const flashMessage = 'Already registered';
		if(err){
			res.render('singup',  { message: flashMessage})	
		}
		if(!user){
			let newUser = new UserDetails({
				username: req.body.username,
				password: req.body.password
			});
			newUser.save();
			res.redirect('/');
		}else{
			res.render('singup',  { message: flashMessage})
		}
	})
});

app.get('/upload', (req, res) => {
	if(!req.isAuthenticated()){
		res.render('login', { message: "You don't have access" })
	}else
		res.render('upload_picture')
});
app.post('/upload', upload.single('file'), (req, res) => {
	if(req.file.originalname.includes(".jpeg") || req.file.originalname.includes(".jpg")){
		let newPicture = new userPictures({
			user_id: req.user.username,
			filename: req.file.originalname,
			img: {
				data: req.file.buffer,
				contentType: req.file.mimetype
			}
		})
		newPicture.save();
		res.redirect('/userFiles');
	}else{
		let newFile = new userFiles({
			user_id: req.user.username,
			filename: req.file.originalname,
			img: {
				data: req.file.buffer,
				contentType: req.file.mimetype
			}
		})
		newFile.save();
		res.redirect('/userFiles');
	}
});

app.get('/userFiles', async (req, res) => {
	if(!req.isAuthenticated()){
		res.redirect('/')
	}else{
		let pics = [];
		let fils = [];
		//Retriving pictures from database
		await userPictures.find({
			user_id: req.user.username 
		},(err, dbdata) => {
			if (err) throw (err);

			for (const pic of dbdata){
				console.log(pic.img.contentType)
				pics = [...pics,[(pic.img.data).toString('base64'), pic.img.contentType]]
			}
		});
		//Retriving files from database
		await userFiles.find({
			user_id: req.user.username 
		},(err, files) => {
			if (err) throw (err);

			for (const file of files){
				fils = [...fils, [(file.img.data).toString('base64'), file.img.contentType]]
			}
		});
		res.render('main', {pictures: pics, files: fils });
	}
})
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
mongoose.connect('mongodb://localhost:27017/mydb')

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

//Database schema for user pictures
const userPicture = new Schema({
	user_id: String,
	filename: String,
	img: { 
		data: Buffer, contentType: String 
	}
});
const userPictures = mongoose.model('userPictures',userPicture, 'userPictures');

//Database schema for user files
const userFile = new Schema({
	user_id: String,
	filename: String,
	img: { 
		data: Buffer, contentType: String 
	}
});
const userFiles = mongoose.model('userFiles',userFile, 'userFiles');
	
	
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
