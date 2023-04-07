const express = require('express');
const router = express.Router({ mergeParams: true});
const Hotel = require('../models/hotel');
const Review = require('../models/review');
const ExpressError = require('../utils/expressError');
const CatchAsync = require('../utils/catchAsync');
const { reviewSchema } = require('../schemas.js');


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(e => e.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

router.post('/', validateReview, CatchAsync(async (req, res) => {
    const { id } = req.params
    const hotel = await Hotel.findById(id)
    const review = new Review(req.body.review)
    hotel.reviews.push(review)
    await review.save()
    await hotel.save()
    req.flash('success', 'Successfully made a new review!')
    res.redirect(`/hotel/${hotel._id}`)
}))

router.delete('/:reviewId', CatchAsync(async (req, res) => {
    const { id, reviewId } = req.params
    await Hotel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted review!')
    res.redirect(`/hotel/${id}`)
}))

module.exports = router;