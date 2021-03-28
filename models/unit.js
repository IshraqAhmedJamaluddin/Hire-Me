const mongoose = require('mongoose');
const UnitSchema = new mongoose.Schema({
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
    badge: {
        type: String,
        required: true
    },
    lessons: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Unit = mongoose.model('Unit', UnitSchema);

module.exports = Unit;