/**
 * @class Usuarios
 * @author Jogan Ortiz Muñoz
 * @date 2022-08-03
 */
const usuarios = class Usuarios {

    /**
     * @author Jogan Ortiz Muñoz
     * @description traera todos los usuarios que estan en la base de datos
     * @param {*} req 
     * @param {*} res
     * @returns Array
     */
    getUsuarios = (req, res) => {
        res.status(404).json({
            ok: true,
            msg: 'get usuarios'
        });
    }

    /**
     * @author Jogan Ortiz Muñoz
     * @description creara un usuario nuevo en la base de datos
     * @param {*} req 
     * @param {*} res
     * @returns Array
     */
    setUsuarios = (req, res) => {
        res.status(404).json({
            ok: true,
            msg: 'set usuarios'
        });
    }
}


module.exports = usuarios
