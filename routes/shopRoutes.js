const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require('../utils/middlewares')
const catchAsync  = require('../utils/catchAsync')
const {renderShop, buyProduct} = require('../controllers/shop')

router.route('/').get(isLoggedIn,renderShop )

router.post('/:id', isLoggedIn,catchAsync(buyProduct) )

module.exports = router;