const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
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
    precio:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    imagen:{
        type: String,
        required: false
    },
    fechaCreacion:{
        type:Date,
        default: Date.now()
    }

});

const Producto = mongoose.model('Producto', ProductoSchema);
module.exports = {Producto, ProductoSchema};