// lo que esta por fuera de la fucion  socketController tambien se ejecuta , para saber el contexto de la funcion , por eso es que la instancia de la clase funciona 

const { Socket } = require("socket.io");
const TicketControl = require("../models/ticket-control");


// esto se ejecuta cada que el server se reinicie 
const ticketControl = new TicketControl;// con solo hacer esto se dispara el constructor de miclase 

const socketController = (socket) => {
    
    socket.emit('ultimo-ticket',ticketControl.ultimo);

    socket.broadcast.emit('ultimos4',ticketControl.ultimos4);

    // para cargar los ticket a atender cuando se ingresa a la pagina 
    socket.on('escritorio-loaded',(payload,callback)=>{
        callback(ticketControl.tickets.length);

    });

    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente  = ticketControl.siguiente();

        callback(siguiente);
        // Notificar que hay un nuevo ticket para asignar
        socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length); 
    })

    socket.on('atender-ticket',({escritorio}, callback)=>{
        if (!escritorio) {
            return callback({
                ok:false,
                msj : "escritorio requerido"
            })
        }

        const ticketAtender = ticketControl.atenderTicket(escritorio);

        //mostrar en pantalla publica 
        socket.broadcast.emit('ultimos4',ticketControl.ultimos4);
        
        // actualizar la cantidad de tickets a atander 
        socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length);
        socket.emit('tickets-pendientes',ticketControl.tickets.length);

        if (!ticketAtender) {
            return callback({
                ok : false,
                msj :"no hay mas tickes"
            })
        } else{
            return callback({
                ok : true,
                ticketAtender
            })
        }

    });

}



module.exports = {
    socketController
}

