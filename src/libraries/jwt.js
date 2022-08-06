const jwt = require('jsonwebtoken');

/**
 * @author Jogan Ortiz Muñoz
 * @description crea un nuevo token y en el token guarda el id
 * @date 2022-08-06
 * @returns string
 */
const generarJWT = async (uid) => {

    return new Promise( (resolve, reject) =>{
        const payload = {
            uid
        };
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(token);
            }
        });
    } );
}

module.exports = generarJWT;