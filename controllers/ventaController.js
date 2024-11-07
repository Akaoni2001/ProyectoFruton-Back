const Venta = require('../models/Venta');
const {Producto} = require('../models/Producto');
const Pedido = require('../models/Pedido');

exports.registrarVenta = async (req,res)=>{
    try {
        const { nombreCliente, productos, cantidades, precioTotal } = req.body;

        const productosDetalles = [];
        
        for (const productoId of productos) {
            const producto = await Producto.findById(productoId);
            if (!producto) {
                return res.status(404).json({ message: `Producto con ID ${productoId} no encontrado` });
            }
            productosDetalles.push(producto);
        }

        
        const nuevaVenta = new Venta({
            nombreCliente: nombreCliente,
            productos: productosDetalles,
            cantidades: cantidades,
            precioTotal: precioTotal,
            fechaVenta: Date.now()
        });

        
        await nuevaVenta.save();

        
        const nuevoPedido = new Pedido({
            nombreCliente: nombreCliente,
            productos: productos, 
            cantidades: cantidades
        });

        await nuevoPedido.save();

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