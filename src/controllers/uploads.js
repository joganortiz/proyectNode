const path = require('path');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const actualizarImagen = require("../libraries/actualizar-Img");
const fs  = require('fs');

/**
 * @class Uploads
 * @author Jogan Ortiz Muñoz
 * @date 2022-08-15
 */
class Uploads {

    /**
     * @author Jogan Ortiz Muñoz
     * @description actualiza la imagen a cada dato de la tabla 'usuarios, medicos, hospitales'
     * @date 2022-08-15
     * @returns json
     */
    fileUpload = async(req, res = response) => {
        try {
            const tipo  = req.params.tipo;
            const id    = req.params.id;
    
            // validar tipo
            const tiposValidos  = ['hospitales', 'medicos', 'usuarios'];
            if( !tiposValidos.includes(tipo)){
                return res.status(400).json({
                    ok: false,
                    msg: 'no se puede guardar la  imagen'
                });
            }
    
            // validar que exista un archivo
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send({
                    ok: false,
                    msg: 'no hay ningun archivo'
                });
            }
    
            //procesar la imagen..
            const imagen = req.files.imagen;
    
            // imagenes permitidas
            const extencionesValidas = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
            if( !extencionesValidas.includes(imagen.mimetype)){
                return res.status(400).send({
                    ok: false,
                    msg: 'no es una extencion permitida'
                });
            }
    
            // generar imagen
            const mimetype = imagen.mimetype;
            const extencion = mimetype.split('/');
            const nombreArchivo = `${uuidv4()}.${extencion[1]}`;
    
            // path para guardar la imagen
            const uploadPath = __dirname + `/../uploads/${tipo}/${nombreArchivo}`;
    
            imagen.mv(uploadPath, (err) => {
                if (err){
                    console.log(err)
                    return res.status(500).json({
                        ok: false,
                        msg: 'Error al cargar la imagen'
                    });
                }
    
                actualizarImagen(id, tipo, nombreArchivo);
            
                res.json({
                    ok: true,
                    msg: 'archivo subido',
                    nombreArchivo
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error inesperado'
            }); 
        }
    }

    /**
     * @author Jogan Ortiz Muñoz
     * @description muetra la imagen ya sea de un 'usuario, medico o hospital' si no existe tra una por defecto
     * @date 2022-08-15
     * @returns sendFile
     */
    getImg = (req, res = response) => {
        const {tipo, img} = req.params;

        try {
            const pathImg = path.join( __dirname + `/../uploads/${tipo}/${img}`);
            
            // imagen por defecto si no existe
            if(!fs.existsSync(pathImg)){
                const pathNotImg = path.join( __dirname + `/../uploads/no-image.png`);
                return res.sendFile(pathNotImg);
            }

            return res.sendFile(pathImg);
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error inesperado'
            });  
        }
    }
}

module.exports = Uploads;