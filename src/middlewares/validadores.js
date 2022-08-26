const { response } = require("express");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

/**
 * @class Middlewares
 * @author Jogan Ortiz Muñoz
 * @date 2022-08-06
 */
class Middlewares {

    /**
     * @author Jogan Ortiz Muñoz
     * @description valida que los campos requeridos no llegen vacios
     * @date 2022-08-06
     * @returns json | nex()
     */
    validarCampos = (req, res = response, next) => {
        
        const errores = validationResult(req);
        

        if(!errores.isEmpty()){
            return res.status(400).json({
                ok: false,
                errores: errores.mapped()
            })
        }

        next();
    }

    /**
     * @author Jogan Ortiz Muñoz
     * @description valida que venga un token y que sea válido
     * @date 2022-08-06
     * @returns json | nex()
     */
    validarJWT = (req, res = response, next) => {
        const _token = req.header('_token');
        
        if(!_token){
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            });
        }

        try {
            const {uid} = jwt.verify(_token, process.env.JWT_SECRET); // validamos el token que recibimos
            if(uid === null || uid === undefined){
                return res.status(401).json({
                    ok: false,
                    msg: 'Token no válido'
                });
            }
            
            req.uid = uid;
            next();

        } catch (error) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            });
        } 
    }
}

module.exports = Middlewares;