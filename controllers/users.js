const User = require('../models/user')

module.exports.registerForm = (req, res) => {
    res.render('user/register')
}

module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to TripHive!')
            res.redirect('/hotel')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}

module.exports.loginForm = (req, res) => {
    res.render('user/login')
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome !!')
    const redirectUrl = req.session.returnTo || '/hotel';
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logoutUser = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'Goodbye!')
        res.redirect('/hotel');
    })
}