const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuario");
const generarJWT = require('../libraries/jwt');

/**
 * @class Usuarios
 * @author Jogan Ortiz Muñoz
 * @date 2022-08-03
 */
const usuarios = class Usuarios {

    /**
     * @author Jogan Ortiz Muñoz
     * @description traera todos los usuarios que estan en la base de datos
     * @date 2022-08-06
     * @returns json
     */
    getUsers = async (req, res = response) => {

        try {
            const desde = Number(req.query.desde) | 0;

            const usuarios = await Usuario
                                    .find({delete: false}, 'nombre email role google status img')
                                    .skip(desde)
                                    .limit(5);
                                    

            return res.status(200).json({
                ok: true,
                usuarios
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error inesperado'
            })
        }
    }

    /**
     * @author Jogan Ortiz Muñoz
     * @description traera la informacion de un usuario por ID
     * @date 2022-08-03
     * @returns json
     */
    getUser = (req, res) => {
        return res.status(200).json({
            ok: true,
            msg: 'get usuario'
        });
    }

    getExistEmail = async (req, res = response) => {
        try {
            const {id, email} = req.params;
            
            const existeEmail = await Usuario.findOne({email, _id: {$ne:id}});

            if(existeEmail){
                return res.json({ok: true});
            }

            return res.json({ ok: false});
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error inesperado'
            })
        }
    }

    /**
     * @author Jogan Ortiz Muñoz
     * @description creara un usuario nuevo en la base de datos
     * @date 2022-08-06
     * @returns json
     */
    setUser = async (req, res = response) => {

        const {email, password} = req.body;

        try {

            const existeEmail = await Usuario.findOne({email});

            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya esta registrado'
                });
            }

            const usuario = new Usuario( req.body);

            //encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync( password, salt);

            //guardar el usuario
            await usuario.save();

            const _token = await generarJWT(usuario.id);

            return res.status(200).json({
                ok: true,
                usuario,
                _token
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
     * @description se actualiza un usuario por el id
     * @date 2022-08-06
     * @returns json
     */
    updateUser = async(req, res) => {
        const uid = req.params.id;
        const { password, google, ...campos } = req.body;
        try {
            const usuarioDB = await Usuario.findById(uid);

            if( !usuarioDB){
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un usuario por ese id'
                });
            }

            // validar si ya existe el email en la base de datos
            const existeEmail = await Usuario.findOne({email: campos.email, _id: {$ne:uid}});
            if(existeEmail){
                return res.status(404).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });    
            }

            const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true});

            return res.status(200).json({
                ok: true,
                usuarioActualizado
            });
        
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error inesperado'
            });
        }
    }

    validPassword = async(req, res = response) => {
        try {
            const {id, password} = req.body;

            const dataUser = await Usuario.findOne({ _id: id});

            const validarPassword = bcryptjs.compareSync(password, dataUser.password);
            if (!validarPassword) {
                return res.json({
                    ok: true,
                });
            }

            return res.json({
                ok: false,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error inesperado'
            });
        }
    }

    updatePassword = async(req, res = response) => {
        try {
            const id = req.params.id;
            const { password, newPassword } = req.body;
           
            const dataUser = await Usuario.findOne({ _id: id});

            const validarPassword = bcryptjs.compareSync(password, dataUser.password);
            if (!validarPassword) {
                return res.json({
                    ok: true,
                    msg: 'La contraseña no coincide con la actual'
                });
            }

            const validarPasswordActual = bcryptjs.compareSync(newPassword, dataUser.password);
            if(validarPasswordActual){
                return res.json({
                    ok: true,
                    msg: 'La nueva contraseña debe ser diferente a la actual'
                });
            }

            //encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            const nuevaPassword = bcryptjs.hashSync( newPassword, salt);

            await Usuario.findByIdAndUpdate(id, {password: nuevaPassword}, { new: true});
            
            return res.status(200).json({
                ok: true,
                msg: 'La contraseña se actualizo correctamente'
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
     * @description elimina un usuario de la base de datos
     * @date 2022-08-06
     * @returns json
     */
    deleteUser = async(req, res = response) => {
        const uid = req.params.id;
        try {

            const usuarioDB = await Usuario.findById(uid);

            if( !usuarioDB){
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un usuario por ese id'
                });
            }

            //Borrar dato de la tabla
            //await Category.findByIdAndDelete(id);

            //Actualizar dato de eliminar
            await Usuario.findByIdAndUpdate(uid, { delete: true });

            return res.status(200).json({
                ok: true,
                msg: 'Usuario eliminado'
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error inesperado'
            });
        }
    }
}


module.exports = usuarios