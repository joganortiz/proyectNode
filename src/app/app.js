const { Router } = require('express'); 
const {dbConnetion} = require('../libraries/conexion');

const routers = Router(); //creando el servidor de express

// base de datos
dbConnetion();

// Route of users
routers.use('/usuarios', require('./routes/usuarios'));


module.exports = routers;