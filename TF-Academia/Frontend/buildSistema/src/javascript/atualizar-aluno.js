http = new XMLHttpRequest();
let aluno;
$('#botao-finalizar').click(atualizarDados);
$('#botao-cancelar').click(voltarAPaginaPrincipal);

function voltarAPaginaPrincipal(event){
    event.preventDefault();
    document.location = "lista-de-alunos.html"
}

function buscarAlunoPorId(){
    let id = localStorage.getItem('idAluno');
    http.open('GET','http://localhost:8081/aluno/'+ id);
    http.onload = function(){
        if(this.status == 200){
           instrutor = JSON.parse(this.responseText);
           console.log(instrutor.nome);
           carregarDadosDoAluno(instrutor);
        }
    }
    
    http.onerro = () => alert('ERRO');
    http.send();
}

function carregarDadosDoAluno(aluno){
    console.log(aluno);
    $('#nome').val(aluno.nome);
    $('#dataNascimento').val(aluno.dataDeNascimento);
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
    $('#email').val(aluno.email);
    $('#dataMatricula').val(aluno.dataDeMatricula);
    /*
   */
}

function atualizarDados(){
    http.open('PUT', 'http://localhost:8081/aluno/'+ instrutor.id);
    http.setRequestHeader('Content-Type', 'application/json', true);
    
    http.onload = function(){
        if(this.status == 200){
            alert('ok');
        }
    }


    let novo = {
        nome: $('#nome').val(),
        dataDeNascimento: $('#dataNascimento').val(),
        sexo: $('#sexo').val(),
        cpf: $('#cpf').val(),
        numeroCelular:$('#celular').val(),
        numeroCelularEmergencia:$('#celular-emergencia').val(),
        mensalidade:$('#valorMensalidade').val(),
        endereco: {
            cep: $('#cep').val(),
            numero: $('#numero').val(),
            cidade: $('#cidade').val(),
            bairro: $('#bairro').val(),
            uf: $('#uf').val()
            },
        email: $('#email').val(),
        dataMatricula: $('#dataMatricula').val(),
    };

    http.onerro = () => alert('ERRO');
    http.send(JSON.stringify(novo));
    
}
buscarAlunoPorId();