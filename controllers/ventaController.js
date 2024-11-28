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

        if(productosDetalles.length==0){
            return res.status(404).json({ message: `No hay productos en la lista ` });
            
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

exports.editarVenta = async (req, res) => {
    try {
        const { id } = req.params; 
        const { nombreCliente, productos, cantidades, precioTotal } = req.body;

        const productosDetalles = [];
        for (const productoId of productos) {
            const producto = await Producto.findById(productoId);
            if (!producto) {
                return res.status(404).json({ message: `Producto con ID ${productoId} no encontrado` });
            }
            productosDetalles.push(producto);
        }

        if (productosDetalles.length === 0) {
            return res.status(400).json({ message: 'La lista de productos no puede estar vacía' });
        }

        // Buscar la venta y actualizarla
        const ventaExistente = await Venta.findById(id);
        if (!ventaExistente) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        ventaExistente.nombreCliente = nombreCliente;
        ventaExistente.productos = productosDetalles;
        ventaExistente.cantidades = cantidades;
        ventaExistente.precioTotal = precioTotal;
        ventaExistente.fechaVenta = Date.now(); 

        await ventaExistente.save();

        res.status(200).json({ message: 'Venta actualizada exitosamente', venta: ventaExistente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la venta' });
    }
};



exports.obtenerVentas= async(req,res)=>{
    try {
        const ventas = await Venta.find();
        res.json(ventas)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener las ventas')
    }
}