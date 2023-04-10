const express = require('express');
const router = express.Router({ mergeParams: true });

const Hotel = require('../models/hotel');
const Review = require('../models/review');

const CatchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateReview, isReviewAuthor, isAuthor } = require('../utils/middlewares')



router.post('/', isLoggedIn, validateReview, CatchAsync(async (req, res) => {
    const { id } = req.params
    const hotel = await Hotel.findById(id)
    const review = new Review(req.body.review)
    review.author = req.user._id
    hotel.reviews.push(review)
    await review.save()
    await hotel.save()
    req.flash('success', 'Successfully Submitted a new review!')
    res.redirect(`/hotel/${hotel._id}`)
}))

router.delete('/:reviewId', isLoggedIn, isAuthor, CatchAsync(async (req, res) => {
    const { id, reviewId } = req.params
    await Hotel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted a review!')
    res.redirect(`/hotel/${id}`)
}))

module.exports = router;