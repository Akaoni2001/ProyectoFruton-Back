const mongoose = require('mongoose');

const RecepcionProductoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    categoria:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('recepcionProductos', RecepcionProductoSchema);