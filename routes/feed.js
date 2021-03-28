const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const Job = require("../models/job.js");
const Unit = require("../models/unit.js");
const Lesson = require("../models/lesson.js");
const passport = require('passport');
const bcrypt = require('bcrypt');
require("../config/passport")(passport)

router.get('/', (req, res) => {
    res.render('feed')
})
//Register handle
router.post('/', (req, res) => {
    const { collection, name, email, age, password, description, icon, partial, badge } = req.body;
    if (collection === 'job') {
        //validation passed
        Job.findOne({ name: name }).exec((err, job) => {
            console.log(job);
            if (job) {
                errors.push({ msg: 'job already added' });
                res.render('feed', {
                    errors: errors,
                    name: name,
                    email: email,
                    age: age,
                    password: password
                })
            } else {
                const newJob = new Job({
                    name: name,
                    description: description,
                    icon: icon
                });
                newJob.save()
                    .then((value) => {
                        console.log(value)
                        req.flash('success_msg', 'Job added successfully!')
                        res.redirect('/feed');
                    })
                    .catch(value => console.log(value));
            } //ELSE statement ends here
        })
    }
    else if (collection === 'unit') {
        //validation passed
        Unit.findOne({ name: name }).exec((err, unit) => {
            console.log(unit);
            if (unit) {
                errors.push({ msg: 'unit already added' });
                res.render('feed', {
                    errors: errors,
                    name: name,
                    email: email,
                    age: age,
                    password: password
                })
            } else {
                const newUnit = new Unit({
                    name: name,
                    description: description,
                    icon: icon,
                    badge: badge
                });
                newUnit.save()
                    .then((value) => {
                        console.log(value)
                        req.flash('success_msg', 'Unit added successfully!')
                        res.redirect('/feed');
                    })
                    .catch(value => console.log(value));
            } //ELSE statement ends here
        })
    }
    else if (collection === 'lesson') {
        //validation passed
        Lesson.findOne({ name: name }).exec((err, lesson) => {
            console.log(lesson);
            if (lesson) {
                errors.push({ msg: 'lesson already added' });
                res.render('feed', {
                    errors: errors,
                    name: name,
                    email: email,
                    age: age,
                    password: password
                })
            } else {
                const newLesson = new Lesson({
                    name: name,
                    description: description,
                    partial: partial
                });
                newLesson.save()
                    .then((value) => {
                        console.log(value)
                        req.flash('success_msg', 'Lesson added successfully!')
                        res.redirect('/feed');
                    })
                    .catch(value => console.log(value));
            } //ELSE statement ends here
        })
    }
    else {
        let errors = [];
        console.log(' Name ' + name + ' email :' + email + ' age :' + age + ' pass:' + password);
        if (!name || !email || !age || !password) {
            errors.push({ msg: "Please fill in all fields" })
        }
        //check if underage
        if (age < 18) {
            errors.push({ msg: "You should be 18 or older" });
        }
        //check if password is more than 6 characters
        if (password.length < 6) {
            errors.push({ msg: 'password atleast 6 characters' })
        }
        if (errors.length > 0) {
            res.render('feed', {
                errors: errors,
                name: name,
                email: email,
                age: age,
                password: password
            })
        } else {
            //validation passed
            User.findOne({ email: email }).exec((err, user) => {
                console.log(user);
                if (user) {
                    errors.push({ msg: 'email already registered' });
                    res.render('feed', {
                        errors: errors,
                        name: name,
                        email: email,
                        age: age,
                        password: password
                    })
                } else {
                    const newUser = new User({
                        name: name,
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
                                        req.flash('success_msg', 'User registered successfully!')
                                        res.redirect('/feed');
                                    })
                                    .catch(value => console.log(value));

                            }));
                } //ELSE statement ends here
            })
        }
    }
})
module.exports = router;