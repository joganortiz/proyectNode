const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuario");
const generarJWT = require("../libraries/jwt");
const googleVerify = require("../libraries/google-verify");
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
                    msg: 'Correo electrónico y/o contraseña no son válido'

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

    googleSingIn = async (req, res = response) => {
        try {

            const {name, email, picture} = await googleVerify(req.body.token);

            const usuarioDB = await Usuario.findOne({email});
            let usuario;

            if(!usuarioDB){
                usuario = new Usuario({
                    nombre: name,
                    email,
                    password: '@@',
                    img: picture,
                    google: true

                });
            }else{
                usuario = usuarioDB;
                usuario.google = true;
            }

            // guardar usuario
            await usuario.save();

            // generar topken
            const _token = await generarJWT(usuarioDB.id);

            return res.status(200).json({
                ok: true,
                _token
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: "Error inesperado"
            })
        }
    }

    renewToken= async (req, res = response) => {
        try {
            const uid = req.uid;

            // Generar el TOKEN - JWT
            const token = await generarJWT( uid );
        
            // Obtener el usuario por UID
            const usuario = await Usuario.findById( uid );
        
        
            return res.json({
                ok: true,
               _token: token,
               usuario
            });
        } catch (error) {
            
        }
    }
}

module.exports = Auth;