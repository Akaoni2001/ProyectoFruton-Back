const mongoose = require('mongoose');


const PedidoSchema = mongoose.Schema({
    nombreCliente: {
        type: String,
        required: true
    },
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    }],
    cantidades: [{
        type: Number,
        required: true
    }],
    estado: {
        type: String,
        enum: ['Pendiente', 'En Proceso', 'Completado', 'Cancelado'],
        default: 'Pendiente'
    },
    fechaPedido: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
