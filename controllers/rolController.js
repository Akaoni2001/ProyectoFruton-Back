const Rol = require('../models/Rol');

exports.crearRol = async(req,res)=>{
    try {
        let rol;

        //Creamos un nuevo rol
        rol= new Rol(req.body);

        await rol.save();
        res.send(rol);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerRoles = async(req,res)=>{

    try {
        const roles = await Rol.find(); // Cambia 'rol' por 'Rol'
        res.json(roles);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarRoles = async(req,res)=>{

    try {
        
        const {nombreRol} = req.body;
        let rol = await Rol.findById(req.params.id);

        if(!rol){
            res.status(404).json({msg: 'No existe el rol'})
        }

        rol.nombreRol= nombreRol;

        rol = await Rol.findOneAndUpdate({ _id: req.params.id}, rol, {new:true})
        res.json(rol);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerRol = async(req,res)=>{

    try {
        let rol = await Rol.findById(req.params.id);

        if(!rol){
            res.status(404).json({msg: 'No existe el rol'})
        }

        res.json(rol);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.eliminarRol = async(req,res)=>{

    try {
        let rol = await Rol.findById(req.params.id);

        if (!rol) {
            return res.status(404).json({ msg: 'No existe el rol' });
        }

        await Rol.deleteOne({ _id: req.params.id }); // Eliminar el rol por su id

        return res.json({ msg: 'Rol eliminado con éxito' }); // Asegúrate de devolver la respuesta aquí
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Hubo un error');
    }

}