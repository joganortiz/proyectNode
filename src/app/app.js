const  Router  = require('express'); 
const {dbConnetion} = require('../libraries/conexion');

const routers = Router(); //creando el servidor de express

// base de datos
dbConnetion();

routers.use( Router.json())

// Route of users
routers.use('/usuarios', require('./routes/usuarios'));

// Route of login
routers.use('/auth', require('./routes/auth'));


module.exports = routers;