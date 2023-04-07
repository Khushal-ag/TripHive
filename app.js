const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config();
const ejsmate = require('ejs-mate')
const mongo = require('mongoose');
const session = require('express-session');
const hotels = require('./routes/hotels')
const reviews = require('./routes/reviews')

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.engine('ejs', ejsmate)

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'));

//MongoDB Connection
mongo.set('strictQuery', false)
mongo.connect(process.env.Mongo_URI)

const db = mongo.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Routes
app.use('/hotel', hotels)
app.use('/hotel/:id/reviews', reviews)

//Session
const sessionConfig = {
    secret: 'UmveeIsMySecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))

//Routes
app.get('/', (req, res) => {
    res.render('home');
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error', { err })
})

app.listen(process.env.PORT, () => {
    console.log(`Serving on port ${process.env.PORT}`);
});