const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    file: [
        {
            url: {
                type: String
            }
        }
    ],
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;