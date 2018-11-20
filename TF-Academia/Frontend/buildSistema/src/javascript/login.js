$('#botao').click(AUTENTICACAO); //evento executa funcão -> AUTENTICACAO(event)

function AUTENTICACAO(event) {
    event.preventDefault();
    if ($('#usuario').val() == 'admin' && $('#senha').val() == 'admin') {
        location.href = '../pages/principal.html';
    }
    $('input').val('');

}