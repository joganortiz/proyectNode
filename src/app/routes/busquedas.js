const { Router } = require('express');
const {check} = require('express-validator');
const Busquedas = require('../../controllers/bsuquedas');
const Middlewares = require('../../middlewares/validadores');

const validar = new Middlewares(); //creamos los objetos de los middleware
const busqueda = new Busquedas();

const router = Router();

// Rutas
router.get('/:busqueda',validar.validarJWT, busqueda.getTodo);

router.get('/coleccion/:tabla/:busqueda',validar.validarJWT, busqueda.getDocumentacionColeccion);

module.exports = router;