const Hotel = require('../models/hotel');
const Review = require('../models/review');
const User = require('../models/user');

module.exports.createReview = async (req, res) => {
    const { id } = req.params
    const hotel = await Hotel.findById(id)
    const review = new Review(req.body.review)
    review.author = req.user._id
    hotel.reviews.push(review)
    await review.save()
    await hotel.save()
    const userPoints = await User.findByIdAndUpdate(req.user._id, { $inc: { points: 5 } })
    req.flash('success', 'Successfully Submitted a new review!')
    res.redirect(`/hotel/${hotel._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params
    await Hotel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted a review!')
    res.redirect(`/hotel/${id}`)
}