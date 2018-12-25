let recebe;
$(document).ready(function () {
    
});


let paginaAtual;
   
function tabela(paginadefalt) {
    paginaAtual = paginadefalt;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8081/instrutor/lista/'+paginadefalt);

    xhr.onload = function () {

        if (this.status == 200) {
            recebe = JSON.parse(this.responseText);
            console.log(recebe.totalPages);
            paginacaoDaLista(recebe.totalPages);
            
            atualizandoLista();
        }
    };
    xhr.onerro = () => alert('ERRO');
    xhr.send();

}

$('#botao-voltar').click(function () {
    location.href = '../pages/principal.html';
});

$('#page').click(function () {
    location.href = '../pages/principal.html';
});

$('#alertSair').click(function () {
    console.log('sair');
    document.getElementById('alert').innerHTML = "";
});



$('#button-addon2').click(function () {
    document.getElementById('listaEncontrados').innerHTML = "";

    buscarPorNome();
});
$("a#ajax").click(function() { // inclui todos os links com id="ajax"
$("#ajaxContent").load($(this).attr("href")); // carrega o conteúdo da página em HREF dentro da DIV #ajaxContent (id="ajaxContent")
return false; // remove a ação do link para navegar até a página do HREF, pois ela já foi carregada na DIV
 });

 function editarAluno(id) {   
    localStorage.setItem('idInstrutor', recebe.content[id].id);
    document.location = "atualizar-instrutor.html"
  }



function buscarPorNome(){
    
    let nome = document.getElementById('nomeInstrutor').value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8081/instrutor/find-name/' + nome);
    let li = " ";

    xhr.onload = function () {
        if (this.status == 200) {
            recebe = JSON.parse(this.responseText);
            console.log(recebe);
            if(recebe.content.length == 0){
                document.getElementById('alert').innerHTML = '<div class="alert alert-danger alert-dismissible">'
                +'<strong>Não Encontrado!</strong> Este nome não Refere-se a um aluno Cadastrado.'  
                +'</div>'
            }else{
                document.getElementById('alert').innerHTML = "";
            }
             
            li = '<li class="list-group-item active">Encontrados</li>';


            for (var i = 0; i < recebe.content.length; i++) {
                 
                
                li += ' <li class="list-group-item"> Nome: ' + recebe.content[i].nome + ' || Email: ' + recebe.content[i].email + ' </li>';
              
                $('ul').append(li);
    
            }
        }
    };
    xhr.onerro = () => alert('ERRO');
    xhr.send();

}   

function atualizandoLista() {
    for (var i = 0; i < recebe.content.length; i++) {
        let tr = $('<tr>');
        let cols = '';
        cols += '<th scope="row">' + i + '</th>';
        cols += '<th scope="row">' + recebe.content[i].nome + '</th>';
        cols += '<th scope="row" onClick="editarAluno('+i+')"><img src="../../assets/icones/baseline-border_color-24px.svg"></th>';
        cols += '<th scope="row"  onClick="removerAluno('+i+')"><img src="../../assets/icones/baseline-delete-24px.svg"></th>'
        tr.append(cols);
        $('tbody').append(tr);

    }
}

function paginacaoDaLista(qntDePaginas){
    let ul = $('<ul>');
    let li = '<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>';

    for(let i = 0; i < qntDePaginas; i++){
    li += '<li class="page-item"><button type="button" class="page-link bnt">'+ i +'</button></li>';   
    }
   li += '<li class="page-item"><a class="page-link" href="#">Next</a></li>';
$('ul').append(li);

selecionandoId(qntDePaginas);
}  

function selecionandoId(pages){
for(let i = 0; i < pages; i++){
  console.log(i);
    document.getElementsByClassName('bnt')[i].onclick = function () {
    document.getElementById("list-instrutores").innerHTML = "";
    document.getElementById("pagination-conteudo").innerHTML = ""; 
    tabela(i);
 };
}
}
tabela(0);
selecionandoId();

function removerAluno(posicao) {
    let http = new XMLHttpRequest();
    let id = recebe.content[posicao].id;
    http.open('DELETE', 'http://localhost:8081/instrutor/'+ id);
    http.setRequestHeader('Content-Type', 'application/json', true);
    http.onload = function(){
        if(this.status == 200){
            document.getElementById("list-instrutores").innerHTML = "";
            document.getElementById("pagination-conteudo").innerHTML = ""; 
            tabela(paginaAtual);
        }
    }
    
    http.onerro = () => alert('ERRO');
    http.send();    
}