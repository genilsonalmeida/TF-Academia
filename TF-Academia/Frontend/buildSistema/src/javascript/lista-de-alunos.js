jQuery(window).load(function () {
    $(".loader").delay(500).fadeOut("slow"); //retire o delay quando for copiar!
  $("#tudo_page").toggle("fast");
});

let recebe;
let paginaAtual;
$('#botao-voltar').click(function () {
    location.href = '../pages/principal.html';
});




function tabela(numeroPagina) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8081/aluno/lista/'+numeroPagina);
    paginaAtual = numeroPagina;
    xhr.onload = function () {

        if (this.status == 200) {
            recebe = JSON.parse(this.responseText);
            console.log(recebe);
            paginacaoDaLista(recebe.totalPages);
            atualizandoLista();
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
        cols += '<th scope="row">' + recebe.content[i].numeroCelular + '</th>';
        cols += '<th scope="row"  onClick="carregarInfoAluno(' + i + ')"><img src="../../assets/icones/info.svg"></th>'
        cols += '<th scope="row"  onClick="editarAluno('+i+')"><img src="../../assets/icones/baseline-border_color-24px.svg"></th>';
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
    document.getElementById("list-aluno").innerHTML = "";
    document.getElementById("pagination-conteudo").innerHTML = ""; 
    tabela(i);
 };
 }
}

function editarAluno(id) {   
  localStorage.setItem('idAluno', recebe.content[id].id);
  document.location = "atualizar-aluno.html"
}

function removerAluno(posicion){
let http = new XMLHttpRequest();
let id = recebe.content[posicion].id;   
http.open('DELETE', 'http://localhost:8081/aluno/'+ id);
http.setRequestHeader('Content-Type', 'application/json', true);
http.onload = function(){
    if(this.status == 200){
        document.getElementById("list-aluno").innerHTML = "";
        document.getElementById("pagination-conteudo").innerHTML = ""; 
        tabela(paginaAtual);
    }
}

http.onerro = () => alert('ERRO');
http.send();

}

function carregarInfoAluno(aluno) {
    retornarIconereferenteASexoDoInstrutor(aluno);
    console.log(recebe.content[aluno].dataNascimento);
    let div = document.getElementById('info-aluno');
    div.innerHTML = "";
    div.innerHTML += '<div class="media" >';
    div.innerHTML += '<img src="../../assets/icones/'+caminhoDaImagem+'" class="align-self-start mr-3" style="width:60px">';
    div.innerHTML += '<div class="media-body">';
    div.innerHTML += '<h4>' + recebe.content[aluno].nome + '</h4>';
    div.innerHTML += '<p>Número: ' + recebe.content[aluno].numeroCelular + '  Número de emergêmcia:' + recebe.content[aluno].numeroCelularEmergencia + '</p>';
    div.innerHTML += '<p>Email: ' + recebe.content[aluno].email + ' </p>';
    div.innerHTML += '<p>Data de nasciemto: ' + recebe.content[aluno].dataDeNascimento +' </p>';
    div.innerHTML += '<p>Endereço: ' + recebe.content[aluno].endereco.cidade + ' bairro:' + recebe.content[aluno].endereco.bairro +' cep:' + recebe.content[aluno].endereco.cep +'</p>';
    div.innerHTML += '<button onclick="fecharinfo()" type="button"  style="margin-bottom:1.2%; " class="btn btn-danger">fechar</button></div></div> ';
}

function retornarIconereferenteASexoDoInstrutor(aluno) {
     
    if (recebe.content[aluno].sexo === "MASCULINO") {
        caminhoDaImagem = "man-icon.png";
    } else {
        caminhoDaImagem = "wam-icon.png"
    }
}


function fecharinfo(){
    document.getElementById('info-aluno').innerHTML="";
    
}

tabela(0);
selecionandoId();