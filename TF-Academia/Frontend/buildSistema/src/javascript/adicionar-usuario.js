$('#botao').click(AUTENTICACAO); //evento executa funcão -> AUTENTICACAO(event)

function AUTENTICACAO(event) {
    event.preventDefault();
    if ($('#senha').val() != $('#confSenha').val()) {
        alert("Senhas diferentes!\nDigite a mesma senha em SENHA e SENHA NOVAMENTE.");
    } else {
        alert("Usuário Cadastrado com sucesso!");
        location.href = '../pages/principal.html';
    }
    $('input').val('');
}

$('#btn-cancel').click(function(){
    var r = confirm("Tem certeza que deseja sair?");
    if (r == true) {
        location.href = '../pages/principal.html';
    }
});