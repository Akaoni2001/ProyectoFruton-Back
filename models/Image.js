const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    data: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Image', ImageSchema);