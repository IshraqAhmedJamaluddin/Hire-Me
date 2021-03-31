const express = require('express');
const router = express.Router();
const Lesson = require("../models/lesson.js");
const connectEnsureLogin = require('connect-ensure-login');

router.get('/', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    
    Lesson.find({}).exec((err, lesson) => {
        console.log(lesson);
        if (lesson) {
            res.send(lesson);
        }
    })
})
router.get('/:lessonId', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    const id = req.params.lessonId;
    Lesson.findOne({ _id: id }).exec((err, lesson) => {
        if(lesson) {
            res.render('lesson',{lesson:lesson})
        }
        else {
            res.redirect('/dashboard');
        }
    })
})
module.exports = router;