//Rutas para producto
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

//api/productos
router.post('/', productoController.crearProducto);
router.get('/', productoController.obtenerProductos);
router.put('/editar-producto/:id', productoController.actualizarProductos);
router.get('/:id', productoController.obtenerProducto);
router.delete('/:id', productoController.eliminarProducto)
router.put('/:id', productoController.actualizarEstado);
router.put('/', productoController.actualizarStock);

module.exports= router;