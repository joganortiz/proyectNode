const {Schema, model} = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },

    status: {
        type: Boolean,
        required: false,
        default: true
    },
    delete: {
        type: Boolean,
        required: false,
        default: false
    }
});

MedicoSchema.method('toJSON', function(){
    const {__v, _id, delete: Boolean, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model( 'Medico', MedicoSchema);