const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    units: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Job = mongoose.model('Job', JobSchema);

module.exports = Job;    