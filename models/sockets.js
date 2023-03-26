const { userConnected,userDisconnected } = require('../controllers/sockets');
const { verifyJwt } = require('../helpers/jwt');

const TicketList = require('./ticket-list');

class Sockets {

    constructor( io ) {

        this.io = io;
        this.socketEvents();
        this.ticketList = new TicketList();
    }
    socketEvents() {
        // On Connection

        this.io.on('connection',async( socket ) =>{

           
             const  [isValid, uid] = verifyJwt( socket.handshake.query['x-token'] );
             
            if( !isValid ){
                console.log('socket no identificado ' );
                return socket.disconnect();
            }
         const data =  await userConnected( uid );
            console.log('cliente conectado '+ data) 
         
          //TODO Validar jwr

          //si el token no es válido desconectar
 
          //TODO SABER  que usuario esta activo mediante uid

          //TODO Emitir todos los usuarios conectados

          //TODO Socket join uid

          //TODO Escuchar cuando el cliente manda un mensaje 
          // 'personal-message'

          //TODO Disconnect
          // marcar en la DB que el usuario se desconecto

          //TODO Emitir todos los usuarios conectados

            socket.on('disconnect', async( socket ) => {
                
                const descontado =  await  userDisconnected( uid )
                console.log('cliente desconectado',descontado);
            })
        })
 
 

    }
}

module.exports = Sockets;