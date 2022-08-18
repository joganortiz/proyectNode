const express = require("express");
const cors = require('cors')
require('dotenv').config()

//crea el servidor de express
const app = express();

// Configurar CORS
app.use(cors())

app.use( express.static('public'));

app.use('/api', require('./src/app/app'));

app.listen(process.env.PORT, () => {
    console.log("servidor corriendo en puerto "+ process.env.PORT)
});