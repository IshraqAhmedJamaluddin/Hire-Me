const express = require('express');
const passport = require('../config/passport.js');
const router = express.Router();
const Job = require("../models/job.js");
const Unit = require("../models/unit.js");
const Lesson = require("../models/lesson.js");
const connectEnsureLogin = require('connect-ensure-login');

router.get('/', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    
    Job.find({}).exec((err, job) => {
        console.log(job);
        if (job) {
            res.send(job);
        }
    })
})
router.get('/:jobId', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    const id = req.params.jobId;
    Job.findOne({ _id: id }).exec((err, job) => {
        if(job) {
            Unit.find({_id:job.units}).exec((err, units) => {
                let percentages = [];
                const user = req.user;
                
                units.forEach(unit => {
                    let counter = 0;
                    let percent = 0;
                    Lesson.find({_id:unit.lessons}).exec((err, lessons) => {
                        if(lessons[0]){
                            lessons.forEach(lesson => {
                                user.lessons.forEach(l => {
                                    if (String(lesson._id) == String(l)) {
                                        counter ++;
                                    }
                                })
                            });
                            percent = (counter/unit.lessons.length)*100;
                            console.log(percent);
                            percentages.push(percent);
                        } else {
                            percentages.push(0);
                        }
                    })
                });
                setTimeout(() => {
                    console.log(percentages);
                    res.render('courselist',{job:job.name,units:units,percentages:percentages})
                }, 2000);
            })
        }
        else {
            res.redirect('/jobs');
        }
    })
})
//6060c9994694ec26f037e4b1
module.exports = router;