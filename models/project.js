const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const file_path = path.join('/uploads');



// const cpupload = upload.fields([{name: 'question'}]);

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tas: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
    ],
    students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
    ],
    question: [
        {
            type: String
        }
    ],
    totalmark: {
        type: Number,
    },
    mark: {
        type: Number
    },
    solution: {
        type: String
    },
    due: {
        type: Date
    },
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
}, { 
    timestamps: true 
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', file_path));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
});

projectSchema.statics.upload = multer({storage:  storage}).fields([{name: 'question', maxCount: 5}, {name: 'solution'}]);
module.exports = project = mongoose.model('project', projectSchema);