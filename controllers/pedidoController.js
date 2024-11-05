const Pedido = require('../models/Pedido');

exports.registrarPedido = async (req, res) => {
    try {
        const { nombreCliente, productos, cantidades } = req.body;

        // Crear un nuevo pedido con los datos recibidos
        const nuevoPedido = new Pedido({
            nombreCliente: nombreCliente,
            productos: productos,
            cantidades: cantidades
            
        });

        // Guardar el nuevo pedido en la base de datos
        await nuevoPedido.save();

        res.status(201).json(nuevoPedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el pedido' });
    }
};

exports.obtenerPedidos = async (req, res) => {
    try {
        // Obtener todos los pedidos de la base de datos
        const pedidos = await Pedido.find().populate('productos'); 
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener los pedidos');
    }
};

exports.obtenerPedidoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findById(id).populate('productos');
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.json(pedido);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener el pedido');
    }
};

exports.actualizarEstadoPedido = async (req, res) => {
    try {
        const { estado } = req.body;
        let pedido = await Pedido.findById(req.params.id);

        if (!pedido) {
            return res.status(404).json({ msg: 'No existe el pedido' });
        }

        pedido.estado = estado;

        // Guarda el pedido actualizado
        const pedidoActualizado = await pedido.save();
        res.json(pedidoActualizado); // Devuelve el pedido actualizado

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.eliminarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedidoEliminado = await Pedido.findByIdAndDelete(id);
        if (!pedidoEliminado) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.json({ message: 'Pedido eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar el pedido');
    }
};
