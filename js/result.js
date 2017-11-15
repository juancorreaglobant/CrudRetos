window.onload = inicializar;
var ResultChallenges;
var refirebase;
var tbodyformRS;

function inicializar() {

    ResultChallenges = document.getElementById("ResultChallenges");

    tbodyformRS = document.getElementById("tbody-formRS");
    refirebase = firebase.database().ref().child("Retos_result");

    mostrarResult();
}
function mostrarResult() {

    refirebase.on("value", function (snap) {
        var datas = snap.val();

        var filassMostrar = "";
        var most = "reto";
        for (var key in datas) {
            var retos = "";
            for (var i = 1; Object.keys(datas[key].Retos).length >= i; i++) {
                //items: event.target.items.value
                var numero = Object.keys(datas[key].Retos[most + i]).length;
                var pantalla=95/Object.keys(datas[key].Retos).length;
                console.log(pantalla);
                var result = "";
                for (var f = 0; numero > f; f++) {
                    result +=
                        "<tr><td><div style='margin:3px;'><b>" + datas[key].Retos[most + i][f]['item'] + "</b>" +
                        "<pre><xmp>" + datas[key].Retos[most + i][f]['result'] + "</xmp></pre></div></td></tr>";
                }
                retos += "<table  style='width:"+pantalla+"%;  float:left; text-align: center;'><tr>" +
                    "<td><b> Reto " + i + "</b></td></tr>" + result + "</table>";
            }
            filassMostrar += "<tr>" +
                "<td style=''>" + retos + "</td>" +
                "<td>" +
                '<a href="' + datas[key].CVURL + '" target="_blank">' +
                '<span class="glyphicon glyphicon-eye-open"></span>' +
                '</a>' +
                "</td>" +
                "</tr>"
            retos = "";
        }
        tbodyformRS.innerHTML = filassMostrar;
    });
    ResultChallenges.reset();
}




