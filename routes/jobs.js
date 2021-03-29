const express = require('express');
const router = express.Router();
const Job = require("../models/job.js");
const Unit = require("../models/unit.js");

router.get('/', (req, res) => {
    Job.find({}).exec((err, job) => {
        console.log(job);
        if (job) {
            res.send(job);
        }
    })
})
router.get('/:jobId', (req, res) => {
    const id = req.params.jobId;
    Job.findOne({ _id: id }).exec((err, job) => {
        if(job) {
            console.log(job.units);
            Unit.find({}).exec((err, unit) => {
                console.log(unit);
                res.render('courselist',{units:unit})
            })
        }
        else {
            res.redirect('/jobs');
        }
    })
})
//6060c9994694ec26f037e4b1
module.exports = router;