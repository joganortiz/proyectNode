const { Router } = require('express');
const {check} = require('express-validator');
const expressfileUpload = require('express-fileupload');
const Uploads = require('../../controllers/uploads');
const Middlewares = require('../../middlewares/validadores');

const validar = new Middlewares(); //creamos los objetos de los middleware
const upload = new Uploads(); //creamos los objetos de los oploads

const router = Router();

router.use(expressfileUpload());

// Rutas
router.put('/:tipo/:id',[
    validar.validarJWT,
    check('id', 'El id debe ser válido').isMongoId(),
    validar.validarCampos
], upload.fileUpload);

router.get('/:tipo/:img', upload.getImg);

module.exports = router;