const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  data: {
    type: String, // Guardamos la imagen como una cadena (Base64)
    required: true
  }
});

module.exports = mongoose.model('Image', ImageSchema);