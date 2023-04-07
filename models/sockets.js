const { userConnected,userDisconnected,getUsers,recordMessage } = require('../controllers/sockets');
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

           
            //TODO Validar jwr
            //TODO SABER  que usuario esta activo mediante uid
            //si el token no es válido desconectar
             const  [isValid, uid] = verifyJwt( socket.handshake.query['x-token'] );
             
            if( !isValid ){
                console.log('socket no identificado ' );
                return socket.disconnect();
            }
         const data =  await userConnected( uid );
           
         

         //TODO Socket join uid

         socket.join( uid );


       

          //TODO Emitir todos los usuarios conectados
          // console.log((await getUsers())

          this.io.emit( 'list-users',(await getUsers())) 
   


          //TODO Escuchar cuando el cliente manda un mensaje 
          // 'personal-message'

          socket.on('personal-message', async( payload ) =>{

           const message = await recordMessage( payload )
          
           this.io.to( payload.to ).emit( 'personal-message', message );
           this.io.to( payload.from ).emit( 'personal-message', message );
          } )

          //TODO Disconnect
          // marcar en la DB que el usuario se desconecto

          //TODO Emitir todos los usuarios conectados

            socket.on('disconnect', async( socket ) => {
                
                const descontado =  await  userDisconnected( uid );
                this.io.emit( 'list-users',(await getUsers())) 
                console.log('cliente desconectado',descontado);
            })
        })
 
 

    }
}

module.exports = Sockets;