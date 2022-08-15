const {response} = require('express');
const Hospital = require('../models/hospital');

/**
 * @class Hospitales
 * @author Jogan Ortiz Muñoz
 * @date 2022-08-10
 */
class Hospitales {

    /**
     * @author Jogan Ortiz Muñoz
     * @description traera todos los hospitales que hay en la base de datos
     * @date 2022-08-10
     * @returns json
     */
    getHospitals = async (req, res = response) => {
        try {
            const hospitales = await Hospital.find({delete: false}).populate('usuario', 'nombre');

            return res.status(200).json({
                ok: true,
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
     * @description traera un hospital por Id de la base de datos
     * @date 2022-08-10
     * @returns json
     */
    getHospital = async (req, res = response) => {
        return res.status(200).json({
            ok: true,
            msg: 'llego al contralador funcion getHospital'
        });
    }

    /**
     * @author Jogan Ortiz Muñoz
     * @description creara un hospital nuevo en la base de datos
     * @date 2022-08-10
     * @returns json
     */
    setHospital = async(req, res = response) => {
        const uid       = req.uid;
        try {
            const existNombre = await Hospital.findOne({nombre: req.body.nombre});
            if(existNombre){
                return res.status(400).json({
                    ok: false,
                    msg: 'El Hospital ya esta registrado'
                });
            }

            const hospital  =  new Hospital({usuario: uid, ...req.body});

            const hospitalDB = await hospital.save();

            return res.status(200).json({
                ok: true,
                hospital: hospitalDB
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
     * @description se actualiza un hospital por el id
     * @date 2022-08-10
     * @returns json
     */
     updateHospital = async (req, res = response) => {
        return res.status(200).json({
            ok: true,
            msg: 'llego al contralador funcion updateHospital'
        });
    }

    /**
     * @author Jogan Ortiz Muñoz
     * @description elimina un hospital de la base de datos
     * @date 2022-08-10
     * @returns json
     */
    deleteHospital = async (req, res = response) => {
        return res.status(200).json({
            ok: true,
            msg: 'llego al contralador funcion deleteHospital'
        });
    }
}

module.exports = Hospitales