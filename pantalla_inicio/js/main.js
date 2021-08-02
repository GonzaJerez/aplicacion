'use strict'

var body = document.querySelector('body');
var ahref = document.getElementsByTagName('a');
var pelota_fondo = document.querySelector('#pelota_fondo');
var fecha_argentina = document.querySelector('#fecha_argentina');
var hora_argentina = document.querySelector('#hora_argentina');
var contenedor_hora = document.querySelector('#contenedor_hora');
var buscando = document.querySelector('#buscando');
var menu = document.querySelector('#menu');
var modo_oscuro = document.querySelector('#modo_oscuro');
var nocturno = document.querySelector('#nocturno');
var theme = document.querySelector('#theme');
var fecha = new Date();
var dia = fecha.getDay();
var num_fecha = fecha.getDate();
var mes = fecha.getMonth();
var ano = fecha.getFullYear();
var hora = (fecha.getHours()).toLocaleString(undefined,{minimumIntegerDigits: 2});
var minutos = (fecha.getMinutes()).toLocaleString(undefined,{minimumIntegerDigits: 2});

var dias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];


function fondo() {
    
    if (localStorage.getItem('fondo') == 'nocturno') {
        body.className = 'dark-body';
    }else{
        body.className = 'light-body';
    }
}

fondo();

// localStorage.setItem('visit','0')

if(localStorage.getItem('visit') == null){
    localStorage.getItem('visit') = '0';
};


function no_salir() {
    window.onbeforeunload = function () { };

}

window.onbeforeunload = function () {
    localStorage.setItem('visit','0');

}

if (localStorage.getItem('visit') == '0') {
    
    setTimeout(() => {
        buscando.textContent = 'Cargando Argentina...'
    }, 19000);
    
    
    setTimeout(function(){
        pelota_fondo.style.display = 'none';
        buscando.style.display = 'none';
        contenedor_hora.style.display = 'block';
        hora_argentina.textContent = hora+ ':'+minutos;
        fecha_argentina.textContent = dias[dia-1]+ ' '+num_fecha+ ' de '+meses[mes]+' del '+ano+'. - Hora Argentina';
        localStorage.setItem('visit', '1');
    },21000)

}else{
    pelota_fondo.style.display = 'none';
    buscando.style.display = 'none';
    contenedor_hora.style.display = 'block';
    hora_argentina.textContent = hora+ ':'+minutos;
    fecha_argentina.textContent = dias[dia-1]+ ' '+num_fecha+ ' de '+meses[mes]+' del '+ano+'. - Hora Argentina';
}



function configuracion(){
    if (modo_oscuro.style.marginBottom == '0px') {
        
        modo_oscuro.style.marginBottom = '268px';
        menu.style.boxShadow = '0px 0px 0px';
        setTimeout(() => {
            modo_oscuro.style.zIndex = '1';
        }, 500);
    }else{
        modo_oscuro.style.marginBottom = '0px';
        modo_oscuro.style.zIndex = '-1';
        menu.style.boxShadow = '-1px -1px 7px #3a3a3a';

    }
}


nocturno.addEventListener('change',function(){
    if (nocturno.checked == true) {
        localStorage.setItem('fondo', 'nocturno');
    }else{
        localStorage.setItem('fondo', 'claro');
    }
    fondo();
});



if (localStorage.getItem('fondo') == 'nocturno') {
    nocturno.setAttribute('checked', 'checked')
};


