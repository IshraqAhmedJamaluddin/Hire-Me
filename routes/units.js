const express = require('express');
const router = express.Router();
const Unit = require("../models/unit.js");
const Lesson = require("../models/lesson.js");
const connectEnsureLogin = require('connect-ensure-login');

// router.get('/', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    
//     Unit.find({}).exec((err, unit) => {
//         console.log(unit);
//         if (unit) {
//             res.send(unit);
//         }
//     })
// })
router.get('/:unitId', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    const id = req.params.unitId;
    Unit.findOne({ _id: id }).exec((err, unit) => {
        if(unit) {

            Lesson.find({_id:unit.lessons}).exec((err, lessons) => {
                console.log(unit);
                res.render('unitlist',{unit:unit.name,lessons:lessons,user:req.user})
            });
        }
        else {
            res.redirect('/dashboard');
        }
    })
})
module.exports = router;