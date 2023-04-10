const express = require('express')
const router = express.Router()

const CatchAsync = require('../utils/catchAsync');

const { isLoggedIn, validateHotel, isAuthor } = require('../utils/middlewares')

const hotels = require('../controllers/hotels')

router.get('/', CatchAsync(hotels.hotelIndex))

router.get('/new', isLoggedIn, hotels.renderNewForm)

router.post('/', isLoggedIn, validateHotel, CatchAsync(hotels.createHotel))

router.get('/:id', CatchAsync(hotels.showHotel))

router.get('/:id/edit', isLoggedIn, isAuthor, CatchAsync(hotels.renderEditForm))

router.delete('/:id', isLoggedIn, isAuthor, CatchAsync(hotels.deleteHotel))

router.put('/:id', isLoggedIn, isAuthor, validateHotel, CatchAsync(hotels.updateHotel))

module.exports = router