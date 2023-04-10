const express = require('express')
const router = express.Router()

const CatchAsync = require('../utils/catchAsync');

const Hotel = require('../models/hotel');
const { isLoggedIn, validateHotel, isAuthor } = require('../utils/middlewares')


router.get('/', CatchAsync(async (req, res) => {
    const hotels = await Hotel.find({}).sort({ title: 1 })
    res.render('hotel/index', { hotels });
}))

router.get('/new', isLoggedIn, (req, res) => {
    res.render('hotel/new')
})

router.post('/', isLoggedIn, validateHotel, CatchAsync(async (req, res) => {
    const hoteldata = new Hotel(req.body.hotel)
    console.log(hoteldata)
    hoteldata.author = req.user._id
    await hoteldata.save()
    req.flash('success', 'Successfully Added a new Hotel!')
    res.redirect(`/hotel/${hoteldata._id}`)
}))

router.get('/:id', CatchAsync(async (req, res) => {
    const { id } = req.params
    const hotel = await Hotel.findById(id).populate({path:'reviews',populate:{path:'author'}}).populate('author')
    if (!hotel) {
        req.flash('error', 'Cannot find that Hotel!')
        return res.redirect('/hotel')
    }
    res.render('hotel/show', { hotel })
}))

router.get('/:id/edit', isLoggedIn, isAuthor,CatchAsync(async (req, res) => {
    const { id } = req.params
    const hotel = await Hotel.findById(id)
    res.render('hotel/edit', { hotel })
}))

router.delete('/:id', isLoggedIn, isAuthor,CatchAsync(async (req, res) => {
    const { id } = req.params
    console.log(id)
    const deleted = await Hotel.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted a Hotel!')
    res.redirect('/hotel')
}))

router.put('/:id', isLoggedIn, isAuthor,validateHotel, CatchAsync(async (req, res) => {
    const { id } = req.params
    const hoteldata = req.body.hotel
    const updated = await Hotel.findByIdAndUpdate(id, hoteldata, { runValidators: true, new: true })
    req.flash('success', 'Successfully updated a Hotel!')
    res.redirect(`/hotel/${id}`)
}))

module.exports = router