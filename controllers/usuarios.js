const {response, request} = require("express")

const usuariosGet = (req = request, res = response) => {
    
    //?para poder obtener despues del slash, el id o numero :id de una query string -> req.params.id
    const id = req.params.id;
    
    //?para poder obtener los query strings adicionales. Puedo establecer valores por defecto -> req.query
    const {q, nombre = "no Name",  apikey= 23123123} = req.query
    
        res.json({
            ok:true,
            msg: "get Api - controlador",
            q,
            nombre,
            apikey
        })
    
}

const usuariosPut = (req= request, res = response) => {

    


    res.json({
        ok:true,
        msg: "Put Api - controlador",
        
        
    })

}

const usuariosPatch = (req= request, res = response) => {
    res.json({
        ok:true,
        msg: "patch Api - controlador"
    })

}
const usuariosPost = (req= request, res = response) => {

    const {nombre, edad} = req.body; 

    res.json({
        ok:true,
        msg: "patch Api - controlador",
        nombre,
        edad
    })

}

const usuariosDelete = (req, res = response) => {
    res.json({
        ok:true,
        msg: "delete Api - controlador"
    })

}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    usuariosPost
}