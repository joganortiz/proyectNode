const {response} = require('express');
const Medico = require('../models/medico');

/**
 * @class Medicos
 * @author Jogan Ortiz Muñoz
 * @date 2022-08-10
 */
class Medicos {

    /**
     * @author Jogan Ortiz Muñoz
     * @description traera todos los medicos que hay en la base de datos
     * @date 2022-08-10
     * @returns json
     */
    getMedicos = async (req, res = response) => {
        try {
            const medicos = await Medico.find({delete: false})
                            .populate('usuario', 'nombre')
                            .populate('hospital', 'nombre');

            return res.status(200).json({
                ok: true,
                medicos
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
     * @description traera un medico por Id de la base de datos
     * @date 2022-08-10
     * @returns json
     */
    getMedico = async (req, res = response) => {
        return res.status(200).json({
            ok: true,
            msg: 'llego al contralador funcion getMedico'
        });
    }

    /**
     * @author Jogan Ortiz Muñoz
     * @description creara un medico nuevo en la base de datos
     * @date 2022-08-10
     * @returns json
     */
    setMedico = async (req, res = response) => {
        const uid       = req.uid;
        try {
            const existNombre = await Medico.findOne({nombre: req.body.nombre});
            if(existNombre){
                return res.status(400).json({
                    ok: false,
                    msg: 'El Medico ya esta registrado'
                });
            }

            const medico  =  new Medico({usuario: uid, ...req.body});

            const medicoDB = await medico.save();

            return res.status(200).json({
                ok: true,
                medico: medicoDB
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
     * @description se actualiza un medico por el id
     * @date 2022-08-10
     * @returns json
     */
    updateMedico = async (req, res = response) => {
        return res.status(200).json({
            ok: true,
            msg: 'llego al contralador funcion updateMedico'
        });
    }

    /**
     * @author Jogan Ortiz Muñoz
     * @description elimina un medico de la base de datos
     * @date 2022-08-10
     * @returns json
     */
    deleteMedico = async (req, res = response) => {
        return res.status(200).json({
            ok: true,
            msg: 'llego al contralador funcion deleteMedico'
        });
    }
}

module.exports = Medicos