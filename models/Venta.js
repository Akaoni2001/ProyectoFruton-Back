const mongoose = require('mongoose');
const {ProductoSchema}= require('./Producto');

const VentaSchema = mongoose.Schema({
    nombreCliente: {
        type: String,
        required: true
    },productos:[{
        type: ProductoSchema,
        require:true
    }],
    cantidades: [{
        type: Number,
        required: true
    }],
    precioTotal: {
        type: Number,
        required: true
    },
    fechaVenta: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Venta', VentaSchema);