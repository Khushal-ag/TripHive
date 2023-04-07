const express = require('express')
const router = express.Router()

const Hotel = require('../models/hotel');

const ExpressError = require('../utils/expressError');
const CatchAsync = require('../utils/catchAsync');
const { hotelSchema} = require('../schemas.js');

const validateHotel = (req, res, next) => {
    const { error } = hotelSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(e => e.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

router.get('/', CatchAsync(async (req, res) => {
    const hotels = await Hotel.find({}).sort({ title: 1 })
    res.render('hotel/index', { hotels });
}))

router.get('/new', (req, res) => {
    res.render('hotel/new')
})

router.post('/', validateHotel, CatchAsync(async (req, res) => {
    const hoteldata = new Hotel(req.body.hotel)
    console.log(hoteldata)
    await hoteldata.save()
    req.flash('success', 'Successfully made a new hotel!')
    res.redirect(`/hotel/${hoteldata._id}`)
}))

router.get('/:id', CatchAsync(async (req, res) => {
    const { id } = req.params
    const hotel = await Hotel.findById(id).populate('reviews')
    if (!hotel) {
        req.flash('error', 'Cannot find that hotel!')
        return res.redirect('/hotel')
    }
    res.render('hotel/show', { hotel })
}))

router.delete('/:id', CatchAsync(async (req, res) => {
    const { id } = req.params
    console.log(id)
    const deleted = await Hotel.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted hotel!')
    res.redirect('/hotel')
}))

router.get('/:id/edit', CatchAsync(async (req, res) => {
    const { id } = req.params
    const hotel = await Hotel.findById(id)
    res.render('hotel/edit', { hotel })
}))

router.put('/:id', validateHotel, CatchAsync(async (req, res) => {
    const { id } = req.params
    const hoteldata = req.body.hotel
    const updated = await Hotel.findByIdAndUpdate(id, hoteldata, { runValidators: true, new: true })
    req.flash('success', 'Successfully updated hotel!')
    res.redirect(`/hotel/${id}`)
}))

module.exports = router