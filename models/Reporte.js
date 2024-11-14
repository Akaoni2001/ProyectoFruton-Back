const mongoose = require('mongoose');
const {PedidoSchema} = require('./Pedido');

const ReporteSquema = mongoose.Schema({
    nombreCliente: {
        type: String,
        required: true
    },pedido:{
        type: PedidoSchema,
        require:true
    },
    descripcionReclamo: {
        type: String,
        required: true
    },
    tipoReclamo: {
        type: String,
        required: true
    },
    fechaReclamo: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Reporte', ReporteSquema);