const User = require('../models/Users')
const bcrypt = require('bcryptjs');
const { createToken } = require('../helpers/jwt');

exports.registrar = async (req, res) => {
    const { nombres, apellidos, email, password, role } = req.body;
    try {
        let usuarioExistente = await User.findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        const usuario = new User({ nombres, apellidos, email, password, role });

        // Encriptar el password
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        await usuario.save();

        // Generar el token
        const token = createToken(usuario);

        res.status(201).json({ token, usuario });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al registrar el usuario');
    }
};

// Login de usuario
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        const isMatch = await bcrypt.compare(password, usuario.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        // Generar el token
        const token = createToken(usuario);

        res.json({ token, usuario });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al iniciar sesión');
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

        await User.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Usuario eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

