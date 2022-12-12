const {response, request} = require("express")
const Usuario = require("../models/usuario")
const bcryptjs = require("bcryptjs");



const usuariosGet = async (req = request, res = response) => {
    
    //?para poder obtener despues del slash, el id o numero :id de una query string -> req.params.id
    //const id = req.params.id;
    
    //?para poder obtener los query strings adicionales. Puedo establecer valores por defecto -> req.query
    //const {q, nombre = "no Name",  apikey= 23123123} = req.query

    //lo q saco de req.query viene como string, asi q tengo q convertirlo

    const {limite = 5, desde = 0 } = req.query;
    const query = {estado: true}

    /* const usuarios = await Usuario.find(query)
    .limit(Number(limite)) //cantidad maxima de usuarios q quiero
    .skip(Number(desde)) //es el offset o a partir de q num de user quiero traer, para paginar

    const total =  await Usuario.countDocuments(query) */
    //concurrencia, con arreglo de promesas
    const [total, usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .limit(Number(limite)) 
            .skip(Number(desde))
    ]);


    res.json({
        total, 
        usuarios
        
    })
    
}




const usuariosPut = async (req= request, res = response) => {
    const {id} = req.params;
    //excluyo del esto, los parametros q van a tener validaciones personalizadas
    //lo q va en resto se actualiza automaticamente con el findByIdAndUpdate
    const {_id, password, google, correo, ...resto } = req.body; 

    //TODO validar contra base da datos
   //si me envia la contarseña tengo q validar q sea otra, para eso la hasheo
    if(password){
        //encriptar
        const salt = bcryptjs.genSaltSync(); 
        resto.password = bcryptjs.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: "Put Api - controlador",
        usuario,           
    })
}



const usuariosPatch = (req= request, res = response) => {
    res.json({
        ok:true,
        msg: "patch Api - controlador"
    })

}
const usuariosPost = async (req= request, res = response) => {

    //validaciones del middleware 
    

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    
       
    //ENCRIPTAR LA CONTRASEÑA
    const salt = bcryptjs.genSaltSync(); 
    usuario.password = bcryptjs.hashSync(password, salt)
    //GUARDAR EN BD
    await usuario.save(); 
    res.json(
        
        usuario
   )
}

const usuariosDelete = async (req, res = response) => {
    
    const {id} = req.params
    
    //fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id)
    //cambiamos el estado del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    

    res.json(
        usuario
    )

}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    usuariosPost
}