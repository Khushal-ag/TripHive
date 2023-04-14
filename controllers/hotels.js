const Hotel = require('../models/hotel');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

module.exports.hotelIndex = async (req, res) => {
    const hotels = await Hotel.find({}).sort({ title: 1 })
    res.render('hotel/index', { hotels });
}

module.exports.renderNewForm = (req, res) => {
    res.render('hotel/new')
}

module.exports.createHotel = async (req, res) => {
    const hoteldata = new Hotel(req.body.hotel)
    console.log(hoteldata)
    hoteldata.author = req.user._id
    hoteldata.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    await hoteldata.save()
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
    const deleted = await Hotel.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted a Hotel!')
    res.redirect('/hotel')
}

module.exports.updateHotel = async (req, res) => {
    const { id } = req.params
    const hoteldata = await Hotel.findByIdAndUpdate(id, { ...req.body.hotel })
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