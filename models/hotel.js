const mongo = require('mongoose')
const { Schema } = mongo
const Review = require('./review')

const ImageSchema = new Schema({
    url: String,
    filename: String,
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

const opts = { toJSON: { virtuals: true } }
const hotelSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    images: [ImageSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts)

hotelSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <h4><a href="/hotel/${this._id}" class = 'text-decoration-none text-dark'>${this.title}</a></h4>
    <h6 class = 'text-muted'>${this.location}</h6>
    <p>${this.description.substring(0, 30)}...</p>`
})

hotelSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

const Hotel = mongo.model('Hotel', hotelSchema)
module.exports = Hotel
