const mongoose = require("mongoose"); 

const dbConnection = async () => {

    //la conexion puede fallar por eso la pongo en un try

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            
            
        });
        console.log("Base de datos online")


    } catch (error) {
        console.log(error)
        throw new Error("Error a la hora de iniciar la base de datos")
    }


}

module.exports = {
    //si en el futuro necesito mas de una conexion la eporto aqui
    dbConnection
}

