
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    
}


const urlParams = new URLSearchParams(window.location.search);
const indice = urlParams.has('indice') ? urlParams.get('indice') : null;

let myObj= new Object(), myJSON, obj, locaStorageNote;

let meses = ["enero","febrero", "marzo","abril","mayo","junio", "julio" , "agosto", "septiembre", "octubre", "noviembre","diciembre"]
const info= document.querySelector(".data")

const date = new Date();
let year = date.getFullYear();
let day = String(date.getDate()).padStart(2,"0");
let month= meses[date.getMonth()];
let hour = String(date.getHours()).padStart(2,"0");
let minutes =String(date.getMinutes()).padStart(2,"0");;

let cantidadCaracteres=0

let dateNote = `${day} de ${month} ${hour}:${minutes}`

info.innerHTML= `${dateNote} | ${cantidadCaracteres} caracteres`

const textArea= document.querySelector(".textArea")
const textArea2= document.querySelector(".textArea2")

textArea.addEventListener("keyup", function() {

    cantidadCaracteres = textArea.value.length;

    info.innerHTML= `${dateNote} | ${cantidadCaracteres} caracteres`
  
  });

  const saveNote= document.querySelector(".guardar")
  const showNote= document.querySelector(".mostrar")

  let arrayNotes= [];


  document.querySelector(".back").addEventListener("click", function() {

    window.location.href = "index.html";
  });



  if (indice !== null) {
    console.log('Índice de la nota:', indice);

    locaStorageNote = localStorage.getItem("Notes");
    obj = JSON.parse(locaStorageNote);
    textArea.innerHTML =obj[indice].titulo +`\n`+ obj[indice].nota
    console.log(obj[indice].nota)

    saveNote.addEventListener("click", function() {
      let noteToSave = textArea.value;
  
      let lineas = noteToSave.split('\n');
      let lineasExceptoPrimera = lineas.slice(1).join('\n');
  
      console.log(noteToSave);

      let existingNotes = localStorage.getItem("Notes");
  

      let arrayNotes = existingNotes ? JSON.parse(existingNotes) : [];

      arrayNotes.splice(indice, 1);

      let myObj = { "titulo" : lineas[0], "nota": lineasExceptoPrimera, "date": dateNote };
  
      arrayNotes.push(myObj);
  
      let myJSON = JSON.stringify(arrayNotes);
      localStorage.setItem("Notes", myJSON);
  
      window.location.href = "index.html";
  });

} else {


  saveNote.addEventListener("click", function() {
    let noteToSave = textArea.value;

    let lineas = noteToSave.split('\n');
    let lineasExceptoPrimera = lineas.slice(1).join('\n');

    console.log(noteToSave);

    let existingNotes = localStorage.getItem("Notes");


    let arrayNotes = existingNotes ? JSON.parse(existingNotes) : [];

    let myObj = { "titulo" : lineas[0], "nota": lineasExceptoPrimera, "date": dateNote };

    arrayNotes.push(myObj);


    let myJSON = JSON.stringify(arrayNotes);
    localStorage.setItem("Notes", myJSON);

    window.location.href = "index.html";
});
    console.log('No hay parámetro "indice" en la URL.');
}


