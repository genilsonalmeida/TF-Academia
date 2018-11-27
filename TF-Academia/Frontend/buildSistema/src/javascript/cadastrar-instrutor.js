//Função para carregar o cabeçalho
$(document).ready(function(){
    $("#cabecalho").load("cabecalho.html");
});

var novo = {
    nome: $('#nome').val(),
    dataNascimento: $('#dataNascimento').val(),
    sexo: $('#sexo').val(),
    cpf: $('#cpf').val(),
    cep: $('#cep').val(),
    endereco: $('#endereco').val(),
    numero: $('#numero').val(),
    cidade: $('#cidade').val(),
    bairro: $('#bairro').val(),
    uf: $('#uf').val(),
    celular: $('#celular').val(),
    residencial: $('#residencial').val(),
};

$('#botao-cancelar').click(function () {
    var r = confirm("Tem certeza que deseja cancelar o cadastro?");
    if (r == true) {
        location.href = '../pages/principal.html';
    }
});

$('#botao-finalizar').click(function (event) {
    event.preventDefault();

    save(event);
    location.href = '../pages/principal.html';
});


function save(event) {
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('POST',  'Url salvar instrutor');

    xhr.setRequestHeader('Content-Type', 'application/json', true);

    xhr.onerro = () => alert('ERRO');
    xhr.send(JSON.stringify(novo));
    alert("Cadastro efetuado com sucesso ..")
}



