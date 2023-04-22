const Hotel = require('../models/hotel');
const cloudinary = require('cloudinary').v2;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocoder = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN })

module.exports.hotelIndex = async (req, res) => {
    let nomatch = null;
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        const hotels = await Hotel.find({ title: regex }).sort({ title: 1 })
        if (hotels.length < 1) {
            nomatch = "No Hotels match that query, please try again."
        }
        res.render('hotel/index', { hotels: hotels, nomatch: nomatch });
    }
    else {
        const hotels = await Hotel.find({}).sort({ title: 1 })
        res.render('hotel/index', { hotels: hotels, nomatch: nomatch});
    }
}

module.exports.renderNewForm = (req, res) => {
    res.render('hotel/new')
}

module.exports.createHotel = async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.hotel.location,
        limit: 1
    }).send()
    const hoteldata = new Hotel(req.body.hotel)
    hoteldata.geometry = geoData.body.features[0].geometry
    hoteldata.author = req.user._id
    hoteldata.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    await hoteldata.save()
    console.log(hoteldata)
    req.flash('success', 'Successfully Added a new Hotel!')
    res.redirect(`/hotel/${hoteldata._id}`)
}

module.exports.showHotel = async (req, res) => {
    const { id } = req.params
    const hotel = await Hotel.findById(id).populate({ path: 'reviews', populate: { path: 'author' } }).populate('author')
    if (!hotel) {
        req.flash('error', 'Cannot find that Hotel!')
        return res.redirect('/hotel')
    }
    res.render('hotel/show', { hotel })
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params
    const hotel = await Hotel.findById(id)
    res.render('hotel/edit', { hotel })
}

module.exports.deleteHotel = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const hotel = await Hotel.findById(id);
    hotel.images.map((image) => {
        cloudinary.uploader.destroy(image.filename);
    });
    await Hotel.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted a Hotel!')
    res.redirect('/hotel')
}

module.exports.updateHotel = async (req, res) => {
    const { id } = req.params
    const geoData = await geocoder.forwardGeocode({
        query: req.body.hotel.location,
        limit: 1
    }).send()
    const hoteldata = await Hotel.findByIdAndUpdate(id, { ...req.body.hotel })
    hoteldata.geometry = geoData.body.features[0].geometry
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    hoteldata.images.push(...imgs)
    await hoteldata.save()
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename)
        }
        await hoteldata.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated a Hotel!')
    res.redirect(`/hotel/${id}`)
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};