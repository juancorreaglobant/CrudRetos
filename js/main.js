window.onload= inicializar;
var formchallenges;
var referenciafirebase;
var tbodyform;
var CREATE = "SAVE";
var UPDATE = "UPDATE";
var modo = CREATE;
var refElementEdit;

function inicializar(){
    formchallenges = document.getElementById("formchallenges");
    tbodyform = document.getElementById("tbody-form");

    formchallenges.addEventListener("submit", enviarchallenges, false);
    referenciafirebase = firebase.database().ref().child("Retos_info");
 
     mostrarChallenges();
}

function mostrarChallenges(){

    referenciafirebase.on("value", function(snap){
     var datos = snap.val();
     var filasMostrar="";
    for(var key in datos){
    filasMostrar += "<tr>" +
    "<td>"+ datos[key].titulo + "</td>" +
    "<td>"+ datos[key].descripcion + "</td>" + 
    "<td>"+ datos[key].items + "</td>" + 
    "<td>"+
    '<button class="btn btn-default editar" data-challenge="' + key +'">'+
    '<span class="glyphicon glyphicon-pencil"></span>'+
    '</button>'+
    '<button class="btn btn-danger borrar" data-challenge="' + key +'">'+
    '<span class="glyphicon glyphicon-trash"></span>'+
    '</button>'+
    "</td>" + 

    "<tr>"

       }
      tbodyform.innerHTML = filasMostrar;
      if(filasMostrar !=""){
        var elementEdit = document.getElementsByClassName("editar");
        for(var i = 0; i < elementEdit.length; i++){
            elementEdit[i].addEventListener("click", EditChallenges, false);

        }
          var elementDelete = document.getElementsByClassName("borrar");
          for(var i = 0; i < elementDelete.length; i++){
              elementDelete[i].addEventListener("click", DeleteChallenges, false);

          }
      }
    });
}
function EditChallenges(){
    var keyElementEdit = this.getAttribute("data-challenge");
    refElementEdit = referenciafirebase.child(keyElementEdit);
    refElementEdit.once("value", function(snap){
     var data = snap.val();
     document.getElementById("tituloo").value = data.titulo;
     document.getElementById("descripcionn").value = data.descripcion;
     document.getElementById("itemss").value = data.items;
    });
    document.getElementById("btnSave").value = UPDATE;
    modo = UPDATE;
}


function  DeleteChallenges(){
    var keyElemntDelete = this.getAttribute("data-challenge");
    var refElementDelete = referenciafirebase.child(keyElemntDelete);
    refElementDelete.remove();
}
 function enviarchallenges(event){
     event.preventDefault();
     switch(modo){
         case CREATE:
         referenciafirebase.push({
               titulo: event.target.titulo.value,
               descripcion: event.target.descripcion.value,
               items: event.target.items.value
                });
                break;

         case UPDATE:
         refElementEdit.update({
            titulo: event.target.titulo.value,
            descripcion: event.target.descripcion.value,
            items: event.target.items.value
         });
         modo = CREATE;
         document.getElementById("btnSave").value = CREATE;
         break;
     }
     formchallenges.reset();
 }



