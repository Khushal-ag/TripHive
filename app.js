const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config();
const ejsmate = require('ejs-mate')
const mongo = require('mongoose');
const session = require('express-session');

const Hotel = require('./models/hotel');
const Review = require('./models/review');

const ExpressError = require('./utils/expressError');
const CatchAsync = require('./utils/catchAsync');
const { hotelSchema, reviewSchema } = require('./schemas.js');

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


//Error Handling

const validateHotel = (req, res, next) => {
    const { error } = hotelSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(e => e.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(e => e.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

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

app.get('/hotel', CatchAsync(async (req, res) => {
    const hotels = await Hotel.find({}).sort({ title: 1 })
    res.render('hotel/index', { hotels });
}))

app.get('/hotel/new', (req, res) => {
    res.render('hotel/new')
})

app.post('/hotel', validateHotel, CatchAsync(async (req, res) => {
    const hoteldata = new Hotel(req.body.hotel)
    console.log(hoteldata)
    await hoteldata.save()
    res.redirect(`/hotel/${hoteldata._id}`)
}))

app.get('/hotel/:id', CatchAsync(async (req, res) => {
    const { id } = req.params
    const hotel = await Hotel.findById(id).populate('reviews')
    res.render('hotel/show', { hotel })
}))

app.delete('/hotel/:id', CatchAsync(async (req, res) => {
    const { id } = req.params
    console.log(id)
    const deleted = await Hotel.findByIdAndDelete(id)
    res.redirect('/hotel')
}))

app.get('/hotel/:id/edit', CatchAsync(async (req, res) => {
    const { id } = req.params
    const hotel = await Hotel.findById(id)
    res.render('hotel/edit', { hotel })
}))

app.put('/hotel/:id', validateHotel, CatchAsync(async (req, res) => {
    const { id } = req.params
    const hoteldata = req.body.hotel
    const updated = await Hotel.findByIdAndUpdate(id, hoteldata, { runValidators: true, new: true })
    res.redirect(`/hotel/${id}`)
}))

app.post('/hotel/:id/reviews', validateReview, CatchAsync(async (req, res) => {
    const { id } = req.params
    const hotel = await Hotel.findById(id)
    const review = new Review(req.body.review)
    hotel.reviews.push(review)
    await review.save()
    await hotel.save()
    res.redirect(`/hotel/${hotel._id}`)
}))

app.delete('/hotel/:id/reviews/:reviewId', CatchAsync(async (req, res) => {
    const { id, reviewId } = req.params
    await Hotel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/hotel/${id}`)
}))

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