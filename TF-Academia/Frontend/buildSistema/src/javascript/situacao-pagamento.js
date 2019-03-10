
let registroId = localStorage.getItem('registroId');
let http = new XMLHttpRequest();
let data = new Date();
let meses = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

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
            validarResultado();
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
        console.log(recebe.pagamentos[posicao].id);

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

function validarResultado(){
    if(recebe.pagamentos.length === 0){
        exibirMessagenDetabelaVazia();
    }
}

function exibirMessagenDetabelaVazia(){
    let divContent = document.querySelector('#sem-pagamento');
    divContent.style.backgroundColor = 'rgba(255,166,77)';
    divContent.style.margin = '0px auto';
    divContent.style.width = '30%';
    divContent.style.padding = '5% 5% 5% 5%';
    divContent.style.borderRadius = '3% 3% 3% 3%';
    let menssagen = document.createElement('h1');
    menssagen.textContent = "Ainda Não há Pagamentos";
    menssagen.style.textAlign = 'center';
    divContent.appendChild(menssagen);
}

tabela(0);
adicionarNomeDoAlunoADiv();