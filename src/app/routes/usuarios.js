const { Router } = require('express');
const {check} = require('express-validator');
const Middlewares = require('../../middlewares/validadores');
const usuarios = require('../../controllers/usuarios');

const Users = new usuarios(); //creamos el objeto de usuarios
const validar = new Middlewares(); //creamos los objetos de los middleware

const router = Router();

// Rutas
router.get('/', validar.validarJWT, Users.getUsers);

router.get('/:id', validar.validarJWT, Users.getUser);

router.get('/existemail/:id/:email', Users.getExistEmail);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validar.validarCampos
], Users.setUser);

router.put('/:id', [
    validar.validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    //check('role', 'El rol es obligatorio').not().isEmpty(),
    validar.validarCampos
],Users.updateUser);

router.delete('/:id', validar.validarJWT, Users.deleteUser);

module.exports = router;