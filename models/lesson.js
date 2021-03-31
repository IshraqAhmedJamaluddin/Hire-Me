const mongoose = require('mongoose');
const LessonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    txt1: {
        type: String
    },
    vid1: {
        type: String
    },
    txt2: {
        type: String
    },
    vid2: {
        type: String
    },
    txt3: {
        type: String
    },
    vid3: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;