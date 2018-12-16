$('#botao-cancelar').click(function(){
    var r = confirm("Tem certeza que deseja cancelar o cadastro?");
    if (r == true) {
        location.href = '../pages/principal.html';
    }
});