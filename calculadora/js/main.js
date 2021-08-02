'use strict'

// __________ FUNCIONES ______________________

function write_number(num) {
    
    if (vista.value == "0" || contador != 0) {

        vista.value = "";
        vista.value = num;
        contador = 0;
        ejecutar = 0;
        restablecerColoresSignos()
    } else if (vista.value == "-0") {
        vista.value = "-";
        vista.value = vista.value + num;
    }
    else {
        vista.value = vista.value + num;

        if (vista.value.includes(',') == false && vista.value.length > 3) {

            puntoMiles(vista.value);
        }
    }
}

function puntoMiles(cadena){
    cadena = cadena.split('')                                                       // convierte cadena a array
    cadena = cadena.reverse();                                                      // da vuelta el array
    
    while (cadena.includes('.')== true) {                                           // mientras haya un punto en el array...
        cadena.splice(cadena.indexOf('.'),1)                                        // ... lo elimina
    }
    
    cadena = cadena.join('');                                                       // convierte array limpia de puntos a string
    let separadorMiles = '';
    for (let i = 0; i < cadena.length; i+= 3) {                                     // recorre array y en cada vuelta saltea 3 numeros
        if (i + 3 < cadena.length) {                                                // si todavia se encuentra dentro de array...
            separadorMiles += cadena.substr(i, i + 3) + '.';                        // ...agrega un punto cada 3 numeros

        }else{
            separadorMiles += cadena.substr(i, cadena.length)                       // ... sino esta dentro de array muestra el resto de numeros
        }   
    }
    separadorMiles = separadorMiles.split('')                                       // convierte cadena a array
    separadorMiles = separadorMiles.reverse();                                      // da vuelta de nuevo el array
    separadorMiles = separadorMiles.join('');                                       // convierte el array a cadena
    
    vista.value = separadorMiles;                                                   // muestra en pantalla nuevo valor con puntos separadores
}

function borrarPuntosMiles(cadena){
    cadena = cadena.split('');
    
    while (cadena.includes('.')== true) {                                           // mientras haya un punto en el array...
        cadena.splice(cadena.indexOf('.'),1)                                        // ... lo elimina
    }

    cadena = cadena.join('');                                                       // convierte array limpia de puntos a string

    // vista.value = cadena;
    return cadena;
}


function borrar() {
    vista.value = "0";
    guard = 0;
    contador_almacenamiento = 0;
}

function pos_neg() {
    if (vista.value.startsWith('-') == true) {
        vista.value = vista.value.replace('-', '');
    } else {
        vista.value = '-' + vista.value;

    }
}

function porcentaje() {
    let porciento = parseInt(vista.value)
    let result = String(porciento / 100);
    vista.value = result.replace('.', ',');
}

function coma() {
    if (vista.value.includes(',') == false) {
        vista.value = vista.value + ',';
    }
    if (contador == 1) {
        vista.value = '0,';
        contador = 0;
    }
}



// _____ FUNCIONES MATEMATICAS _______

var ejecutar = 0;
function sacando_cuenta(cuenta) {
    if (ejecutar == 0) {
        
        if (contador_almacenamiento == 0) {
            guard = borrarPuntosMiles(vista.value);
            contador = 1;
            operacion = cuenta;
            contador_almacenamiento = 1;
            ejecutar = 1;
        } else {
                
            signo_igual();
            guard = borrarPuntosMiles(vista.value);
            contador = 1;
            operacion = cuenta;
            ejecutar = 1;
        }
    }
    operacion = cuenta;
    
}


function signo_igual() {

    if (contador_almacenamiento == 0) {

    }else{

        contador = 1;

        // convierte a num + hace cuenta + vuelve a string
        if (operacion == 'suma') {

            resultado = String(parseFloat(guard.replace(',', '.')) + parseFloat(borrarPuntosMiles(vista.value).replace(',', '.')));
        }
        else if (operacion == 'resta') {

            resultado = String(parseFloat(guard.replace(',', '.')) - parseFloat(borrarPuntosMiles(vista.value).replace(',', '.')));
        }
        else if (operacion == 'multiplicacion') {

            resultado = String(parseFloat(guard.replace(',', '.')) * parseFloat(borrarPuntosMiles(vista.value).replace(',', '.')));
        }
        else if (operacion == 'division') {

            resultado = String(parseFloat(guard.replace(',', '.')) / parseFloat(borrarPuntosMiles(vista.value).replace(',', '.')));
        }

        lista = resultado.split(''); // covierte en array

        // si el resultado tiene mas de 6 numeros despues de la coma entra al if
        if (lista.slice(lista.indexOf('.') + 1).length >= 6) {
            var lista3 = lista.slice(lista.indexOf('.') + 1);
            var lista4 = lista3.slice(0, 6)
            // si el ultimo numero que queda visible es cero lo cambia por 1
            if (lista4[5] == '0') {
                lista4.pop()
                lista4.push('1')
                lista = lista.slice(0,2).concat(lista4)
            }
        }
        // lista sale valiendo lo mismo pero si tenia mas de 6 decimales los redondea

        // var ponerPuntos = lista.slice(0, lista.indexOf('.'));
        // ponerPuntos = ponerPuntos.join('');

        

        lista2 = lista.slice(0, 8); // deja en array primeros 8 elementos
        resultado2 = lista2.join(''); // convierte array en string
        vista.value = resultado2; // se ve en html el string creado arriba
        vista.value = vista.value.replace('.', ','); // cambia el punto para q se vea la coma
        var ponerPuntos = vista.value.slice(0, vista.value.indexOf(','));
        var decimas = vista.value.slice(vista.value.indexOf(','))
        puntoMiles(ponerPuntos);
        vista.value = vista.value + decimas

        guard = vista.value; // almacena ultimo valor
        contador = 1;
    }

}



function result_final() {
    signo_igual();
    contador_almacenamiento = 0;
}


// ___________________________________________

var contador = 0;
var contador_almacenamiento = 0;
var operacion = '';
var guard = '';
var resultado = 0
var lista = [];
var lista2 = [];
var resultado2 = ''

var vista = document.querySelector('#vista');

var one = document.querySelector('#one');
var two = document.querySelector('#two');
var three = document.querySelector('#three');
var four = document.querySelector('#four');
var five = document.querySelector('#five');
var six = document.querySelector('#six');
var seven = document.querySelector('#seven');
var eight = document.querySelector('#eight');
var nine = document.querySelector('#nine');
var cero = document.querySelector('#cero');
var AC = document.querySelector('#AC');
var mas_menos = document.querySelector('#mas_menos');
var porcent = document.querySelector('#porcent');
var dividido = document.querySelector('#dividido');
var por = document.querySelector('#por');
var menos = document.querySelector('#menos');
var mas = document.querySelector('#mas');
var punto = document.querySelector('#punto');
var igual = document.querySelector('#igual');
var body = document.querySelector('body');

function fondo() {
    
    if (localStorage.getItem('fondo') == 'nocturno') {
        body.className = 'dark-body';
    }else{
        body.className = 'light-body';
    }
}

fondo();

document.querySelector('body').addEventListener('keypress',function(event){
    var teclasPosibles = ['0','1','2','3','4','5','6','7','8','9'];
 
    if (teclasPosibles.indexOf(event.key) >= 0) {
        write_number(event.key);
    }

    switch(event.key){
        case '+':
            sacando_cuenta('suma');
            restablecerColoresSignos()
            mas.style.backgroundColor = 'white';
            mas.style.color = '#ffa500';

        break;
        case '-':
            restablecerColoresSignos();
            sacando_cuenta('resta');
            menos.style.backgroundColor = 'white';
            menos.style.color = '#ffa500';
        break;   
        case '/':
            restablecerColoresSignos();
            sacando_cuenta('division');
            dividido.style.backgroundColor = 'white';
            dividido.style.color = '#ffa500';
        break;   
        case '*':
            restablecerColoresSignos();
            sacando_cuenta('multiplicacion');
            por.style.backgroundColor = 'white';
            por.style.color = '#ffa500';
        break;   
        case '.':
            coma();
        break;   
        case 'Enter':
            result_final();
            igual.style.backgroundColor = 'rgb(236, 236, 236)';
            setTimeout(function(){
                igual.style.backgroundColor = '#ffa500';
            },50)
        break;   
    }
});

function restablecerColoresSignos(){
    var signosPosibles = [mas,menos,por,dividido];
    signosPosibles.forEach(element=>{
        if (element.style.backgroundColor == 'white') {
            
            element.style.backgroundColor = '#ffa500';
            element.style.color = 'white';
        }
    })
}

