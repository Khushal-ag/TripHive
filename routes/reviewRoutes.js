const express = require('express');
const router = express.Router({ mergeParams: true });

const CatchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../utils/middlewares')

const reviews = require('../controllers/reviews')

router.post('/', isLoggedIn, validateReview, CatchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, CatchAsync(reviews.deleteReview))

module.exports = router;