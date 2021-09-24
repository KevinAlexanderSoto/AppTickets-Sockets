const path = require('path');
const fs = require('fs');

class Ticket  {
    constructor(numero,escritorio){
        this.numero= numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor(){

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJson(){

        return {
        ultimo :this.ultimo,
        hoy : this.hoy,
        tickets : this.tickets ,
        ultimos4 : this.ultimos4 
        }
    }

    init(){

        const {hoy,ultimo,tickets,ultimos4} = require('../DB/data.json');// automaticamente lo pasa a json 
        if(hoy === this.hoy) {// es el mismo dia 
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }else{ // es otro dia 
            this.guardarDB();
        }


    };

    guardarDB(){
        const dbpath =path.join(__dirname,'../DB/data.json');

        fs.writeFileSync(dbpath,JSON.stringify(this.toJson)); // los metodos get no requieren el parentesis



    };

    siguiente(){// deveria llamarse crear ticket o nuevo turno o pedir ticket 
        this.ultimo +=1;
        
        const ticket = new Ticket(this.ultimo,null);

        this.tickets.push(ticket);// se añade al final del arreglo 

        this.guardarDB();
        return 'Ticket' + ticket.numero;
    }

    atenderTicket (escritorio){
        //no tenemos tickets
    if(this.tickets == 0) return null;

        const ticket = this.tickets.shift();//para borrar el primero ,this.tickets[0];

        ticket.escritorio = escritorio;

        this.ultimos4.unshift(ticket);// para añadirlo al principio del arreglo 
        
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1,1);// para eliminar el ultimo elemento del array 
        }
        this.guardarDB();
        return ticket;
    }
}

module.exports = TicketControl ;