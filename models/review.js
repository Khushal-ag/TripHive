const mongo = require('mongoose')
const { Schema } = mongo

const reviewSchema = new Schema({
    rating: Number,
    body: String,
})

const Review = mongo.model('Review', reviewSchema)
module.exports = Review