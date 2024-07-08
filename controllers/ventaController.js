const Venta = require('../models/Venta');
const Producto = require('../models/Producto');

exports.registrarVenta = async (req,res)=>{
    try {
        const { nombreCliente, productoId, cantidad } = req.body;

        // Verificar que el producto exista
        const producto = await Producto.findById(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Crear una nueva venta
        const nuevaVenta = new Venta({
            nombreCliente,
            producto: productoId,
            cantidad,
            precioProducto: producto.precio // Tomar el precio del producto
        });

        // Guardar la venta en la base de datos
        await nuevaVenta.save();

        res.status(201).json(nuevaVenta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar la venta' });
    }
}

exports.obtenerVentas= async(req,res)=>{
    try {
        const ventas = await Venta.find().populate('producto');
        res.status(200).json(ventas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las ventas' });
    }
}