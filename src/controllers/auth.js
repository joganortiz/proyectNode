const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuario");
const generarJWT = require("../libraries/jwt");


class Auth {

    login = async (req, res = response) => {
        const {email, password} = req.body;
        let pasoTodoOk = true;

        try {

            const usuarioDB = await Usuario.findOne({email});

            //varificar email
            if(!usuarioDB){
                pasoTodoOk = false;
            }

            if(pasoTodoOk){
                // varificar constraseña
                const validarPassword = bcryptjs.compareSync(password, usuarioDB.password);
                if (!validarPassword) {
                    pasoTodoOk = false;
                }
            }

            // si llega falso es porque ocurrio un error
            if(!pasoTodoOk){
                return res.status(404).json({
                    ok: false,
                    msg: 'Constraseña y/o correo no son válido'
                });
            }

            //si todo pasa bien se procede a generar un token
            const _token = await generarJWT(usuarioDB.id);

            return res.status(200).json({
                ok: true,
                _token
            });

        } catch (error) {
            console.log(error);

            res.status(500).json({
                ok: false,
                msg: "Error inesperado"
            })
        }
    }
}

module.exports = Auth;