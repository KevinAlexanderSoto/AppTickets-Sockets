//referencias HTML 
const lblescritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblticket = document.querySelector('small');
const divalert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');
// para leer el url 
const searchParams = new URLSearchParams(window.location.search);
const socket = io();

window.addEventListener('DOMContentLoaded', (event) => {
    
    socket.emit('escritorio-loaded',true,(ticketPendientes)=>{

        lblPendientes.innerText = ticketPendientes;
    })
});


if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
};

const escritorio = searchParams.get('escritorio');

lblescritorio.innerText = escritorio;// para mostras grande el escritorio
divalert.style.display = 'none';


socket.on('connect', () => {
   
    btnAtender .disabled = false;

});

socket.on('disconnect', () => {
    
    btnAtender .disabled = true;
});


socket.on('ultimo-ticket', (payload) => {
    //lblNuevoticket.innerText =  "Ultimo Ticket " + payload;
})

socket.on('tickets-pendientes',(payload)=>{

    lblPendientes.innerText = payload;

})

btnAtender.addEventListener( 'click', () => {

    const payload = {escritorio}
    
    socket.emit('atender-ticket', payload, ( {ok , ticketAtender, msj} ) => {
    
        if (!ok) {
            lblticket.innerText = 'Nadie más '
            return divalert.style.display = '';
        }
        lblticket.innerText = 'Ticket ' + ticketAtender.numero;
    
    });

});