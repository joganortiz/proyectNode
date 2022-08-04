const { Router } = require('express');
const usuarios = require('../../controllers/usuarios');

const Users = new usuarios(); //creamos el objeto de usuarios

const router = Router();

// Rutas
router.get('/', Users.getUsuarios);

router.post('/', Users.setUsuarios);

module.exports = router