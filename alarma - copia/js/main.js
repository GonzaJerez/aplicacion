'use strict'

var body = document.querySelector('body');
var nueva_alarma = document.querySelector('#nueva_alarma');
var select_hora = document.querySelector('#select_hora');
var select_minutos = document.querySelector('#select_minutos');
var descripcion = document.querySelector('#descripcion')
var contenedor_alarmas = document.querySelector('#contenedor_alarmas');

var hora = select_hora.value;
var minutos = select_minutos.value;


function fondo() {
    
    if (localStorage.getItem('fondo') == 'nocturno') {
        body.className = 'dark-body';
    }else{
        body.className = 'light-body';
    }
}

fondo();

// ___________ CARGADO DE NUMEROS EN SELECT __________________________

for (var i = 0; i < 24; i++) {
	let option = document.createElement('option');
	option.setAttribute('value', (i).toLocaleString(undefined,{minimumIntegerDigits: 2}))
	let texto = document.createTextNode((i).toLocaleString(undefined,{minimumIntegerDigits: 2}))
	option.append(texto);
	select_hora.append(option)
}

for (var i = 0; i < 60; i++) {
	let option = document.createElement('option');
	option.setAttribute('value', (i).toLocaleString(undefined,{minimumIntegerDigits: 2}))
	let texto = document.createTextNode((i).toLocaleString(undefined,{minimumIntegerDigits: 2}))
	option.append(texto);
	select_minutos.append(option)
}

// ______________________________________________________________________

// CUANDO PRESIONO "+" _______________
function boton_agregar(hora=null, minutos=null) {
    if (nueva_alarma.style.height == '0px') {
        
        nueva_alarma.style.height = '250px';
        nueva_alarma.style.padding = '10px';
        nueva_alarma.style.border= '1px solid #333333';
        nueva_alarma.style.boxShadow= '0px 0px 3px #3a3a3a';
        
    }else{
        nueva_alarma.style.height = '0px';
        nueva_alarma.style.border= '0px';
        nueva_alarma.style.padding = '0px';
        
    }

    if (hora != null || minutos != null) {
        select_hora.value = hora;
        select_minutos.value = minutos;
    }
}

// OCULTA CUADRO DE AGREGAR ALARMA
function cancelar() {
    nueva_alarma.style.height = '0px';
    nueva_alarma.style.border= '0px';
    nueva_alarma.style.padding = '0px';
}


// CUANDO PRESIONO "EDITAR" ___________________
var boton_editar = document.querySelector('#boton_editar');

function editar(borra_elem = null) {
    var borrar = document.querySelectorAll('.borrar');
    var check = document.querySelectorAll('.form-check');
    var alarma_editada = document.querySelectorAll('.alarma_editada');
    var contador = 0;
    
    if (borra_elem == null) {
        
        if (boton_editar.textContent == 'Editar') {
            
            boton_editar.textContent = 'Finalizar edicion';
            boton_editar.style.textDecoration = 'underline';
        }else{
            boton_editar.textContent = 'Editar';
            boton_editar.style.textDecoration = 'none';
        };
    }

    borrar.forEach(element => {
        if (element.style.width == '0px') {
            
            element.style.width= '70px';
            check[contador].style.display= 'none';
            alarma_editada[contador].style.display= 'flex';
            contador++;

        }else{
            element.style.width = '0px';
            check[contador].style.display= 'flex';
            alarma_editada[contador].style.display= 'none';
            contador++;
            
        }
    });
        
}


// CUANDO PRESIONO "GUARDAR" ____________
// crea nuevo objeto (alarma) y lo agrega a array donde estan cargadas todas las alarmas
function guardar() {
    var alarma = {
        hora: select_hora.value,
        minutos: select_minutos.value,
        descripcion: descripcion.value
    };
    
    alarmas.push(alarma);
    contenedor_alarmas.innerHTML = '';
    pegar_alarmas();
    nueva_alarma.style.height = '0px';
    nueva_alarma.style.border= '0px';
    nueva_alarma.style.padding = '0px'
    tiempo_restante_nueva()

    if (index != -1) {
        alarmas.splice(index,1);
        contenedor_alarmas.innerHTML = '';
        pegar_alarmas()
        index = -1;
        console.log(index);
    }
}


// PEGA ALARMAS CARGADAS EN LOCALSTORAGE EN PANTALLA __________
// carga al localstorage array de alarmas actualizada
// recupera el string del localstorage y convierte a array de objetos
// va imprimiendo esos objetos uno por uno en pantalla
function pegar_alarmas() {
    let contador = 0;
    
    localStorage.setItem('alarmas', JSON.stringify(alarmas))
    var lista_alarmas = JSON.parse(localStorage.getItem('alarmas'))

    lista_alarmas.forEach(element => {
        var listado_alarmas = [];
        var plantilla_alarma =`
            <article class="alarma" style="height: 165px;" id="numero${contador}">
                <div class="borrar" style="width: 0px;">
                    <button type="button" onclick="borrar(${contador})">
                        <img src="./img/x-circle.svg" alt="">
                    </button>
                </div>
    
                <div class="hora_descripcion">
                    <div>
                        <button type="button" disabled="disabled" class="hora" id="hora${contador}">${element.hora}:${element.minutos}</button>
                    </div>
                    <p class="nombre_alarma">
                        ${element.descripcion}
                    </p>
                </div>
    
                <div class="form-check form-switch" >
                    <input class="form-check-input" id="check${contador}" type="checkbox" checked onclick="tiempo_restante(${contador})">
                </div>
    
                <div class='alarma_editada' style="display: none;">
                    <button type="button" class="botones" onclick="editar_alarma(${contador})">Editar</button>
                </div>

                <span id="tiempo_restante${contador}" class="tiempo_restante" style="display: none;"></span>
                
                <div class="clearfix"></div>
    
                <hr>
            </article>

    `;
    listado_alarmas.push(plantilla_alarma);


    contenedor_alarmas.insertAdjacentHTML('beforeend', plantilla_alarma);

    contador++

    });
}


// BORRAR ALARMA
// 1ro oculta el elemento y cuando termina de ocultarlo lo elimina
function borrar(indice) {

    var borrado = document.querySelector('#numero'+indice);
    borrado.style.height = '0px';
    setTimeout(function(){

        alarmas.splice(indice,1);
        // localStorage.setItem('alarmas', JSON.stringify(alarmas))
        contenedor_alarmas.innerHTML = '';
        pegar_alarmas();
        editar(true);
    },600)

}

function terminarEdicion(){

}



// CUADRO DE TIEMPO RESTANTE
// resta entre hora de alarma y hora actual
function tiempo_restante(indice) {

   var hora_actual = new Date().getHours();
   var hora_alarma = document.querySelector('#hora'+indice).textContent;
   var minutos_actual = new Date().getMinutes();
   var minutos_alarma = document.querySelector('#hora'+indice).textContent;
   hora_alarma = hora_alarma.substr(0,2)
   hora_alarma = parseInt(hora_alarma);
   minutos_alarma = minutos_alarma.substr(3,4)
   minutos_alarma = parseInt(minutos_alarma);

  if (hora_alarma <= hora_actual) {
      var horas_restantes = 24 - hora_actual + hora_alarma;
  }else{
      var horas_restantes = hora_alarma - hora_actual;
  }

  if (minutos_alarma < minutos_actual) {
      var minutos_restantes = 60 - minutos_actual + minutos_alarma;
      horas_restantes = horas_restantes -1
  }else{
      var minutos_restantes = minutos_alarma - minutos_actual;
  }

  // inserta en cuadro las variables de tiempo conseguidas
  var span = document.querySelector('#tiempo_restante'+indice)

  if (horas_restantes != 0) {
      
      span.textContent = 'Esta alarma sonara en '+ horas_restantes+ ' horas y '+ minutos_restantes+ ' minutos.'
  }else{
    span.textContent = 'Esta alarma sonara en '+ minutos_restantes+ ' minutos.'
  }


  // hace visible cuadro de tiempo restante
  var check = document.querySelector('#check'+indice);

  if (check.checked == true) {
      span.style.display = 'inline';
      setTimeout(function(){
          span.style.display = 'none';
      },3000)
  }else{
      span.style.display = 'none';
  }

}


// CUADRO EMERGENTE (ALERTA) CON TIEMPO RESTANTE PARA ALARMA CREADA
function tiempo_restante_nueva() {

    var hora_actual = new Date().getHours();
    var hora_alarma = parseInt(select_hora.value);
    var minutos_actual = new Date().getMinutes();
    var minutos_alarma = parseInt(select_minutos.value);

    if (hora_alarma < hora_actual) {
        var horas_restantes = 24 - hora_actual + hora_alarma;
    }else{
        var horas_restantes = hora_alarma - hora_actual;
    }
  
    if (minutos_alarma < minutos_actual) {
        var minutos_restantes = 60 - minutos_actual + minutos_alarma;
        horas_restantes = horas_restantes -1
    }else{
        var minutos_restantes = minutos_alarma - minutos_actual;
    }
    
    var modal = document.querySelector('#modal_texto');

    if (horas_restantes != 0) {
      
        modal.textContent = 'La alarma sonara en '+ horas_restantes+ ' horas y '+ minutos_restantes+ ' minutos.'
    }else{
      modal.textContent = 'La alarma sonara en '+ minutos_restantes+ ' minutos.'
    }

}

// EDITAR ALARMAS _____________
var index = -1
function editar_alarma(indice) {
    if (index == -1) {
        var hora = document.querySelector('#hora'+indice).textContent.substr(0,2);
        var minutos = document.querySelector('#hora'+indice).textContent.substr(3,4)
        console.log(hora, minutos);
        // var minutos = 
        boton_agregar(hora, minutos);
        index = indice; // para boton 'guardar'

    }else{
        index = -1;
        boton_agregar()

    }
}



// MUESTRA ALARMAS ALMACENADAS APENAS ABRE LA PANTALLA ________________
if(JSON.parse(localStorage.getItem('alarmas')) != null) {
    var alarmas = JSON.parse(localStorage.getItem('alarmas'))
}else{
    var alarmas = [];
    var alarma = {
        hora: '09',
        minutos: '00',
        descripcion: 'Alarma de demostracion'
    }
    alarmas.push(alarma);
}
pegar_alarmas()

