const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    solution: {
        type: String
    },
    mark: {
        type: Number
    },
    status: {
        type: Boolean
    },

}, { 
    timestamps: true 
});

module.exports = student = mongoose.model('user', studentSchema);