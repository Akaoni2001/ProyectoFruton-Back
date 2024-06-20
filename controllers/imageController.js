const Image = require("../models/Image");


exports.uploadimage = async (req, res) => {
    try {
        let image;
        image = new Image( req.body );
        await image.save();

        res.status(200).json({ message: 'Imagen cargada con exito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error' });
    }
};