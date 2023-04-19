const User = require('../models/user')

const products = [
    { id: 0, imgsrc: '/assets/amazon500.png', points: 450000 },
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
