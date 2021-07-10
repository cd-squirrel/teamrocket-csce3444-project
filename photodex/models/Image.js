const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    album: {
        type: mongoose.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
    },
    caption: {
        type: String
    },
    fileId: {
        type: String,
        required: true,
    },
    tags: [String]
  }, 
{ timestamps: true});

module.exports = Image = mongoose.model('image', ImageSchema);