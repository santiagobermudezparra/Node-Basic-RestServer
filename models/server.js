const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';


        //Connect DB
        this.connectDB();

        // Middlewares
        this.middlewares();
        
        this.routes();

    }


    async connectDB(){
        await dbConnection();
    }


    middlewares(){

        //CORS
        this.app.use(cors());

        //Read body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));
    }


    routes(){
        this.app.use(this.usuariosRoutePath, require('../routes/user'));
          
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ',this.port);
        })
    }


}

module.exports = Server;