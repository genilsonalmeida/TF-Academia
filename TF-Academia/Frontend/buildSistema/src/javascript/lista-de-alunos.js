

jQuery(window).load(function () {
    $(".loader").delay(500).fadeOut("slow"); //retire o delay quando for copiar!
    $("#tudo_page").toggle("fast");
    buscarAlunos(0);
});

let recebe;
let paginaAtual = 0;
let proximaLista = 1;
let alunos = [];
let valor;
let alunoRequest;
let resultado = [];
let criar = document.createElement.bind(document);

$('#botao-voltar').click(function () {
    location.href = '../pages/principal.html';
});

$('#bntProximaPage').click(function () {
    paginacaoDaLista(resultado.totalPages);
});

$('#button-recarregar').click(function () {
    limparTabela(); 
    buscarAlunos(0);
});


function carregarTabelaDeAlunos(alunosContainer){
      resultado = alunosContainer;
      console.log(resultado);
      validarResultadoDaBusca();
      executarProcessosParaExibirAluno();
}

function validarResultadoDaBusca(){
    if(resultado.totalElements === 0){
        exibirMenssagenDeAlunoNaoEncontrado();
    }else{fecharAlertaDeAlunoNaoEncontrado();}
}

function executarProcessosParaExibirAluno(){
    adicionarAlunosNaLista(resultado.content);
}

function adicionarAlunosNaLista(novosAlunos) {
    novosAlunos.forEach(aluno => {
        alunos.push(aluno);
        console.log(aluno.nome);
    });
    montarTabela(novosAlunos); 
}


function adicionarAlunosATabela(alunosParaTabela,posicaoNoContainer) {
        atualizandoLista(alunosParaTabela, posicaoNoContainer);
}

function pegarInformacaoDoAlunoParaTabela(aluno){
    let alunoInfo = [];
    alunoInfo.push(aluno.matricula);
    alunoInfo.push(aluno.nome);
    alunoInfo.push(formatar(aluno.numeroCelular));
    
    return alunoInfo;
}

function montarTabela(alunosContainer) {//refatorar
    let tbody = document.querySelector('table tbody');
    alunosContainer.forEach(aluno => {
        let colunas = pegarInformacaoDoAlunoParaTabela(aluno);
        let tr = criar('tr');
        colunas.forEach(coluna => { 
            let td = criar('td');    
            td.textContent = coluna;
            td.style.fontWeight = "700";
            tr.appendChild(td);
        });
        
        let tdPagamentos = montarColunaDePagamentos(aluno);
        let tdInformacao = montarColunaInformacao(aluno);
        let tdEditar = montaColunaParaEditar(aluno);
        let tdDeletar = monatarColunaDeletar(aluno);
        tr.appendChild(tdPagamentos);
        tr.appendChild(tdInformacao);
        tr.appendChild(tdEditar);
        tr.appendChild(tdDeletar);
        console.log(tr);
        tbody.appendChild(tr);
    });
}

function montarColunaDePagamentos(aluno){
   let tdPagamentos = document.createElement('td');
   let src = "../../assets/icones/icon-pagamento.png";
   tdPagamentos.onclick = function(){
        let dados = {
            registroId : aluno.registrosDePagamentos[0].id,
            alunoNome : aluno.nome,
            alunoDataMatricula : aluno.dataDeMatricula    
        };
          guardarIdDoRegistroPagamentoNoLocalStorage(dados);
   }
        tdPagamentos = adcionarStiloDaColuna(tdPagamentos);
        tdPagamentos.appendChild(adicionarIconeDaColuna(src)); 
    return tdPagamentos;
}

function montarColunaInformacao(aluno){
     let tdInformacao = document.createElement('td');
    let src = "../../assets/icones/info.svg";
     tdInformacao.onclick = function(){
        carregarInfoAluno(aluno);
     }
     tdInformacao = adcionarStiloDaColuna(tdInformacao);
     tdInformacao.appendChild(adicionarIconeDaColuna(src));
     return tdInformacao;
}

function montaColunaParaEditar(aluno){
     let tdEditar = criar('td');
     let src = "../../assets/icones/baseline-border_color-24px.svg";
     tdEditar.onclick = function(){
        editarAluno(aluno.id);
     }
     tdEditar = adcionarStiloDaColuna(tdEditar);
     tdEditar.appendChild(adicionarIconeDaColuna(src));
     return tdEditar;
}

function monatarColunaDeletar(aluno){
    let tdDeletar = criar('td');
    let src = "../../assets/icones/baseline-delete-24px.svg";
    tdDeletar.onclick = function(){
        removerAluno(aluno.id);
    }
    tdDeletar = adcionarStiloDaColuna(tdDeletar);
    tdDeletar.appendChild(adicionarIconeDaColuna(src));
    return tdDeletar;
}

function guardarIdDoRegistroPagamentoNoLocalStorage(dadosDoAluno) {
    localStorage.setItem('registroId', dadosDoAluno.registroId);//alunos[posicao].registrosDePagamentos[0].id
    localStorage.setItem('alunoNome', dadosDoAluno.alunoNome);//alunos[posicao].nome
    localStorage.setItem('alunoDataMatricula', dadosDoAluno.alunoDataMatricula);//alunos[posicao].nome
    
    console.log('re' + localStorage.getItem('registroId'));
    document.location = "situacao-pagamento.html"
}

function adcionarStiloDaColuna(td){
    td.onmousemove = function(){
        mudarCorDaColunaQuandoMousePassar(td);
    }
    td.onmouseout = function(){
        mudarCorDaColunaQuandoMouseSair(td);
    }
   return td; 
}

function mudarCorDaColunaQuandoMousePassar(x) {
    x.style.backgroundColor = "lightblue";
}

function mudarCorDaColunaQuandoMouseSair(x) {
    x.style.backgroundColor = "white";
}

function adicionarIconeDaColuna(src){
    let img = document.createElement('img');
    img.src = src;
    return img;
}

function paginacaoDaLista(qntDePaginas) {
    selecionandoListaExibida(qntDePaginas);
}

function selecionandoListaExibida(pages) {
    irParaProxmalista(pages);
}

function irParaProxmalista(pagTotal) {
        console.log('função selecionarid')
        if (proximaLista < pagTotal) {
            buscarAlunos(proximaLista++);
            console.log(proximaLista)
        } else { alert('Fim da Lista') }
}



function editarAluno(id) {
    localStorage.setItem('idAluno', id);
    document.location = "atualizar-aluno.html"
}

function removerAluno(id) {

    var r = confirm("Tem certeza que deseja excluir o aluno?");
    if (r == true) {
        let http = new XMLHttpRequest(); 
        http.open('DELETE', 'http://localhost:8081/aluno/' + id);
        http.setRequestHeader('Content-Type', 'application/json', true);
        http.onload = function () {
            if (this.status == 200) {
                recarregarPaginaListaDeAlunos();
            }
        }

        http.onerro = () => alert('ERRO');
        http.send();
    }

}

function recarregarPaginaListaDeAlunos(){
    document.location = "lista-de-alunos.html";
}

function carregarInfoAluno(aluno) {
    retornarIconereferenteASexoDoInstrutor(aluno.sexo);
    console.log(aluno.dataNascimento);
    let div = document.querySelector('#info-aluno');
    div.innerHTML = "";
    div.innerHTML += '<div class="media" >';
    div.innerHTML += '<img src="../../assets/icones/' + caminhoDaImagem + '" class="align-self-start mr-3" style="width:60px">';
    div.innerHTML += '<div class="media-body">';
    div.innerHTML += '<h4>' + aluno.nome.toUpperCase() + '</h4>';
    let numFormatado = formatar(aluno.numeroCelular);
    let numEmFormatado = formatar(aluno.numeroCelular);
    div.innerHTML += '<p>Número: ' + numFormatado + '</p>';
    div.innerHTML += '<p>Número de Emergência: ' + numEmFormatado + '</p>';
    div.innerHTML += '<p>Email: ' + aluno.email + ' </p>';
    div.innerHTML += '<p>CPF: ' + aluno.cpf + '</p>';
    div.innerHTML += '<p>Data de nasciemto: ' + aluno.dataDeNascimento + ' </p>';
    div.innerHTML += '<p>Endereço: ' + aluno.endereco.cidade + '</p>';
    div.innerHTML += '<p>Bairro: ' + aluno.endereco.bairro + '</p>';
    div.innerHTML += '<p>Rua ou Av e Número da residêcia: ' + aluno.endereco.rua + ' Num:' + aluno.endereco.numero + '</p>';
    div.innerHTML += '<p>CEP: ' + aluno.endereco.cep + '</p>';
    div.innerHTML += '<button onclick="fecharinfo()" type="button"  style="margin-bottom:1.2%; " class="btn btn-danger">Voltar</button></div></div> ';

    $('#tabelaContaner').css('visibility', 'hidden');
    window.scrollTo(0, 10);
}

function retornarIconereferenteASexoDoInstrutor(sexo) {

    if (sexo === "MASCULINO") {
        caminhoDaImagem = "man-icon.png";
    } else if(sexo === "FEMININO") {
        caminhoDaImagem = "wam-icon.png"
    }
}


function fecharinfo() {
    document.getElementById('info-aluno').innerHTML = "";
    $('#tabelaContaner').css('visibility', 'visible');
}


function limparTabela(){
    let tbody = document.querySelector('table tbody');
    tbody.textContent = "";
}



