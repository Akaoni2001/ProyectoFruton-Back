const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');



router.post('/registrar', reporteController.crearReporte );
router.get('/', reporteController.obtenerReportes);

module.exports = router;