const mongoose = require('mongoose');

const VentaSchema = mongoose.Schema({
    nombreCliente:{
        type: String,
        require:true
    },
    producto:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Producto',
        require:true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precioProducto: {
        type: Number,
        required: true
    },
    fechaVenta: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Venta', VentaSchema);