


document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    
}

let myObj= new Object(), myJSON, obj, locaStorageNote;

const notas = document.querySelector(".notas")
const column1= document.querySelector(".column-1")
const column2=document.querySelector(".column-2")



window.addEventListener("load", function() {




  if(localStorage.getItem("Notes")!=null){

  
    locaStorageNote = localStorage.getItem("Notes");
    obj = JSON.parse(locaStorageNote);

    console.log(obj.length)

   
    let i = obj.length

    let orden = 0

  obj.reverse().forEach(ob => {

    console.log(ob.titulo)

      i--

      let note = this.document.createElement("article")
      note.classList.add("nota")
      note.classList.add(i)

      let title= this.document.createElement("span")
      title.classList.add("title")
      title.innerText = ob.titulo

      let content = this.document.createElement("p")
      content.classList.add("content")
      content.innerText= ob.nota

       let date = this.document.createElement("blockquote")
      date.classList.add("date")

      let day = ob.date.substring(0, 3);
      let month = ob.date.split("de ")[1].substring(0, 3);
      let hour = ob.date.slice(-6);
      

      date.innerText= day + month + hour 

      note.appendChild(title)
      note.appendChild(content)
      note.appendChild(date)
      if(orden==0){

        column1.appendChild(note)
      }else if(orden%2===0){

        column1.appendChild(note)
        
      } 
      else {
        column2.appendChild(note)
      }
      console.log(orden)
      orden++
  });

  console.log(obj.length)

  const lilNotes = this.document.getElementsByClassName("nota")

  const lilNotesArray = Array.from(lilNotes);

  let numeroNota =[];

  lilNotesArray.forEach(function (element) {
    element.addEventListener("touchstart", function () {
      setTimeout(function () {
      console.log('Presionando '+ element.classList.item(1));

      const clase = element.classList.item(1);
      let check = document.createElement("span")

      check.classList.add("icon-check-circle")

      
        if (numeroNota.includes(clase)) {

          check = element.querySelector(".icon-check-circle");
          check.remove();
          console.log(element.childNodes)

            numeroNota = numeroNota.filter(item => item !== clase);
            
        } else {
          element.appendChild(check)
            numeroNota.push(clase);
        }

        if(numeroNota.length===1) cantidad = "elemento" 
        else  cantidad="elementos"

        closeButton = document.querySelector(".close")
        closeButton.classList.add("visible");
        header = document.querySelector(".header")
        header.style.display = "none";
        contadorElementos = document.querySelector(".elementsSelected")
        contadorElementos.innerText = `${numeroNota.length} ${cantidad} seleccionados `
        footer = document.querySelector(".footer")
        contadorElementos.classList.add("visible");
        footer.classList.add("visible-2");
        threeDots= document.querySelector(".icon-dots-three-vertical")
        threeDots.style.display = "none";
        burguerButton = document.querySelector(".icon-list2")
        burguerButton.classList.add("visible-2");

      console.log(numeroNota)

      element.classList.toggle('selected')
    });}, 500);
  });


  this.document.querySelector(".icon-list2").addEventListener("click", function () {

  if (numeroNota.length < lilNotesArray.length)  {
  
      lilNotesArray.forEach(element => {
        const clases = element.classList.item(1);

        if (!numeroNota.includes(clases)) {
          numeroNota.push(clases);
      
          const hasCheckChild = Array.from(element.children).some(child => child.classList.contains("icon-check-circle"));
      
          if (!hasCheckChild) {
            let check = document.createElement("span");
            check.classList.add("icon-check-circle");
            element.appendChild(check);
            element.classList.toggle('selected')
          }
        }
      });
    }  
     else if (numeroNota.length >= lilNotesArray.length) {
      lilNotesArray.forEach(element => {
        const clases = element.classList.item(1);
        let check = element.querySelector(".icon-check-circle");
  
        if (check) {
          element.removeChild(check);
          element.classList.toggle('selected')
        }

        
      });
  
      numeroNota = [];
    }
    
    console.log(numeroNota)
    if(numeroNota.length===1) cantidad = "elemento" 
    else  cantidad="elementos"

   contadorElementos = document.querySelector(".elementsSelected")
   contadorElementos.innerText = `${numeroNota.length} ${cantidad} seleccionados `
  });
  

  let indexNota = ""

  lilNotesArray.forEach(function (element) {
    element.addEventListener("click", function () {

      let clase = element.classList.item(1);
      
      indexNota=clase

      window.location.href = "nota.html?indice=" + indexNota;
      console.log(indexNota)

    });
  });


  this.document.querySelector(".close").addEventListener("click", function () {

    header.style.display = "";
    threeDots.style.display = "";
    
    document.querySelector(".elementsSelected").classList.remove("visible")
    document.querySelector(".close").classList.remove("visible")
    document.querySelector(".footer").classList.remove("visible-2")
    burguerButton.classList.remove("visible-2");
    
    

    lilNotesArray.forEach(function (element) {

      const clase = element.classList.item(1);

      if (numeroNota.includes(clase)) {

        check = element.querySelector(".icon-check-circle");
        check.remove();
        console.log(element.childNodes)

          numeroNota = numeroNota.filter(item => item !== clase);

          element.classList.remove("selected")
          
      }
  });

  });





  let listaActual = JSON.parse(localStorage.getItem("Notes")) || [];

  console.log(listaActual)


  this.document.querySelector(".remove").addEventListener("click", function() {

    numeroNota.sort((a, b) => b - a);
    
    for (let i = 0; i < numeroNota.length; i++) {
      const indexToRemove = numeroNota[i];
      listaActual.splice(indexToRemove, 1);
      
    }
  

    localStorage.setItem("Notes", JSON.stringify(listaActual));

     window.location.href = "index.html";

    
  });


}

 });


 document.getElementById("addNote").addEventListener("click", function() {

  window.location.href = "nota.html";
});

var input, filter, ul, li, span, i, txtValue,txtValue2, p;


document.getElementById("buscar").addEventListener("keyup", function() {

  input = document.getElementById("buscar");
  filter = input.value.toUpperCase();
  ul = document.querySelector(".column-1");
  ul2 = document.querySelector(".column-2");
  li = ul.getElementsByTagName("article");
  li2 = ul2.getElementsByTagName("article");

  for (i = 0; i < li.length; i++) {
    span = li[i].getElementsByTagName("span")[0];
    p = li[i].getElementsByTagName("p")[0];

    txtValue = span.textContent || span.innerText;
    txtValue2 = p.textContent || p.innerText;

    if ((txtValue.toUpperCase().indexOf(filter) > -1)||(txtValue2.toUpperCase().indexOf(filter) > -1)) {
        li[i].style.display = "";
    } else {
        li[i].style.display = "none";
    }
}

for (i = 0; i < li.length; i++) {
  span = li2[i].getElementsByTagName("span")[0];
  p = li2[i].getElementsByTagName("p")[0];

  txtValue = span.textContent || span.innerText;
  txtValue2 = p.textContent || p.innerText;

  if ((txtValue.toUpperCase().indexOf(filter) > -1)||(txtValue2.toUpperCase().indexOf(filter) > -1)) {
      li2[i].style.display = "";
  } else {
      li2[i].style.display = "none";
  }
}


  console.log(li)

console.log('letra')

});





