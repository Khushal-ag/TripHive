// Packages
const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config();
const ejsmate = require('ejs-mate');
const mongo = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const MongoStore = require('connect-mongo');

const User = require('./models/user');
const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const shopRoutes = require('./routes/shopRoutes');

const dbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/triphive';

//Express configuration
app.set('view engine', 'ejs');
app.engine('ejs', ejsmate);
app.set('views', path.join(__dirname, '/views'));

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize({
    replaceWith: '_'
}));

//MongoDB Connection
mongo.set('strictQuery', false);
mongo.connect(dbUrl);

const db = mongo.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//Session Store
const secret = process.env.SESSION_SECRET || 'ThisIsATopSecret';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    ttl: 14 * 24 * 60 * 60,
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
});

//Session
const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Global var Middleware
app.use((req, res, next) => {
    if (!['/login', '/register', '/'].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
    };
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', userRoutes);
app.use('/hotel', hotelRoutes);
app.use('/hotel/:id/reviews', reviewRoutes);
app.use('/shop', shopRoutes);

//Endppoints
app.get('/', (req, res) => {
    res.render('home');
})

app.all('*', (req, res, next) => {
    next(res.status(404).render('pageNotFound'));
});

//Error Handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render('error', { err });
});

//Server
app.listen(process.env.PORT, () => {
    console.log(`Serving on port ${process.env.PORT}`);
});