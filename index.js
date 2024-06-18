const express = require('express');
const conectarDB = require('./config/db');
const router = require('./routes/producto');
const user_router = require('./routes/user');
const cors= require("cors");

//Creamos el servidor
const app = express();

//Conectamos a la base de datos
conectarDB();
app.use(cors())


app.use(express.json());

app.use('/api/productos', require('./routes/producto'));
app.use('/api/users', require('./routes/user'));


app.listen(4000, ()=>{
    console.log('El servidor está corriendo perfectamente')
})