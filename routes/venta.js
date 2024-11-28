const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

router.post('/registrar',ventaController.registrarVenta);
router.put('/:id',ventaController.editarVenta);
router.get('/', ventaController.obtenerVentas)

module.exports = router;