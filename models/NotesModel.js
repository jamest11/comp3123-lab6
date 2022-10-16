const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated
const noteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        unique: true
    },
    noteDescription: String,
    priority: {
        type: String,
        enum : ['LOW','MEDIUM', 'HIGH'],
        default: 'LOW',
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('note', noteSchema, 'notes');