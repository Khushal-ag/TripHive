const User = require('../models/user')

module.exports.registerForm = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/hotel');
    }
    res.render('user/register')
}

module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password,github } = req.body
        const user = new User({ email, username,github })
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
    if (req.isAuthenticated()) {
        return res.redirect('/hotel');
    }
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