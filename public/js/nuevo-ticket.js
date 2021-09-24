//referencias HTML 
const lblNuevoticket = document.querySelector('#lblNuevoTicket');
const btncrear = document.querySelector('button');


const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btncrear.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btncrear.disabled = true;
});


socket.on('ultimo-ticket', (payload) => {
    lblNuevoticket.innerText =  "Ultimo Ticket " + payload;
})


btncrear.addEventListener( 'click', () => {

    const payload = {msj : 'ok'
    }
    
    socket.emit('siguiente-ticket', payload, ( ticket ) => {
        lblNuevoticket.innerText =  ticket;
    });

});