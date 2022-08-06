const { Router } = require('express');
const {check} = require('express-validator');
const Middlewares = require('../../middlewares/validadores');
const Auth = require('../../controllers/auth');

const auth = new Auth(); //inicializamos el objeto de Auth
const validar = new Middlewares(); //inicializamos el objeto de middlewares

const router = Router();

router.post('/login', [
    check('email', "El email es obligatorio").isEmail(),
    check('password', "La constraseña es obligatorio").not().isEmpty(),
    validar.validarCampos
], auth.login );


module.exports = router;
