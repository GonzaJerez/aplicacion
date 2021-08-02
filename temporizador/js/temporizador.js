'use strict'

function fondo() {
    
    if (localStorage.getItem('fondo') == 'nocturno') {
        theme.removeAttribute('href');
        theme.setAttribute('href', './css/dark.css');
    }else{
        theme.removeAttribute('href');
        theme.setAttribute('href', './css/light.css');
    }
}

fondo();

var seleccionador = document.querySelector('#seleccionador')
var tiempo = document.querySelector('#tiempo')
var select = document.querySelectorAll('.select')
var select_minutos = document.querySelector('.select_minutos')
var select_segundos = document.querySelector('.select_segundos')



for (var i = 0; i < 60; i++) {
	let option = document.createElement('option');
	option.setAttribute('value', i)
	let texto = document.createTextNode(i)
	option.append(texto);
	select_minutos.append(option)
}

for (var i = 0; i < 60; i++) {
	let option = document.createElement('option');
	option.setAttribute('value', i)
	let texto = document.createTextNode(i)
	option.append(texto);
	select_segundos.append(option)
}


var minutos = document.querySelector('#minutos');
var segundos = document.querySelector('#segundos');
var decimas = document.querySelector('#decimas');

var contador = 0;



var inicialMin = 0;
var inicialSeg = 0;
var inicialDec = 0;

var copia_min = 0;
var copia_seg = 0;
var copia_dec = 0;



function intervalo(){
	var intervaloDec = setInterval(function(){

		inicialSeg= localStorage.getItem('inicialSeg'); 							// recupera y usa valores almacenados en localstorage
		inicialMin= localStorage.getItem('inicialMin');

		
		inicialDec= inicialDec - 1; 												// inicia intervalo restando 1 a las decimas
		decimas.innerHTML = ' :'+ceroDelante(inicialDec);							// muestra los nuevas decimas

		if (inicialDec <0) { 														// cuando llega a 0 las decimas  

			inicialDec = 9; 														// da la vuelta a 9 las decimas
			decimas.innerHTML = ' :'+ ceroDelante(inicialDec); 						// muestra las nuevas decimas 

			inicialSeg = inicialSeg -1;												// resta 1 a los segundos
			segundos.innerHTML = ' :'+ ceroDelante(inicialSeg);						// muestra los nuevos segundos
			localStorage.setItem('inicialSeg', inicialSeg);							// carga esos nuevos segundos al localstorage
			
			minutos.innerHTML = ceroDelante(inicialMin);							// muestra lo minutos

			if (inicialSeg <0) {													// cuando llega a 0 los segundos
				inicialSeg = 59;													// da la vuelta a 59 nuevamente
				segundos.innerHTML = ' :'+ ceroDelante(inicialSeg);					// muestra los nuevos segundos
				localStorage.setItem('inicialSeg', inicialSeg);						// carga los nuevos segundos

				inicialMin = inicialMin - 1;										// resta 1 a los minutos
				minutos.innerHTML = ceroDelante(inicialMin);						// muestra los nuevos minutos
				localStorage.setItem('inicialMin', inicialMin);						// carga los nuevos minutos al localstorage

			}
			
		}
	

		

	},100);

	
	return intervaloDec;
}


var interval;

var iniciar = document.querySelector('#iniciar');
var detener = document.querySelector('.detener');
var borde = document.querySelector('#borde');
var reiniciar = document.querySelector('#reiniciar');
var bordeReiniciar = document.querySelector('#borde2')
var cancelar = document.querySelector('#cancelar')
var bordeCancelar = document.querySelector('#borde3')
// var audioID = document.querySelector('#audioID')
var div_audio = document.querySelector('#div_audio')


// AGREGAR CERO ADELANTE DE NUMEROS DE UN DIGITO PARA Q SIEMPRE SE VEAN 2 DIGITOS
function ceroDelante(num){
	if (num < 10) {
		return '0'+num;
	}else{
		return num;
	}
}



function boton(){
	if (iniciar.textContent == 'Iniciar') {
		if (select_minutos.value == 0 && select_segundos.value == 0) {
			
		}else{
			interval = intervalo();
			iniciar.innerHTML = 'Detener'
			iniciar.className= 'rojo';
			borde.className = 'bordeRojo';
			reiniciar.removeAttribute('disabled')

			seleccionador.style.display = 'none'
			tiempo.style.display = 'block'

			reiniciar.style.display= 'inline';
			cancelar.style.display= 'inline';
			iniciar.style.float = 'left'
			borde.style.marginTop= '-6px'
			borde.style.marginLeft= '14px'
			bordeReiniciar.style.display= 'block'
			bordeCancelar.style.display= 'block'
			bordeCancelar.style.marginLeft= '144px'
			bordeReiniciar.style.marginTop= '-6px'

			alarma();
			

			if (contador == 0) {
				
				localStorage.setItem('inicialMin', parseInt(select_minutos.value));
				localStorage.setItem('inicialSeg', parseInt(select_segundos.value));
				inicialDec = 0;
		
				copia_min = localStorage.getItem('inicialMin');
				copia_seg = localStorage.getItem('inicialSeg');
				copia_dec = inicialDec;
				
				contador = 1;
			}

		}		


	}else{
		clearInterval(interval);
		iniciar.innerHTML = 'Iniciar';
		iniciar.className ='verde';
		borde.className = 'bordeVerde'
	}
}


iniciar.addEventListener('click', function(){
	boton();
})


reiniciar.addEventListener('click', function(){

	inicialMin = copia_min;
	inicialSeg = copia_seg;
	inicialDec = copia_dec;

	localStorage.setItem('inicialMin', parseInt(inicialMin));
	localStorage.setItem('inicialSeg', parseInt(inicialSeg));
	

	console.log(inicialSeg);

	reiniciar.setAttribute('disabled', 'disabled');
	clearInterval(interval);
	iniciar.innerHTML = 'Iniciar';
	iniciar.className ='verde';
	borde.className = 'bordeVerde';

	stopAlarma();

	iniciar.style.display = 'inline'
	borde.style.display = 'block'
	iniciar.style.float = 'left'
	borde.style.marginTop= '-6px'
	bordeCancelar.style.marginLeft = '144px'
	


	minutos.innerHTML = ceroDelante(inicialMin);
	segundos.innerHTML = ':'+ ceroDelante(inicialSeg);
	decimas.innerHTML = ':'+ ceroDelante(inicialDec);
})

cancelar.addEventListener('click', function(){
	seleccionador.style.display = 'block'
	tiempo.style.display = 'none'
	reiniciar.setAttribute('disabled', 'disabled')
	clearInterval(interval);
	iniciar.innerHTML = 'Iniciar';
	iniciar.className ='verde';
	borde.className = 'bordeVerde'

	reiniciar.style.display= 'none';
	cancelar.style.display= 'none';
	bordeReiniciar.style.display= 'none'
	bordeCancelar.style.display= 'none'
	iniciar.removeAttribute('style', 'float: left')
	borde.removeAttribute('style')

	if (document.querySelector('#audioID')) {
		
		stopAlarma();
	}



	contador = 0;
})

var timer = '';
function alarma() {

	let audio = document.createElement('audio')
	audio.setAttribute('id', "audioID");
	let mp3 = document.createElement('source');
	mp3.setAttribute('src', 'alarma.mp3')
	mp3.setAttribute('type', 'audio/mp3')
	audio.append(mp3);
	div_audio.append(audio)

	timer = setInterval(function(){
		if (inicialMin == 0 && inicialSeg ==0 && inicialDec == 0) {
			
			document.querySelector('#audioID').play();

			iniciar.style.display = 'none';
			borde.style.display= 'none'
			bordeCancelar.style.marginLeft= '84px'
		}
		
		
	},500)
	
}


function stopAlarma() {

	clearInterval(timer)
	document.querySelector('#audioID').pause();
	
	let padre = document.querySelector('#audioID').parentNode;
	padre.removeChild(document.querySelector('#audioID'))

}