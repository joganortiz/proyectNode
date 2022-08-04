const mongoose = require('mongoose');

const dbConnetion = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNETION);

        console.log("DB Online")
    } catch (error) {
        console.log(error);
        throw new Error("Error al momento de hacer la conexion");
    }

}

module.exports = {
    dbConnetion
}