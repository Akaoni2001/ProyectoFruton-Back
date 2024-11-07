const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController')

router.post('/registrar', pedidoController.registrarPedido);
router.get('/', pedidoController.obtenerPedidos);
router.get('/:id', pedidoController.obtenerPedidoPorId);
router.put('/:id/estado', pedidoController.actualizarEstadoPedido);
router.delete('/:id', pedidoController.eliminarPedido);

module.exports = router;