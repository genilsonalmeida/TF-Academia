

jQuery(window).load(function () {
    $(".loader").delay(500).fadeOut("slow"); //retire o delay quando for copiar!
    $("#tudo_page").toggle("fast");
});

let recebe;
let paginaAtual;
let proximaLista = 1;

$('#botao-voltar').click(function () {
    location.href = '../pages/principal.html';
});

function tabela(numeroPagina) {
    

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8081/aluno/lista/' + numeroPagina);
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

let nome;
function letraMaiuscula(i) {
    str = recebe.content[i].nome;
    qtd = recebe.content[i].nome.length;
    prim = str.substring(0, 1);
    resto = str.substring(1, qtd);
    str = prim.toUpperCase() + resto;
    nome = str;

    return nome;
}

function atualizandoLista() {
    
    for (var i = 0; i < recebe.content.length; i++) {
        let tr = $('<tr>');
        let cols = '';
        cols += '<th scope="row">'+recebe.content[i].matricula+'</th>';
        var nome = letraMaiuscula(i);
        cols += '<th scope="row">' + nome + '</th>';
        cols += '<th scope="row">' + recebe.content[i].numeroCelular + '</th>';
        cols += '<th scope="row"  onmouseover="mudarCorDaColunaQuandoMousePassar(this)" onmouseout="mudarCorDaColunaQuandoMouseSair(this)" onClick="guardarIdDoRegistroPagamentoNoLocalStorage(' + i + ')"><img src="../../assets/icones/icon-pagamento.png"></th>';
        cols += '<th scope="row"  onmouseover="mudarCorDaColunaQuandoMousePassar(this)" onmouseout="mudarCorDaColunaQuandoMouseSair(this)" onClick="carregarInfoAluno(' + i + ')"><img src="../../assets/icones/info.svg"></th>'
        cols += '<th scope="row"  onmouseover="mudarCorDaColunaQuandoMousePassar(this)" onmouseout="mudarCorDaColunaQuandoMouseSair(this)" onClick="editarAluno(' + i + ')"><img src="../../assets/icones/baseline-border_color-24px.svg"></th>';
        cols += '<th scope="row"  onmouseover="mudarCorDaColunaQuandoMousePassar(this)" onmouseout="mudarCorDaColunaQuandoMouseSair(this)" onClick="removerAluno(' + i + ')"><img src="../../assets/icones/baseline-delete-24px.svg"></th>'
        tr.append(cols);
        $('tbody').append(tr);     
    }
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

function irParaProxmalista(pagTotal){
    document.getElementsByClassName('bnt-proxima-page')[0].onclick = function () {
        console.log('função selecionarid')
        if(proximaLista < pagTotal){
               tabela(proximaLista++);
               console.log(proximaLista)
            }else{alert('Fim da Lista')}
                          
    }
}



function editarAluno(id) {
    localStorage.setItem('idAluno', recebe.content[id].id);
    document.location = "atualizar-aluno.html"
}

function removerAluno(posicion) {

    var r = confirm("Tem certeza que deseja excluir o aluno?");
    if (r == true) {
        let http = new XMLHttpRequest();
        let id = recebe.content[posicion].id;
        http.open('DELETE', 'http://localhost:8081/aluno/' + id);
        http.setRequestHeader('Content-Type', 'application/json', true);
        http.onload = function () {
            if (this.status == 200) {
                document.getElementById("list-aluno").innerHTML = "";
                document.getElementById("pagination-conteudo").innerHTML = "";
                proximaLista = 0;
                tabela(0);

            }
        }

        http.onerro = () => alert('ERRO');
        http.send();
    }

}

function carregarInfoAluno(aluno) {
    retornarIconereferenteASexoDoInstrutor(aluno);
    console.log(recebe.content[aluno].dataNascimento);
    let div = document.getElementById('info-aluno');
    div.innerHTML = "";
    div.innerHTML += '<div class="media" >';
    div.innerHTML += '<img src="../../assets/icones/' + caminhoDaImagem + '" class="align-self-start mr-3" style="width:60px">';
    div.innerHTML += '<div class="media-body">';
    div.innerHTML += '<h4>' + recebe.content[aluno].nome.toUpperCase() + '</h4>';
    let numFormatado = formatar(recebe.content[aluno].numeroCelular);
    let numEmFormatado = formatar(recebe.content[aluno].numeroCelular);
    div.innerHTML += '<p>Número: ' + numFormatado + '</p>';
    div.innerHTML += '<p>Número de Emergência: ' + numEmFormatado + '</p>';
    div.innerHTML += '<p>Email: ' + recebe.content[aluno].email + ' </p>';
    div.innerHTML += '<p>CPF: ' + recebe.content[aluno].cpf + '</p>';
    div.innerHTML += '<p>Data de nasciemto: ' + recebe.content[aluno].dataDeNascimento + ' </p>';
    div.innerHTML += '<p>Endereço: ' + recebe.content[aluno].endereco.cidade + '</p>';
    div.innerHTML += '<p>Bairro: ' + recebe.content[aluno].endereco.bairro + '</p>';
    div.innerHTML += '<p>Rua ou Av e Número da residêcia: ' + recebe.content[aluno].endereco.rua + ' Num:' + recebe.content[aluno].endereco.numero +'</p>';
    div.innerHTML += '<p>CEP: ' + recebe.content[aluno].endereco.cep + '</p>';
    div.innerHTML += '<button onclick="fecharinfo()" type="button"  style="margin-bottom:1.2%; " class="btn btn-danger">Voltar</button></div></div> ';

    $('#divPrincipal').css('visibility', 'hidden');
}

function retornarIconereferenteASexoDoInstrutor(aluno) {

    if (recebe.content[aluno].sexo === "MASCULINO") {
        caminhoDaImagem = "man-icon.png";
    } else {
        caminhoDaImagem = "wam-icon.png"
    }
}


function fecharinfo() {
    document.getElementById('info-aluno').innerHTML = "";
    $('#divPrincipal').css('visibility', 'visible');
}



function buscarPorNomeNumeroCelular() {
    
    let valor = document.getElementById('buscaValor').value.toUpperCase();
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
                document.getElementById('list-aluno').innerHTML = "";    
                atualizandoLista();
                paginacaoDaLista(recebe.totalPages);

            }

        }
    };
    xhr.onerro = () => alert('ERRO');
    xhr.send();
}

function guardarIdDoRegistroPagamentoNoLocalStorage(posicao){
    localStorage.setItem('registroId',recebe.content[posicao].registrosDePagamentos[0].id);
    localStorage.setItem('alunoNome',recebe.content[posicao].nome);
    console.log('re'+localStorage.getItem('registroId'));
    document.location = "situacao-pagamento.html"
}

function formatar(num){
    var resultado = num.substr(0,0)+"("+num.substr(0);
    resultado = resultado.substr(0,3)+")"+resultado.substr(3);
    resultado = resultado.substr(0,4)+" "+resultado.substr(4);
    resultado = resultado.substr(0,10)+"-"+resultado.substr(10);

    return resultado;
}

tabela(0);
