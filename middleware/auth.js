const { verifyToken } = require('../helpers/jwt');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso no válido' });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ msg: 'Token inválido o expirado' });
    }

    req.usuario = decoded; // Guardamos los datos del usuario en la petición
    next();
};

module.exports = authMiddleware;