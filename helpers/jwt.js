const jwt = require('jsonwebtoken');

// Generar un JWT
exports.createToken = (user) => {
    const payload = {
        id: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.role,
    };

    return jwt.sign(payload, process.env.SECRET, {
        expiresIn: '1m', // Expiración de 1 hora
    });
};

// Verificar un JWT
exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (error) {
        return null;
    }
};