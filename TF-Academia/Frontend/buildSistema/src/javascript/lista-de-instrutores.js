let recebe;
$(document).ready(function () {

});


let paginaAtual;

function tabela(paginadefalt) {
    paginaAtual = paginadefalt;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8081/instrutor/lista/' + paginadefalt);

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

$('#fechar-info').click(function () {
alert('lk')
});


$('#button-addon2').click(function () {
    document.getElementById('listaEncontrados').innerHTML = "";

    buscarPorNome();
});
$("a#ajax").click(function () { // inclui todos os links com id="ajax"
    $("#ajaxContent").load($(this).attr("href")); // carrega o conteúdo da página em HREF dentro da DIV #ajaxContent (id="ajaxContent")
    return false; // remove a ação do link para navegar até a página do HREF, pois ela já foi carregada na DIV
});

function editarAluno(id) {
    localStorage.setItem('idInstrutor', recebe.content[id].id);
    document.location = "atualizar-instrutor.html"
}



function buscarPorNome() {

    let nome = document.getElementById('nomeInstrutor').value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8081/instrutor/find-name/' + nome);
    let li = " ";

    xhr.onload = function () {
        if (this.status == 200) {
            recebe = JSON.parse(this.responseText);
            console.log(recebe);
            if (recebe.content.length == 0) {
                document.getElementById('alert').innerHTML = '<div class="alert alert-danger alert-dismissible">'
                    + '<strong>Não Encontrado!</strong> Este nome não Refere-se a um aluno Cadastrado.'
                    + '</div>'
            } else {
                document.getElementById('alert').innerHTML = "";
            }
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
        cols += '<th scope="row">' + recebe.content[i].numeroCelular + '</th>';
        cols += '<th scope="row"  onClick="carregarInfoInstrutor(' + i + ')"><img src="../../assets/icones/info.svg"></th>'
        cols += '<th scope="row" onClick="editarAluno(' + i + ')"><img src="../../assets/icones/baseline-border_color-24px.svg"></th>';
        cols += '<th scope="row"  onClick="removerAluno(' + i + ')"><img src="../../assets/icones/baseline-delete-24px.svg"></th>'
        tr.append(cols);
        $('tbody').append(tr);

    }
}

function listaDeNomesEncontrados() {

    for (var i = 0; i < recebe.content.length; i++) {
        let tr = $('<tr>');
        let cols = '';
        cols += '<th scope="row">' + i + '</th>';
        cols += '<th scope="row">' + recebe.content[i].nome + '</th>';
        cols += '<th scope="row">' + recebe.content[i].numeroCelular + '</th>';
        cols += '<th scope="row" onClick="editarAluno(' + i + ')"><img src="../../assets/icones/baseline-border_color-24px.svg"></th>';
        cols += '<th scope="row"  onClick="removerAluno(' + i + ')"><img src="../../assets/icones/baseline-delete-24px.svg"></th>'
        tr.append(cols);
        $('tbody').append(tr);
    }
}

function paginacaoDaLista(qntDePaginas) {
    let ul = $('<ul>');
    let li = '<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>';

    for (let i = 0; i < qntDePaginas; i++) {
        li += '<li class="page-item"><button type="button" class="page-link bnt">' + i + '</button></li>';
    }
    li += '<li class="page-item"><a class="page-link" href="#">Next</a></li>';
    $('ul').append(li);

    selecionandoId(qntDePaginas);
}

function selecionandoId(pages) {
    for (let i = 0; i < pages; i++) {
        console.log(i);
        document.getElementsByClassName('bnt')[i].onclick = function () {
            document.getElementById("list-instrutores").innerHTML = "";
            document.getElementById("pagination-conteudo").innerHTML = "";
            tabela(i);
        };
    }
}

function removerAluno(posicao) {
    let http = new XMLHttpRequest();
    let id = recebe.content[posicao].id;
    http.open('DELETE', 'http://localhost:8081/instrutor/' + id);
    http.setRequestHeader('Content-Type', 'application/json', true);
    http.onload = function () {
        if (this.status == 200) {
            document.getElementById("list-instrutores").innerHTML = "";
            document.getElementById("pagination-conteudo").innerHTML = "";
            tabela(paginaAtual);
        }
    }

    http.onerro = () => alert('ERRO');
    http.send();
}

function carregarInfoInstrutor(instrutor) {
    console.log(recebe.content[instrutor].dataNascimento);
    let div = document.getElementById('info-instrutor');
    div.innerHTML = "";
    div.innerHTML += '<div class="media" >';
    div.innerHTML += '<img src="img_avatar1.png" class="align-self-start mr-3" style="width:60px">';
    div.innerHTML += '<div class="media-body">';
    div.innerHTML += '<h4>' + recebe.content[instrutor].nome + '</h4>';
    div.innerHTML += '<p>Número: ' + recebe.content[instrutor].numeroCelular + '  Número de emergêmcia:' + recebe.content[instrutor].numeroCelularEmergencia + '</p>';
    div.innerHTML += '<p>Email: ' + recebe.content[instrutor].email + ' </p>';
    div.innerHTML += '<p>Data de nasciemto: ' + recebe.content[instrutor].dataDeNascimento +' </p>';
    div.innerHTML += '<p>Endereço: ' + recebe.content[instrutor].endereco.cidade + ' bairro:' + recebe.content[instrutor].endereco.bairro +' cep:' + recebe.content[instrutor].endereco.cep +'</p>';
    div.innerHTML += '<button onclick="fecharinfo()" type="button"  style="margin-bottom:1.2%; " class="btn btn-danger">fechar</button></div></div> ';
}

function fecharinfo(){
    document.getElementById('info-instrutor').innerHTML="";
    
}
tabela(0);
selecionandoId();
