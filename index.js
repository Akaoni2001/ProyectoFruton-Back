const express = require('express');
const mongoose = require('mongoose');
const conectarDB = require('./config/db');
const bodyParser = require('body-parser');
const cors= require("cors");

//Creamos el servidor
const app = express();
app.use(bodyParser.json());

//Conectamos a la base de datos
conectarDB();
app.use(cors())

app.use('/uploads', express.static('uploads'));

app.use(express.json());

app.use('/api/productos', require('./routes/producto'));
app.use('/api/users', require('./routes/user'));
app.use('/api/images', require('./routes/image'));
app.use('/api/ventas', require('./routes/venta'));
app.use('/api/categorias', require('./routes/categoria'));


app.listen(4000, ()=>{
    console.log('El servidor está corriendo perfectamente')
})

const PORT = process.env.PORT || 4200;
mongoose.connect(process.env.DB_MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));