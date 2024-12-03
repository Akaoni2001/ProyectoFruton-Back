const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.post('/registrar', userController.registrar);
router.post('/login',userController.login);
router.get('/usuarios', userController.listar,authMiddleware);
router.put('/usuario/editar/:id', userController.editar,authMiddleware);
router.get('/usuario/:id', userController.get_user,authMiddleware);
router.delete('/usuario/eliminar/:id', userController.eliminar,authMiddleware);

module.exports = router;

