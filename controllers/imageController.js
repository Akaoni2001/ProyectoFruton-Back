const Image = require("../models/Image");
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Importar módulo de sistema de archivos

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardan las imágenes temporalmente
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Asignamos un nombre único
  }
});

const upload = multer({ storage: storage });

exports.uploadimage = async (req, res) => {
    try {
      // Leer el archivo y convertirlo a Base64
      const imagePath = path.join(__dirname, '..', 'uploads', req.file.filename);
      const imageBuffer = fs.readFileSync(imagePath);
      const imageBase64 = imageBuffer.toString('base64');
      
      // Guardar en MongoDB
      const image = new Image({ data: imageBase64 });
      await image.save();
  
      res.status(200).json({ message: 'Imagen cargada y guardada con éxito en MongoDB' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error al subir la imagen' });
    }
};

exports.getImages = async (req, res) => {
    try {
      const images = await Image.find(); // Obtiene todas las imágenes
      res.status(200).json(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener imágenes' });
    }
};