const mongoose = require('mongoose');

const TipoProductoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    
    categoria:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('tipoProducto', TipoProductoSchema);