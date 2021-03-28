const express = require('express');
const router = express.Router();
const Job = require("../models/job.js");

router.get('/', (req, res) => {
    const Jobs = Job.find();
    res.send('Jobs');
})
module.exports = router;