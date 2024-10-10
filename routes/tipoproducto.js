//Rutas para tipo producto
const express = require('express');
const router = express.Router();
const tipoproductoController = require('../controllers/tipoproductoController');

// api/tipoproducto
router.post('/', tipoproductoController.crearTipoProducto);
router.get('/', tipoproductoController.obtenerTipoProductos);
router.put('/:id', tipoproductoController.actualizarTipoProductos);
router.get('/:id', tipoproductoController.obtenerTipoProducto);
router.delete('/:id', tipoproductoController.eliminarTipoProducto);

module.exports = router;