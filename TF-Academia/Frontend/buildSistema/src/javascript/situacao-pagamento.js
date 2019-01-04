
let registroId = localStorage.getItem('registroId');
let http = new XMLHttpRequest();

$('#botao-voltar').click(function () {
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

function newDate(){
    console.log("Entrei!");
}

function atualizandoLista() {
    document.getElementById('list-aluno').innerHTML = "";
    for (var i = 0; i < recebe.pagamentos.length; i++) {
        let tr = $('<tr>');
        let cols = '';
        var data = newDate(recebe.pagamentos[i].dataDoPagamento);
        cols += '<th scope="row">'+(i + 1)+'</th>';
        cols += '<th scope="row">' + recebe.pagamentos[i].dataDoPagamento + '</th>';
        cols += '<th scope="row"> R$ ' + recebe.pagamentos[i].valor + ',00 </th>'
        cols += '<th scope="row">' + recebe.pagamentos[i].descricaoDoPagamento + '</th>';
        cols += '<th scope="row"  onmouseover="mudarCorDaColunaQuandoMousePassar(this)" onmouseout="mudarCorDaColunaQuandoMouseSair(this)"  onClick="removerPagamento(' + i + ')" ><img   src="../../assets/icones/baseline-delete-24px.svg"></th>'
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

function adicionarNomeDoAlunoADiv() {
    document.getElementById('nome-aluno').innerHTML = localStorage.getItem('alunoNome');
}

function removerPagamento(posicao) {

    var r = confirm("Tem certeza que deseja excluir o pagamento?");
    if (r == true) {
        let http = new XMLHttpRequest();
        http.open('DELETE', 'http://localhost:8081/registroPagamento/' + registroId + '/deletePagamento');
        http.setRequestHeader('Content-Type', 'application/json', true);
        http.onload = function () {
            if (this.status == 200) {
                tabela(0);
            }
        }
        let pagamento = {
            'id': recebe.pagamentos[posicao].id
        };

        http.onerro = () => alert('ERRO');
        http.send(JSON.stringify(pagamento));
    }

}
function mudarCorDaColunaQuandoMousePassar(x) {
    x.style.backgroundColor = "lightblue";
}
  
  function mudarCorDaColunaQuandoMouseSair(x) {
    x.style.backgroundColor = "white";  
}
tabela(0);
adicionarNomeDoAlunoADiv();