const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
//login page
router.get('/', (req, res) => {
    if (!req.user) {
        res.render('welcome');
    } else {
        res.redirect('/dashboard');
    }
})
//register page
router.get('/register', (req, res) => {
    res.redirect('/users/register');
})
router.get('/login', (req, res) => {
    res.redirect('/users/login');
})
router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.render('dashboard',{
        user: req.user
    });
})
module.exports = router;