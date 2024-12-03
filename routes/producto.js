//Rutas para producto
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const authMiddleware = require('../middleware/auth');

//api/productos
router.post('/', productoController.crearProducto,authMiddleware);
router.get('/', productoController.obtenerProductos ,authMiddleware);
router.put('/editar-producto/:id', productoController.actualizarProductos);
router.get('/:id', productoController.obtenerProducto);
router.delete('/:id', productoController.eliminarProducto)
router.put('/:id', productoController.actualizarEstado);
router.put('/', productoController.actualizarStock);

module.exports= router;