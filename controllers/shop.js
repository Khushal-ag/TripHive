const User = require('../models/user')

const products = [
    { id: 0, imgsrc: '/assets/products/amazon500.png', points: 410000 },
    { id: 1, imgsrc: '/assets/products/flipkart.png', points: 25000 },
    { id: 2, imgsrc: '/assets/products/starbucks.png', points: 18000 },
    { id: 3, imgsrc: '/assets/products/h&m.png', points: 20000 },
    { id: 4, imgsrc: '/assets/products/nike.png', points: 14000 },
    { id: 5, imgsrc: '/assets/products/myntra.jpeg', points: 6000 },
]

module.exports.renderShop = (req, res) => {
    res.render('shop', { products });
}

module.exports.buyProduct = async (req, res) => {
    const { id } = req.params;
    const points = products[id].points;
    if (req.user.points < points) {
        req.flash('error', 'You do not have enough points to buy this product!')
    }
    else {
        await User.findByIdAndUpdate(req.user._id, { $inc: { points: -points } })
        req.flash('success', 'You have successfully bought this product!')
    }
    res.redirect('/shop')
}