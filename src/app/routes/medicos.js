const { Router } = require('express');
const {check} = require('express-validator');
const Middlewares = require('../../middlewares/validadores');
const Medicos = require('../../controllers/medicos');

const validar = new Middlewares(); //creamos los objetos de los middleware
const medicos = new Medicos(); //creamos el objeto de hospital

const router = Router();

// Rutas
router.get('/',validar.validarJWT, medicos.getMedicos);

router.get('/:id', medicos.getMedico);

router.post('/', [
    validar.validarJWT,
    check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
    check('hospital', 'El hospital id debe ser válido').isMongoId(),
    validar.validarCampos
], medicos.setMedico);

router.put('/:id', [], medicos.updateMedico);

router.delete('/:id', medicos.deleteMedico);

module.exports = router;
