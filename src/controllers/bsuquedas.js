const {response} = require('express');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const usuario = require('../models/usuario');

/**
 * @class Busquedas
 * @author Jogan Ortiz Muñoz
 * @date 2022-08-15
 */
class Busquedas {

    /**
     * @author Jogan Ortiz Muñoz
     * @description Trae todas las busquedas de las tablas que existan con la busqueda
     * @date 2022-08-15
     * @returns json
     */
    getTodo = async(req, res = response) => {
        try {
            const busqueda = req.params.busqueda;
            const regx      = new RegExp(busqueda, 'i');
    
            const [usuarios, medicos, hospitales] = Promise.all([
                usuario.find({nombre: regx }),
                Medico.find({nombre: regx}),
                Hospital.find({nombre: regx})
            ]);
    
            return res.status(200).json({
                ok: true,
                usuarios,
                medicos,
                hospitales
            })
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
     * @description Trae todos los registo que existena en la tabla con la busqueda
     * @date 2022-08-15
     * @returns json
     */
    getDocumentacionColeccion = async(req, res = response) => {
        const tabla    = req.params.tabla;
        const busqueda = req.params.Busquedas;
        const regex    = new RegExp(busqueda, 'i');
        let data       = [];

        switch (tabla) {
            case 'medicos':
                data  = await Medico.find({nombre: regex });
            break;

            case 'hospitales':
                data  = await Hospital.find({nombre: regex });
                
            break;

            case 'usuarios':
                data  = await usuario.find({nombre: regex });
                
            break;
        
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'no se encuentra ningun registro'
                });
        }

        return res.status(200).json({
            ok: true,
            data
        });
    }
}

module.exports = Busquedas;