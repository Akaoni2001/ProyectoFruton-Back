const User = require('../models/Users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
    const { nombres, apellidos, email, password, role } = req.body;
    try {
        let usuario = await User.findOne({ email });

        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        usuario = new User({ nombres, apellidos, email, password, role });

        // Encriptar el password
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        await usuario.save();
        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        const isMatch = await bcrypt.compare(password, usuario.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1 hora
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Listar usuarios
exports.listar = async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Obtener un usuario por ID
exports.get_user = async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Editar un usuario
exports.editar = async (req, res) => {
    const { nombres, apellidos, email, role } = req.body;
    try {
        let usuario = await User.findById(req.params.id);

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        usuario.nombres = nombres;
        usuario.apellidos = apellidos;
        usuario.email = email;
        usuario.role = role;

        usuario = await User.findByIdAndUpdate(req.params.id, usuario, { new: true });

        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Eliminar un usuario
exports.eliminar = async (req, res) => {
    try {
        let usuario = await User.findById(req.params.id);

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        await User.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Usuario eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

