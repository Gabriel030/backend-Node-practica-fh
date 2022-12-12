const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express(); 
        this.port = process.env.PORT
        this.usuariosPath = "/api/usuarios" // defino el endpoint de usuarios

        //?Conectar a base de datos
        this.conectarDB()
        //! Middlewares
        this.middlewares();
        
        this.routes()//con esto llamo a las rutas
    }

    middlewares(){
        //DIRECTORIO PUBLICO
        //cors
        this.app.use(cors())
        //lectura y parseo del body
        //cualquier info q venga en post, put y delete, va a intentar serializarla a json
        
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }
    
    //?*** METODOS ***

    async conectarDB () {
        await dbConnection()
    }
    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'))

    }
    listen() {
        this.app.listen(this.port, ()=> console.log("corriendo en puerto",this.port))
    }

}


module.exports = Server; 


