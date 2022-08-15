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

// Route of Hospitals
routers.use('/hospitales', require('./routes/hospitales'));

// Route of doctors
routers.use('/medicos', require('./routes/medicos'));

// Route of all
routers.use('/all', require('./routes/busquedas'));

// Route of uploads
routers.use('/upload', require('./routes/uploads'));


module.exports = routers;