//Rutas para recepcion de productos
const express = require('express');
const router = express.Router();
const recepcionproductosController = require('../controllers/recepcionproductosController');

// api/recepcionproductos
router.post('/', recepcionproductosController.crearRecepcionProductos);
router.get('/', recepcionproductosController.obtenerRecepcionProductos);
router.put('/:id', recepcionproductosController.actualizarRecepcionProductos);
router.get('/:id', recepcionproductosController.obtenerRecepcionProductoPorId);
router.delete('/:id', recepcionproductosController.eliminarRecepcionProducto);

module.exports = router;