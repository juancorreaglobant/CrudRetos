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
        var most="reto";
       for(var key in datas){
        var retos
        for(var i=1; Object.keys(datas[key].Retos).length>=i; i++){
            //items: event.target.items.value
            retos += "<td>"+
            "<center>"+
            "<b>"+ " Reto "+i+":"+"</b>"+"<br>"+
            "<i>"+datas[key].Retos[most+i]+"</i>"+
            "</center>"+
            "</td>"
            ;
        }
       filassMostrar += "<tr>" +
       "<td>"+ retos + "</td>" +
       "<td>"+
       '<a href="'+datas[key].CVURL+'" target="_blank">'+
       '<span class="glyphicon glyphicon-eye-open"></span>'+
       '</a>'+
       "</td>" + 
       "</tr>"
       retos="";
}
tbodyformRS.innerHTML = filassMostrar;
    });
    ResultChallenges.reset();
}

    
   

