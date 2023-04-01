const mongo = require('mongoose')
const { Schema } = mongo

const hotelSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})
const Hotel = mongo.model('Hotel', hotelSchema)
module.exports = Hotel
