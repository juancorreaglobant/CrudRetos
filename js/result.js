window.onload= inicializar;
var ResultChallenges;
var refirebase;
var tbodyformRS;

function inicializar(){
 
    ResultChallenges = document.getElementById("ResultChallenges");
    
    tbodyformRS = document.getElementById( "tbody-formRS" );
    refirebase = firebase.database().ref().child("Retos_result");
 
     mostrarResult();
}
function mostrarResult() {
    refirebase.on("value", function(snap){
        var datas = snap.val();
        var filassMostrar="";
       for(var key in datas){
       filassMostrar += "<tr>" +
       "<td>"+ datas[key].Retos + "</td>" +
       "<td>"+ datas[key].CVURL + "</td>" +
       "<td>"+
       '<button class="btn btn-default download" data-challenge="' + key +'">'+
       '<span class="glyphicon glyphicon-eye-open"></span>'+
       '</button>'+
       "</td>" + 
       "<tr>"
    
}
tbodyformRS.innerHTML = filassMostrar;
console.log(datas);
    });
    ResultChallenges.reset();
}

    
   

