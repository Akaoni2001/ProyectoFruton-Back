const mongoose = require('mongoose');

const ReporteSchema = mongoose.Schema({
    cliente:{
        type:String,
        require:true
    },
    nPedido:{
        type:Number,
        require:true
    },
    fechaPedido:{
        type:Date,
        require:true
    },
    descripcion :{
        type:String,
        require:true
    },
    tipo:{
        type:String,
        require:true
    },
    fechaReclamo:{
        type:Date,
        default:Date.now()
    },
    
})

module.exports = mongoose.model('reporte',ReporteSchema);