// referencias HTML

const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');

const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');

const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');


const socket = io();

socket.on('ultimos4', (payload) => {

const audio = new Audio('./audio/new-ticket.mp3');// clase propia del navegador 

audio.play();// reproducirlo en fireFox , ya que crome bloquea la reproduccion automatica 

const [ ticket1,ticket2,ticket3,ticket4] = payload;

lblTicket1.innerText = 'ticket ' + ticket1.numero;
lblEscritorio1.innerText = ticket1.escritorio;

lblTicket2.innerText = 'ticket ' + ticket2.numero;
lblEscritorio2.innerText = ticket2.escritorio;

lblTicket3.innerText = 'ticket ' + ticket3.numero;
lblEscritorio3.innerText = ticket3.escritorio;

lblTicket4.innerText = 'ticket ' + ticket4.numero;
lblEscritorio4.innerText = ticket4.escritorio;

});

