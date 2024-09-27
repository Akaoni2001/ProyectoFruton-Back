const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController')
const multer = require('multer');

// Configurar multer para manejar la carga de imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Carpeta donde guardarás las imágenes
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });
  
  router.post('/upload', upload.single('image'), imageController.uploadimage);
  router.get('/all', imageController.getImages);
  
  module.exports = router;