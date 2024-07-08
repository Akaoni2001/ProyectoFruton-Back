const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');



router.post('/registrar', categoriaController.crearCategoria );
router.get('/', categoriaController.obtenerCategorias);
router.put('/:id', categoriaController.actualizarCategorias);
router.get('/:id', categoriaController.obtenerCategoria);
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;