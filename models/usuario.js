const {Schema, model} = require("mongoose")
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es oblogatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo es oblogatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "El password es oblogatorio"]
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ["ADMIN_ROLE", "USER_ROLE"]
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

//esto es para borra o limpiar datos sencibles q le respondo luego de crear un usuario
UsuarioSchema.methods.toJSON = function(){
    const {__v, password, ...usuario} = this.toObject()
    return usuario
}
//mongoose por defecto, le va a agregar una "s" al nombre Usuario
module.exports = model("Usuario", UsuarioSchema)