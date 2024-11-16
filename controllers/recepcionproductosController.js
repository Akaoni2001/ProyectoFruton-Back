const recepcionProductos = require("../models/recepcionProductos");

exports.crearRecepcionProductos = async (req, res)=> {
    
    try {
        let producto;

        //Creamos nuestro producto
        producto= new recepcionProductos(req.body);

        await producto.save();
        res.send(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerRecepcionProductoPorId = async (req, res) => {
    try {
        let producto = await recepcionProductos.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        return res.json(producto);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.actualizarRecepcionProductos = async(req,res)=>{

    try {
        
        const {nombre,descripcion,categoria,estado,precio} = req.body;
        let producto = await recepcionProductos.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'No existe el producto'})
        }

        producto.nombre= nombre;
        producto.descripcion= descripcion;
        producto.categoria= categoria;
        producto.estado= estado;
        producto.precio= precio;

        producto = await recepcionProductos.findOneAndUpdate({ _id: req.params.id}, producto, {new:true})
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerRecepcionProductos = async (req, res) => {
    try {
        const productos = await recepcionProductos.find();
        return res.json(productos);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
};

exports.eliminarRecepcionProducto = async(req,res)=>{

    try {
        let producto = await recepcionProductos.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        await recepcionProductos.deleteOne({ _id: req.params.id }); // Eliminar el producto por su ID

        return res.json({ msg: 'Producto eliminado con éxito' }); // Asegúrate de devolver la respuesta aquí
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Hubo un error');
    }

}