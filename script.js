let intentos = 6;
let opciones = ["NACER","SIETE","MARZO","ABRIL","ROBIN","MARIO","LUIGI","SUPER"]
let palabra = "";

let gameover = false;
let errorletra = false;
window.addEventListener('load', init)

const button = document.getElementById("Intentar-boton");
const input = document.getElementById("guess-input");
const valor = input.value;
const GRID = document.getElementById("grid");

button.addEventListener("click",()=>{
    verificar();
    if (verificar()==true){
        alert("Debe contener 5 letras");
    }else if (gameover==false){
        intentar();
    }else{
        reintentar();
    }
});


function init() {
   fetch('https://random-word-api.herokuapp.com/word?lang=es&length=5')
   .then(response => response.json())
   .then(response =>{
    palabra = response[0].toUpperCase()
    console.log(palabra)
   })
   .catch(err =>{
    palabra = opciones[Math.floor(Math.random() * opciones.length)];
   })
}
function intentar() {
    const INTENTO = leerIntento();
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === palabra[i]) { //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        } else if (palabra.includes(INTENTO[i])) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {      //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)
    intentos--
    if (intentos == 0) {
        terminar("<h1>PERDISTE!😖</h1>")
    }
    if (INTENTO === palabra) {
        terminar("<h1>GANASTE!😀</h1>")
    }
}
function verificar(){
    let intento = document.getElementById("guess-input");
    let contenedor = new Array(5);
    intento= intento.value;
    for(let i=0;i<contenedor.length;i++){
        contenedor[i]=intento[i];
        if(contenedor[i]===undefined || contenedor[i]===null){
            errorletra = true;
            return errorletra;
        }
    }
}
function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento= intento.value;
    intento = intento.toUpperCase();
    return intento;
}
function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    gameover = true;
    INPUT.disabled = true;
    let contenedor = document.getElementById('intentos');
    contenedor.innerHTML = mensaje;
    button.id="reintentar";
    button.innerText="Reintentar"
}
function reintentar(){
    location.reload();
}

