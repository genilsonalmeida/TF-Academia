

jQuery(window).load(function () {
    $(".loader").delay(500).fadeOut("slow"); //retire o delay quando for copiar!
    $("#tudo_page").toggle("fast");
});

let recebe;
let paginaAtual;
let proximaLista = 1;
let alunos = [];
let valor
let posicaoNoContainer = 0;
let alunoRequest;
$('#botao-voltar').click(function () {
    location.href = '../pages/principal.html';
});


function adicionarAlunosALista(novosAlunos) {
    novosAlunos.forEach(element => {
        alunos.push(element);
        atualizandoLista(element, posicaoNoContainer);
        posicaoNoContainer++;
    });
}

function tabela(numeroPagina) {


    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8081/aluno/lista/' + numeroPagina);
    paginaAtual = numeroPagina;



    xhr.onload = function () {

        if (this.status == 200) {
            recebe = JSON.parse(this.responseText);
            console.log(recebe);
            adicionarAlunosALista(recebe.content);
            paginacaoDaLista(recebe.totalPages);
            // atualizandoLista();

        }
    };
    xhr.onerro = () => alert('ERRO');
    xhr.send();

}

let nome;
function letraMaiuscula(i) {
    str = alunos[i].nome;
    qtd = alunos[i].nome.length;
    prim = str.substring(0, 1);
    resto = str.substring(1, qtd);
    str = prim.toUpperCase() + resto;
    nome = str;

    return nome;
}

function atualizandoLista(aluno, i) {

    let tr = $('<tr>');
    let cols = '';
    cols += '<th scope="row">' + aluno.matricula + '</th>';
    cols += '<th scope="row">' + aluno.nome + '</th>';
    cols += '<th scope="row">' + aluno.numeroCelular + '</th>';
    cols += '<th scope="row"  onmouseover="mudarCorDaColunaQuandoMousePassar(this)" onmouseout="mudarCorDaColunaQuandoMouseSair(this)" onClick="guardarIdDoRegistroPagamentoNoLocalStorage(' + i + ')"><img src="../../assets/icones/icon-pagamento.png"></th>';
    cols += '<th scope="row"  onmouseover="mudarCorDaColunaQuandoMousePassar(this)" onmouseout="mudarCorDaColunaQuandoMouseSair(this)" onClick="carregarInfoAluno(' + i + ')"><img src="../../assets/icones/info.svg"></th>'
    cols += '<th scope="row"  onmouseover="mudarCorDaColunaQuandoMousePassar(this)" onmouseout="mudarCorDaColunaQuandoMouseSair(this)" onClick="editarAluno(' + i + ')"><img src="../../assets/icones/baseline-border_color-24px.svg"></th>';
    cols += '<th scope="row"  onmouseover="mudarCorDaColunaQuandoMousePassar(this)" onmouseout="mudarCorDaColunaQuandoMouseSair(this)" onClick="removerAluno(' + i + ')"><img src="../../assets/icones/baseline-delete-24px.svg"></th>'
    tr.append(cols);
    $('tbody').append(tr);
    
}
function mudarCorDaColunaQuandoMousePassar(x) {
    x.style.backgroundColor = "lightblue";
}

function mudarCorDaColunaQuandoMouseSair(x) {
    x.style.backgroundColor = "white";
}
function paginacaoDaLista(qntDePaginas) {
    document.getElementById('pagination-conteudo').innerHTML = "";
    let ul = $('<ul>');
    let li = '';
    li += '<li class="page-item"><button type="button" class="page-link bnt-proxima-page">Mais+</button></li>';
    $('ul').append(li);
    selecionandoListaExibida(qntDePaginas);
}

function selecionandoListaExibida(pages) {
    irParaProxmalista(pages);
}

function irParaProxmalista(pagTotal) {
    document.getElementsByClassName('bnt-proxima-page')[0].onclick = function () {
        console.log('função selecionarid')
        if (proximaLista < pagTotal) {
            tabela(proximaLista++);
            console.log(proximaLista)
        } else { alert('Fim da Lista') }

    }
}



function editarAluno(id) {
    localStorage.setItem('idAluno', alunos[id].id);
    document.location = "atualizar-aluno.html"
}

function removerAluno(posicion) {

    var r = confirm("Tem certeza que deseja excluir o aluno?");
    if (r == true) {
        let http = new XMLHttpRequest();
        let id = alunos[posicion].id;
        http.open('DELETE', 'http://localhost:8081/aluno/' + id);
        http.setRequestHeader('Content-Type', 'application/json', true);
        http.onload = function () {
            if (this.status == 200) {
                document.getElementById("list-aluno").innerHTML = "";
                document.getElementById("pagination-conteudo").innerHTML = "";
                tabela(0);

            }
        }

        http.onerro = () => alert('ERRO');
        http.send();
    }

}

function carregarInfoAluno(aluno) {
    retornarIconereferenteASexoDoInstrutor(aluno);
    console.log(alunos[aluno].dataNascimento);
    let div = document.getElementById('info-aluno');
    div.innerHTML = "";
    div.innerHTML += '<div class="media" >';
    div.innerHTML += '<img src="../../assets/icones/' + caminhoDaImagem + '" class="align-self-start mr-3" style="width:60px">';
    div.innerHTML += '<div class="media-body">';
    div.innerHTML += '<h4>' + alunos[aluno].nome.toUpperCase() + '</h4>';
    let numFormatado = formatar(alunos[aluno].numeroCelular);
    let numEmFormatado = formatar(alunos[aluno].numeroCelular);
    div.innerHTML += '<p>Número: ' + numFormatado + '</p>';
    div.innerHTML += '<p>Número de Emergência: ' + numEmFormatado + '</p>';
    div.innerHTML += '<p>Email: ' + alunos[aluno].email + ' </p>';
    div.innerHTML += '<p>CPF: ' + alunos[aluno].cpf + '</p>';
    div.innerHTML += '<p>Data de nasciemto: ' + alunos[aluno].dataDeNascimento + ' </p>';
    div.innerHTML += '<p>Endereço: ' + alunos[aluno].endereco.cidade + '</p>';
    div.innerHTML += '<p>Bairro: ' + alunos[aluno].endereco.bairro + '</p>';
    div.innerHTML += '<p>Rua ou Av e Número da residêcia: ' + alunos[aluno].endereco.rua + ' Num:' + alunos[aluno].endereco.numero + '</p>';
    div.innerHTML += '<p>CEP: ' + alunos[aluno].endereco.cep + '</p>';
    div.innerHTML += '<button onclick="fecharinfo()" type="button"  style="margin-bottom:1.2%; " class="btn btn-danger">Voltar</button></div></div> ';

    $('#divPrincipal').css('visibility', 'hidden');
}

function retornarIconereferenteASexoDoInstrutor(aluno) {

    if (alunos[aluno].sexo === "MASCULINO") {
        caminhoDaImagem = "man-icon.png";
    } else {
        caminhoDaImagem = "wam-icon.png"
    }
}


function fecharinfo() {
    document.getElementById('info-aluno').innerHTML = "";
    $('#divPrincipal').css('visibility', 'visible');
}



function exibirAluno() {
    if (alunos.length == 0) {
        document.getElementById('alert').innerHTML = '<div class="alert alert-danger alert-dismissible">'
            + '<strong>Não Encontrado!</strong> Este nome não Refere-se a um Aluno Cadastrado.'
            + '</div>'
    } else {
        document.getElementById('list-aluno').innerHTML = "";
        atualizandoLista();
        paginacaoDaLista(recebe.totalPages);

    }
}


function guardarIdDoRegistroPagamentoNoLocalStorage(posicao) {
    localStorage.setItem('registroId', alunos[posicao].registrosDePagamentos[0].id);
    localStorage.setItem('alunoNome', alunos[posicao].nome);
    console.log('re' + localStorage.getItem('registroId'));
    document.location = "situacao-pagamento.html"
}

function formatar(num) {
    var resultado = num.substr(0, 0) + "(" + num.substr(0);
    resultado = resultado.substr(0, 3) + ")" + resultado.substr(3);
    resultado = resultado.substr(0, 4) + " " + resultado.substr(4);
    resultado = resultado.substr(0, 10) + "-" + resultado.substr(10);

    return resultado;
}

tabela(0);
