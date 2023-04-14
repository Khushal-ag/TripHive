const express = require('express')
const router = express.Router()

const CatchAsync = require('../utils/catchAsync');

const { isLoggedIn, validateHotel, isAuthor } = require('../utils/middlewares')
const multer = require('multer')
const { storage} = require('../cloudinary')
const upload = multer({ storage });
const hotels = require('../controllers/hotels')

router.route('/').get(CatchAsync(hotels.hotelIndex)).post(isLoggedIn, upload.array('image'),validateHotel, CatchAsync(hotels.createHotel))

router.get('/new', isLoggedIn, hotels.renderNewForm)

router.route('/:id').get(CatchAsync(hotels.showHotel)).put(isLoggedIn, isAuthor,upload.array('image'), validateHotel, CatchAsync(hotels.updateHotel)).delete(isLoggedIn, isAuthor, CatchAsync(hotels.deleteHotel))

router.get('/:id/edit', isLoggedIn, isAuthor, CatchAsync(hotels.renderEditForm))

module.exports = router