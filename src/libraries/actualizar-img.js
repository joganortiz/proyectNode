const fs = require('fs');

const Hospital = require("../models/hospital");
const Medico = require("../models/medico");
const Usuario = require('../models/usuario');

/**
 * @author Jogan Ortiz Muñoz
 * @description borra una imagen o archivo enviandole el path
 * @date 2022-08-15
 * @returns;
 */
const borrarImagen = (path) => {
    if(fs.existsSync(path)){
        // borrar la imagen
        fs.unlinkSync(path);
    }
}


/**
 * @author Jogan Ortiz Muñoz
 * @description actualiza el campo de la imagen a 'usuario, medico o hospital'
 * @date 2022-08-15
 * @returns true | false
 */
const actualizarImagen = async(id, tipo, nombreArchivo) => {
    let pathViejo = '';
    switch (tipo) {
        case 'hospitales':
            const hospitale = await Hospital.findById(id);
            if(!hospitale){
                console.log('no hay un hospital con ese id');
                return false;
            }

            pathViejo = __dirname + `/../uploads/${tipo}/${hospitale.img}`;
            borrarImagen(pathViejo);

            hospitale.img = nombreArchivo;
            await hospitale.save();

            //return true;
        break;

        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                console.log('no hay un hospital con ese id');
                return false;
            }

            pathViejo = __dirname + `/../uploads/${tipo}/${medico.img}`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();

            return true;
        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('no hay un hospital con ese id');
                return false;
            }

            pathViejo = __dirname + `/../uploads/${tipo}/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();

            return true;
        break;
    
        default:
        break;
    }
}


module.exports = actualizarImagen;