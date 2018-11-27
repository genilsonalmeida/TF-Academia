//Função para carregar o cabeçalho
$(document).ready(function(){
    $("#cabecalho").load("cabecalho.html");
});

$('#botao-voltar').click(function () {
    location.href = '../pages/principal.html';
});