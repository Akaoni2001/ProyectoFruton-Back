const tipoProducto = require("../models/tipoProducto");

exports.crearTipoProducto = async (req, res)=> {
    
    try {
        let producto;

        //Creamos nuestro producto
        producto= new tipoProducto(req.body);

        await producto.save();
        res.send(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerTipoProductos = async(req,res)=>{

    try {
        
        const productos = await tipoProducto.find();
        res.json(productos)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarTipoProductos = async(req,res)=>{

    try {
        
        const {nombre,descripcion,categoria,precio,stock} = req.body;
        let producto = await tipoProducto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'No existe el producto'})
        }

        producto.nombre= nombre;
        producto.descripcion= descripcion;
        producto.categoria= categoria;
        producto.precio= precio;
        producto.stock= stock;

        producto = await tipoProducto.findOneAndUpdate({ _id: req.params.id}, producto, {new:true})
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerTipoProducto = async(req,res)=>{

    try {
        let producto = await tipoProducto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'No existe el producto'})
        }

        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.eliminarTipoProducto = async(req,res)=>{

    try {
        let producto = await tipoProducto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        await tipoProducto.deleteOne({ _id: req.params.id }); // Eliminar el producto por su ID

        return res.json({ msg: 'Producto eliminado con éxito' }); // Asegúrate de devolver la respuesta aquí
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Hubo un error');
    }

}