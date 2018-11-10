$('.botao').click(AUTENTICACAO); //evento executa funcão -> AUTENTICACAO(event)

function AUTENTICACAO(event) {
    event.preventDefault();
    if ($('#formGroupExampleInput').val() == 'usuario' && $('#formGroupExampleInput2').val() == '123') {
        location.href = '../pages/principal.html';        
    }
    $('input').val('');
    
}
