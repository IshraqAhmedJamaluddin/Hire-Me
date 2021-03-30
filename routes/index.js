const express = require('express');
const router = express.Router();
//login page
router.get('/', (req, res) => {
    res.render('welcome');
})
//register page
router.get('/register', (req, res) => {
    res.render('register', {layout: 'register'});
})
router.get('/login', (req, res) => {
    res.render('login', {layout: 'login'});
})
router.get('/dashboard', (req, res) => {
    res.render('dashboard',{
        user: req.user
        });
})
module.exports = router;