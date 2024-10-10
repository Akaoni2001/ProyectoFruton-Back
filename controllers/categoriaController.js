const Categoria = require('../models/Categoria');

exports.crearCategoria = async(req,res)=>{
    try {
        let categoria;

        //Creamos una nueva categoria
        categoria= new Categoria(req.body);

        await categoria.save();
        res.send(categoria);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerCategorias = async(req,res)=>{

    try {
        
        const categoria = await Categoria.find();
        res.json(categoria)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarCategorias = async(req,res)=>{

    try {
        
        const {nombreCategoria} = req.body;
        let categoria = await Categoria.findById(req.params.id);

        if(!categoria){
            res.status(404).json({msg: 'No existe la categoria'})
        }

        producto.nombreCategoria= nombreCategoria;

        categoria = await Categoria.findOneAndUpdate({ _id: req.params.id}, categoria, {new:true})
        res.json(categoria);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerCategoria = async(req,res)=>{

    try {
        let categoria = await Categoria.findById(req.params.id);

        if(!categoria){
            res.status(404).json({msg: 'No existe la categoria'})
        }

        res.json(categoria);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.eliminarCategoria = async(req,res)=>{

    try {
        let categoria = await Categoria.findById(req.params.id);

        if (!categoria) {
            return res.status(404).json({ msg: 'No existe la categoria' });
        }

        await Categoria.deleteOne({ _id: req.params.id }); // Eliminar el producto por su ID

        return res.json({ msg: 'Categoria eliminada con éxito' }); // Asegúrate de devolver la respuesta aquí
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Hubo un error');
    }

}