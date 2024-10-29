const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');



router.post('/registrar', rolController.crearRol );
router.get('/', rolController.obtenerRoles);
router.put('/:id', rolController.actualizarRoles);
router.get('/:id', rolController.obtenerRol);
router.delete('/:id', rolController.eliminarRol);

module.exports = router;