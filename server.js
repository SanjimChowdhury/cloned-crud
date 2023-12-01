const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
//const MongoClient = require('mongodb').MongoClient //up
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('express-flash')
const connectDB = require('./config/db')
//let connectionString = 'mongodb+srv://sanjimchowdhury:LNjEyRdnXRQTenkm@cluster0.xkh0dje.mongodb.net/star-wars-quote?retryWrites=true&w=majority'

const todosController = require('./controllers/todos')
const Character = require('./models/Character');
//load config
dotenv.config({ path: './config/config.env' })


// Passport config
require('./config/passport')(passport)
//database connect
//new 
connectDB()


//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
//session
app.use(
  session({
    secret: 'keyboard-cat',
    resave: false,
    saveUninitialized: false,
  })
);



//Routes
app.use('/',require('./routes/log'))
app.use('/quotes',require('./routes/Rquotes'))
app.use('/love/:id',require('./routes/Rquotes'))
/* app.post('/quotes', (req, res) => {
    Character
        .create(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
}) */

//passport middleware
app.use(passport.initialize());
app.use(passport.session())

app.use(flash())

app.put('/quotes', (req, res) => {
    Character.findOneAndUpdate(
        { name: 'Yoda' },
        {
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        },
        {
            upsert: true
        }
    )
        .then(result => {
            res.json('success')
        })
        .catch(error => console.error(error))
})

app.delete('/deleteTodo', todosController.deleteTodo)
//add port
app.listen(3500, function () {
    console.log('listening on 3000')
})


