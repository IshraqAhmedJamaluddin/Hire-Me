const express = require('express');
const router = express.Router();
const Job = require("../models/job.js");

router.get('/', (req, res) => {
    res.send('login');
})
module.exports = router;