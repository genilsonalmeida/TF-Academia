
let registroId = localStorage.getItem('registroId');
let http = new XMLHttpRequest();

$('#botao-voltar').click(function(){
    var r = confirm("Tem certeza que deseja sair da tela de pagamento??");
    if (r == true) {
        location.href = '../pages/principal.html';
    }
});

jQuery(window).load(function () {
    $(".loader").delay(500).fadeOut("slow"); //retire o delay quando for copiar!
  $("#tudo_page").toggle("fast");
});


function tabela(numeroPagina) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8081/registroPagamento/' + registroId);
    paginaAtual = numeroPagina;
    xhr.onload = function () {

        if (this.status == 200) {
            recebe = JSON.parse(this.responseText);
            console.log(recebe);
           // paginacaoDaLista(recebe.totalPages);
            atualizandoLista();
        }
    };
    xhr.onerro = () => alert('ERRO');
    xhr.send();

}

function atualizandoLista() {
    document.getElementById('list-aluno').innerHTML = "";
    for (var i = 0; i < recebe.pagamentos.length; i++) {
        let tr = $('<tr>');
        let cols = '';
        cols += '<th scope="row">' + (i + 1) + '</th>';
        cols += '<th scope="row">' + recebe.pagamentos[i].dataDoPagamento + '</th>';
        cols += '<th scope="row">' + recebe.pagamentos[i].valor + '</th>'
        cols += '<th scope="row">' + recebe.pagamentos[i].descricaoDoPagamento + '</th>';
        tr.append(cols);
        $('tbody').append(tr);

    }
}

function buscarPorNomeNumeroCelular() {

    let valor = document.getElementById('buscaValor').value.toLowerCase();
    console.log(valor);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8081/aluno/buscarNomeCelular/' + valor + '/' + valor + '/0');

    xhr.onload = function () {
        if (this.status == 200) {
            recebe = JSON.parse(this.responseText);
            console.log(recebe);
            if (recebe.content.length == 0) {
                document.getElementById('alert').innerHTML = '<div class="alert alert-danger alert-dismissible">'
                    + '<strong>Não Encontrado!</strong> Este nome não Refere-se a um Aluno Cadastrado.'
                    + '</div>'
            } else {

                atualizandoLista();
                paginacaoDaLista(recebe.totalPages);

            }

        }
    };
    xhr.onerro = () => alert('ERRO');
    xhr.send();
}

function adicionarNomeDoAlunoADiv(){
    document.getElementById('nome-aluno').innerHTML = localStorage.getItem('alunoNome');
}

tabela(0);
adicionarNomeDoAlunoADiv();