http = new XMLHttpRequest();
let aluno;
$('#botao-finalizar').click(atualizarDados);
$('#botao-cancelar').click(voltarAPaginaPrincipal);

function voltarAPaginaPrincipal(event) {
    event.preventDefault();
    document.location = "lista-de-alunos.html"
}

function buscarAlunoPorId() {
    let id = localStorage.getItem('idAluno');
    http.open('GET', 'http://localhost:8081/aluno/' + id);
    http.onload = function () {
        if (this.status == 200) {
            aluno = JSON.parse(this.responseText);
            console.log(aluno.nome);
            carregarDadosDoAluno(aluno);
            verificarMatricula(aluno.matricula);
        }
    }

    http.onerro = () => alert('ERRO');
    http.send();
}

function carregarDadosDoAluno(aluno) {
    console.log(aluno);
    $('#nome').val(aluno.nome);
    $('#dataNascimento').val(aluno.dataDeNascimento);
    $('#dataDeMatricula').val(aluno.dataDeMatricula);
    $('#sexo').val(aluno.sexo);
    $('#cpf').val(aluno.cpf);
    $('#celular').val(aluno.numeroCelular);
    $('#celular-emergencia').val(aluno.numeroCelularEmergencia);
    $('#valorMensalidade').val(aluno.mensalidade);
    $('#numero').val(aluno.endereco.numero);
    $('#cep').val(aluno.endereco.cep);
    $('#cidade').val(aluno.endereco.cidade);
    $('#bairro').val(aluno.endereco.bairro);
    $('#uf').val(aluno.endereco.uf);
    $('#rua').val(aluno.endereco.rua);
    $('#email').val(aluno.email);
    $('#dataMatricula').val(aluno.dataDeMatricula);
    $('#diaDoPagamento').val(aluno.diaDoPagamento);
}

function verificarMatricula(matricula){
    if(matriculaENull(matricula)){
        gerarMatricula();
    }
}

function matriculaENull(matricula){
    if(matricula === null){
        return true;
    }
}

function gerarMatricula(){
    let letra = aluno.nome.slice(0,1);
    let numero = aluno.numeroCelular.slice(7,11);
    aluno.matricula = letra + numero;
    alert(aluno.matricula);
}

function atualizarDados() {
    http.open('PUT', 'http://localhost:8081/aluno/' + aluno.id);
    http.setRequestHeader('Content-Type', 'application/json', true);

    http.onload = function () {
        if (this.status == 200) {
            alert('Atualizado com Sucesso!');
            document.location = "lista-de-alunos.html"
        }
    }

    let numCelular = trim($('#celular').val());
    let numCelEmergencia = trim($('#celular-emergencia').val());

    let registros = aluno.registrosDePagamentos[0];
    console.log(registros);
    let novo = {
        nome: $('#nome').val().toUpperCase(),
        dataDeNascimento: $('#dataNascimento').val(),
        dataDeMatricula:$('#dataDeMatricula').val(),
        sexo: $('#sexo').val(),
        cpf: $('#cpf').val(),
        numeroCelular: numCelular,
        matricula:aluno.matricula,
        numeroCelularEmergencia: numCelEmergencia,
        mensalidade: $('#valorMensalidade').val(),
        diaDoPagamento: $('#diaDoPagamento').val(),
        endereco: {
            cep: $('#cep').val(),
            numero: $('#numero').val(),
            cidade: $('#cidade').val().toLowerCase(),
            bairro: $('#bairro').val().toLowerCase(),
            uf: $('#uf').val().toLowerCase(),
            rua: $('#rua').val().toLowerCase()
        },
        registrosDePagamentos: [registros],
        email: $('#email').val().toLowerCase(),
        dataMatricula: $('#dataMatricula').val(),
    };

    http.onerro = () => alert('ERRO');
    http.send(JSON.stringify(novo));

}

function trim(vlr) {
    var resultado = vlr.replace(/ /g, "");
    resultado = resultado.replace('(', '');
    resultado = resultado.replace(')', '');
    resultado = resultado.replace('-', '');
    return resultado;
}

buscarAlunoPorId();