const Reporte = require('../models/reporte');

exports.crearReporte = async(req,res)=>{
    try {
        let reporte;

        //Creamos una nueva categoria
        reporte= new Reporte(req.body);

        await reporte.save();
        res.send(reporte);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerReportes = async(req,res)=>{

    try {
        
        const reportes = await Reporte.find();
        res.json(reportes)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}