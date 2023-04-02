const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config();
const ejsmate = require('ejs-mate')
const mongo = require('mongoose');

const Hotel = require('./models/hotel');
const Review = require('./models/review');

const ExpressError = require('./utils/expressError');
const CatchAsync = require('./utils/catchAsync');

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.engine('ejs', ejsmate)

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'));

//MongoDB Connection
mongo.set('strictQuery', false)
mongo.connect(process.env.MONGO_URI)
    .then(() => app.listen(process.env.PORT, () => {
        console.log('Server is running & MongoDB is connected on port', process.env.PORT);
    }))
    .catch(err => console.error('Could not connect to MongoDB...', err))

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

app.post('/hotel', CatchAsync(async (req, res) => {
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

app.put('/hotel/:id', CatchAsync(async (req, res) => {
    const { id } = req.params
    const hoteldata = req.body.hotel
    const updated = await Hotel.findByIdAndUpdate(id, hoteldata, { runValidators: true, new: true })
    res.redirect(`/hotel/${id}`)
}))

app.post('/hotel/:id/reviews', CatchAsync(async (req, res) => {
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
