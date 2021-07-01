const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    images: {
        type: Array,
        items: {

        }
    }
});

module.exports = Album = mongoose.model('album', AlbumSchema);