const mongoose = require('mongoose');

const CategoriaSchema = mongoose.Schema({
    nombreCategoria:{
        type:String,
        require:true
    },
    fechaCreacion:{
        type:Date,
        default:Date.now()
    }
    
})

module.exports = mongoose.model('Categoria',CategoriaSchema);