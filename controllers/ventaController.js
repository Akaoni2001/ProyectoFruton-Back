const Venta = require('../models/Venta');
const {Producto} = require('../models/Producto');

exports.registrarVenta = async (req,res)=>{
    try {
        const { nombreCliente, productos, cantidades, precioTotal } = req.body; // `productos` y `cantidad` son arreglos

        const productosDetalles = [];
        // Validar que cada producto en el arreglo existe
        for (const productoId of productos) {
            const producto = await Producto.findById(productoId);
            if (!producto) {
                return res.status(404).json({ message: `Producto con ID ${productoId} no encontrado` });
            }
            productosDetalles.push(producto);
        }

        // Crear una nueva venta con los productos, cantidades y precio total recibido
        const nuevaVenta = new Venta({
            nombreCliente: nombreCliente,
            productos: productosDetalles,
            cantidades: cantidades,
            precioTotal: precioTotal,
            fechaVenta: Date.now()
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
        const ventas = await Venta.find();
        res.json(ventas)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener las ventas')
    }
}