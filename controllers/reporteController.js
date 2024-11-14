const Reporte = require('../models/Reporte');
const Pedido = require('../models/Pedido');

exports.crearReclamo = async(req,res)=>{
    try {
        let reclamo;

        reclamo= new Reporte(req.body);

        await reclamo.save();
        res.send(reclamo);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerReclamos = async(req,res)=>{

    try {        
        const reclamo = await Reporte.find();
        res.json(reclamo)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarReclamo = async (req, res) => {
    try {
        const { descripcionReclamo, tipoReclamo } = req.body;
        let reclamo = await Reporte.findById(req.params.id);

        if (!reclamo) {
            return res.status(404).json({ msg: 'No existe el reclamo' });
        }

        reclamo.descripcionReclamo = descripcionReclamo || reclamo.descripcionReclamo;
        reclamo.tipoReclamo = tipoReclamo || reclamo.tipoReclamo;

        reclamo = await reclamo.save();
        res.json(reclamo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.eliminarReclamo = async (req, res) => {
    try {
        let reclamo = await Reporte.findById(req.params.id);

        if (!reclamo) {
            return res.status(404).json({ msg: 'No existe el reclamo' });
        }

        await Reporte.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Reclamo eliminado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

BuscarReclamo = async(reclamo)=>{
    try {
        const reclamo = await Reporte.find({ reclamo:reclamo });
       
    } catch (error) {
        console.log(error);
    }
}