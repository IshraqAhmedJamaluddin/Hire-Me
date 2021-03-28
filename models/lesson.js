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
    partial: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;