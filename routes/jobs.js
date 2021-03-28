const express = require('express');
const router = express.Router();
const Job = require("../models/job.js");

router.get('/', (req, res) => {
    Job.find({}).exec((err, job) => {
        console.log(job);
        if (job) {
            res.send(job);
        }
    })
})
module.exports = router;