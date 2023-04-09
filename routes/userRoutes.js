const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

router.get('/register', (req, res) => {
    res.render('user/register')
})

router.post('/register', async (req, res) => {
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
})

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome !!')
    const redirectUrl = req.session.returnTo || '/hotel';
    delete req.session.returnTo
    res.redirect(redirectUrl)
})

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'Goodbye!')
        res.redirect('/hotel');
    })
})

module.exports = router