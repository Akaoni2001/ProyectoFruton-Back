const {Producto} = require("../models/Producto");


exports.crearProducto = async (req, res)=> {
    
    try {
        let producto;

        //Creamos nuestro producto
        producto= new Producto(req.body);

        await producto.save();
        res.send(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerProductos = async(req,res)=>{

    try {
        
        const productos = await Producto.find();
        res.json(productos)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarProductos = async(req,res)=>{

    try {
        
        const {nombre,descripcion,categoria,precio,stock,imagen} = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'No existe el producto'})
        }

        producto.nombre= nombre;
        producto.descripcion= descripcion;
        producto.categoria= categoria;
        producto.precio= precio;
        producto.stock= stock;
        producto.imagen= imagen;

        producto = await Producto.findOneAndUpdate({ _id: req.params.id}, producto, {new:true})
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerProducto = async(req,res)=>{

    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'No existe el producto'})
        }

        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.eliminarProducto = async(req,res)=>{

    try {
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        await Producto.deleteOne({ _id: req.params.id }); // Eliminar el producto por su ID

        return res.json({ msg: 'Producto eliminado con éxito' }); // Asegúrate de devolver la respuesta aquí
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Hubo un error');
    }

}