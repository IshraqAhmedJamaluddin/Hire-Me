const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const passport = require('passport');
const bcrypt = require('bcrypt');
require("../config/passport")(passport)
const connectEnsureLogin = require('connect-ensure-login');

//login handle
router.get('/login', (req, res) => {
    if (!req.user) {
        res.render('login', {layout: 'login'});
    } else {
        res.redirect('/dashboard');
    }
})
router.get('/register', (req, res) => {
    if (!req.user) {
        res.render('register', {layout: 'register'})
    } else {
        res.redirect('/dashboard');
    }
})
//Register handle
router.post('/register', (req, res, next) => {
    const { fname, lname, email, age, password, password2 } = req.body;
    let errors = [];
    console.log(' Name ' + fname + ' email :' + email + ' age :' + age + ' pass:' + password);
    if (!fname || !lname || !email || !age || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" })
    }
    //check if underage
    if (age < 18) {
        errors.push({ msg: "You should be 18 or older" });
    }

    //check if match
    if (password !== password2) {
        errors.push({ msg: "passwords dont match" });
    }

    //check if password is more than 6 characters
    if (password.length < 6) {
        errors.push({ msg: 'password atleast 6 characters' })
    }
    if (errors.length > 0) {
        res.render('register', {
            errors: errors,
            fname: fname,
            lname: lname,
            email: email,
            age: age,
            password: password,
            password2: password2,
            layout: 'register'
        })
    } else {
        //validation passed
        User.findOne({ email: email }).exec((err, user) => {
            console.log(user);
            if (user) {
                errors.push({ msg: 'email already registered' });
                res.render('register', {
                    errors: errors,
                    fname: fname,
                    lname: lname,
                    email: email,
                    age: age,
                    password: password,
                    password2: password2,
                    layout: 'register'
                })
            } else {
                const newUser = new User({
                    fname: fname,
                    lname: lname,
                    email: email,
                    age: age,
                    password: password
                });
                //hash password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //save pass to hash
                            newUser.password = hash;
                            //save user
                            newUser.save()
                                .then((value) => {
                                    console.log(value)
                                    req.flash('success_msg','You have now registered!')
                                    passport.authenticate('local',{
                                        successRedirect : '/dashboard',
                                        failureRedirect : '/users/login',
                                        failureFlash : true,
                                        })(req,res,next);
                                })
                                .catch(value => console.log(value));

                        }));
            } //ELSE statement ends here
        })
    }
})
router.post('/login', (req, res, next) => {
    passport.authenticate('local',{
        successRedirect : '/dashboard',
        failureRedirect : '/users/login',
        failureFlash : true,
        })(req,res,next);
})

//logout
router.get('/logout', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    req.logout();
    res.redirect('/');
})
module.exports = router;