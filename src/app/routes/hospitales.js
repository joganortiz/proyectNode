const { Router } = require('express');
const {check} = require('express-validator');
const Hospitales = require('../../controllers/hospitales');
const Middlewares = require('../../middlewares/validadores');

const validar = new Middlewares(); //creamos los objetos de los middleware
const hospitales = new Hospitales(); //creamos el objeto de hospital

const router = Router();

// Rutas
router.get('/', validar.validarJWT, hospitales.getHospitals);

router.get('/:id', hospitales.getHospital);

router.post('/', [
    validar.validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validar.validarCampos
], hospitales.setHospital);

router.put('/:id', [
    validar.validarJWT,
    check('id', 'El ID debe ser válido').isMongoId(),
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validar.validarCampos
], hospitales.updateHospital);

router.delete('/:id', [
    validar.validarJWT,
    check('id', 'El ID debe ser válido').isMongoId(),
    validar.validarCampos
], hospitales.deleteHospital);




module.exports = router;
