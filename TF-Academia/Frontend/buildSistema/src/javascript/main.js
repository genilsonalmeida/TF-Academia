//Função para carregar o cabeçalho e rodape
$(document).ready(function(){
    $("#cabecalho").load("cabecalho.html");
    $("#rodape").load("rodape.html");
});
function formatar(num) {
    let resultado = num.substr(0, 0) + "(" + num.substr(0);
    resultado = resultado.substr(0, 3) + ")" + resultado.substr(3);
    resultado = resultado.substr(0, 4) + " " + resultado.substr(4);
    resultado = resultado.substr(0, 10) + "-" + resultado.substr(10);

    return resultado;
}


