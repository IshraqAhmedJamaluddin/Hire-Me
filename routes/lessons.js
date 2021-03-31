const express = require('express');
const router = express.Router();
const Lesson = require("../models/lesson.js");
const User = require("../models/user.js");
const connectEnsureLogin = require('connect-ensure-login');

// router.get('/', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    
//     Lesson.find({}).exec((err, lesson) => {
//         console.log(lesson);
//         if (lesson) {
//             res.send(lesson);
//         }
//     })
// })
router.get('/:lessonId', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    const id = req.params.lessonId;
    Lesson.findOne({ _id: id }).exec((err, lesson) => {
        if(lesson) {
            let found = false;
            req.user.lessons.forEach(l => {
                if (String(lesson._id) == String(l)) {
                    found = true;
                }
            });
            res.render('lesson',{lesson:lesson,found:found,user:req.user})
        }
        else {
            res.redirect('/dashboard');
        }
    })
})
router.post('/completed', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    const id = req.body.id;
    let found = false;
    Lesson.findOne({ _id: id }).exec((err, lesson) => {
        if(lesson) {
            req.user.lessons.forEach(l => {
                if (String(lesson._id) == String(l)) {
                    found = true;
                }
            });
            if(!found){
                User.updateOne({"_id":req.user.id}, { $push: {"lessons": lesson.id} }, function(err, result) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send(result);
                    }
                });
            }
            else {
                res.send(req.body);
            }
        }
        else {
            res.send(req.body);
        }
    })
})
module.exports = router;