const TicketList = require('./ticket-list');

class Sockets {

    constructor( io ) {

        this.io = io;
        this.socketEvents();
        this.ticketList = new TicketList();
    }
    socketEvents() {
        // On Connection

        this.io.on('connection',( socket ) =>{
         
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


        })



    }
}

module.exports = Sockets;