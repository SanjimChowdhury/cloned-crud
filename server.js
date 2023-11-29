const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
//const MongoClient = require('mongodb').MongoClient //up
const connectDB = require('./config/db')
const mongoose = require('mongoose');
//let connectionString = 'mongodb+srv://sanjimchowdhury:LNjEyRdnXRQTenkm@cluster0.xkh0dje.mongodb.net/star-wars-quote?retryWrites=true&w=majority'

const Character = require('./models/Character');
//load config
dotenv.config({ path: './config/config.env' })

//database connect
//new 
connectDB()


//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))


app.get('/', (req, res) => {
    // Use the Mongoose model to query the database
    Character.find()
        .then(quotes => {
            res.render('index.ejs', { quotes: quotes });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});


app.post('/quotes', (req, res) => {
    Character
        .create(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
})

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

app.delete('/quotes', (req, res) => {
    Character.deleteOne({ name: req.body.name })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
            }
            res.json(`Deleted Darth Vader's quote`)
        })
        .catch(error => console.error(error))
})
//add port
app.listen(3500, function () {
    console.log('listening on 3000')
})


