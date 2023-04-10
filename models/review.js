const mongo = require('mongoose')
const { Schema } = mongo

const reviewSchema = new Schema({
    rating: Number,
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Review = mongo.model('Review', reviewSchema)
module.exports = Review