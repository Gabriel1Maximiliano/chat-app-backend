const express  = require('express');
const path     = require('path');
const http     =  require('http');
const socketio = require('socket.io')
const  Sockets = require('./sockets');
const cors     = require('cors');
const { dbConnection } = require('../database/config');
require('dotenv').config();

class Server {
  
    constructor() {
        this.app =  express();
        this.port = process.env.PORT || 3000;

        //Db connection 
        dbConnection();

        // Http server
    
        this.server = http.createServer( this.app );  
      
        this.io = socketio( this.server ,{
            cors: {
                origin: `*`,
              } });

        //inicializar sockets

        this.sockets = new Sockets( this.io );

    }

middlewares() {
        


this.app.use( express.static( path.resolve( __dirname + '../../public') ));
//



// this.app.use((req,res,next)=>{
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();

// })
this.app.use('/api/login', require('../router/auth'));


    }
// socketConfig() {
//     new Sockets( this.io );
// }

    execut() {
// inicializar middlewares
        this.middlewares();

// inicializar sockets 
//this.socketConfig();        


      this.server.listen(this.port, () => {
          console.log('Server running on port : '+this.port)
      });
    }
}

module.exports = Server;