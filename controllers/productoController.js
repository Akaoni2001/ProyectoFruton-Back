const {Producto} = require("../models/Producto");
const mongoose = require('mongoose');

exports.crearProducto = async (req, res)=> {
    
    try {
        let producto;

        //Creamos nuestro producto
        producto= new Producto(req.body);
        producto.estado = (producto.stock === 0) ? false : true;
        await producto.save();
        res.send(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerProductos = async(req,res)=>{
    console.log("hola");
    try {
        
        const productos = await Producto.find();
        res.json(productos)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarProductos = async(req,res)=>{
    console.log("aol")
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

        producto.estado = (producto.stock === 0) ? false : true;

        producto = await Producto.findOneAndUpdate({ _id: req.params.id}, producto, {new:true})
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarEstado = async(req,res)=>{
    console.log(req.body);
    try {
        const {estado} = req.body;

        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'No existe el producto'})
        }

        producto.estado = estado;

        
        producto = await Producto.findOneAndUpdate({ _id: req.params.id}, producto, {new:true})
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarStock = async (req, res) => {
    try {
        const productosActualizados = [];

        const productos = req.body;

        if (!Array.isArray(productos)) {
            return res.status(400).json({ msg: 'El cuerpo de la solicitud debe ser un arreglo' });
        }

        for (const { id, stock } of productos) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: `ID no válido: ${id}` });
            }

            const objectId = new mongoose.Types.ObjectId(id);
            let producto = await Producto.findById(objectId);

            if (!producto) {
                return res.status(404).json({ msg: `No existe el producto con ID ${id}` });
            }

            producto.stock = stock;
            producto.estado = (producto.stock === 0) ? false : true;

            const productoActualizado = await Producto.findOneAndUpdate({ _id: objectId }, producto, { new: true });
            productosActualizados.push(productoActualizado);
        }

        res.json(productosActualizados);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};




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

