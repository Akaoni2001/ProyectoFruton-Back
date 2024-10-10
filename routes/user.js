const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/registrar', userController.registrar);
router.post('/login',userController.login);
router.get('/usuarios', userController.listar);
router.put('/usuario/editar/:id', userController.editar);
router.get('/usuario/:id', userController.get_user);
router.delete('/usuario/eliminar/:id', userController.eliminar);

module.exports = router;

