const express = require("express");
const cors = require('cors')
require('dotenv').config()

const {dbConnetion} = require('./database/config');

//crea el servidor de express
const app = express();

// Configurar CORS
app.use(cors())

// base de datos
dbConnetion();

// Rutas
app.get('/', (req, res) => {
    res.status(404).json({
        ok: true,
        msg: 'hola mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log("servidor corriendo en puerto "+ process.env.PORT)
});