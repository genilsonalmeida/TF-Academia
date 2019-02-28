
let resultadodaBusca = [];
let xhr = new XMLHttpRequest();

$(document).ready(function(){
  $(document).keypress(function(enter){
	if(enter.wich == 13 || enter.keyCode == 13){
		buscarPorNomeNumeroC();
	}
  })
});

function inicializarProcedimentosParaAlunosBusca(){
    if(verificarAlunosBuscaEVasio()){
        exibirMenssagenDeAlunoNaoEncontrado();
        //recarregarPaginaDeListaDeAlunos();
    }
        limparTabelaDeAlunos();
        carragarTabelaComOsAlunosDaBusca();
        paginacaoDaLista(resultadodaBusca.totalPages);
}

function buscarPorNomeNumeroC() {
    
    let valor = document.getElementById('buscaValor').value.toUpperCase();
    console.log(valor);
    xhr.open('GET', 'http://localhost:8081/aluno/buscarNomeCelular/' + valor + '/' + valor + '/0');

    xhr.onload = function () {
        if (this.status == 200) {
            resultadodaBusca = JSON.parse(this.responseText);
            console.log(alunoRequest);
            inicializarProcedimentosParaAlunosBusca();
        }
    };
    xhr.onerro = () => alert('ERRO');
    xhr.send();
}

function retornarElementosDoResultadoDaBusca(){
    return resultadodaBusca.content;
}

function retornarQuantidadeDeElementosDoResultado(){
    return resultadodaBusca.totalElements;
}


function verificarAlunosBuscaEVasio() {
    if (retornarQuantidadeDeElementosDoResultado() === 0) {
        return true;
    }
}

function limparTabelaDeAlunos(){
    document.getElementById('list-aluno').innerHTML = "";
}

function carragarTabelaComOsAlunosDaBusca(){
    console.log("carrgando alunos");
    let alunos = retornarElementosDoResultadoDaBusca();
    posicaoNoContainer = 0;
    alunos.forEach(element =>{
        atualizandoLista(element, posicaoNoContainer);
        posicaoNoContainer++;
    });   
}



function exibirMenssagenDeAlunoNaoEncontrado() {
    document.getElementById('alert').innerHTML = '<div class="alert alert-danger alert-dismissible">'
        + '<strong>Não Encontrado!</strong> Este nome não Refere-se a um Aluno Cadastrado.'
        + '</div>'
}
function recarregarPaginaDeListaDeAlunos(){
   document.location = "lista-de-alunos.html";
}