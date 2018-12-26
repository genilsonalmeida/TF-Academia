http = new XMLHttpRequest();
let instrutor;
$('#botao-finalizar').click(atualizarDados);
$('#botao-cancelar').click(voltarAPaginaPrincipal);

function voltarAPaginaPrincipal(event){
    event.preventDefault();
    document.location = "lista-de-instrutores.html"
}


function buscarInstrutorPorId(){
    let id = localStorage.getItem('idInstrutor');
    http.open('GET','http://localhost:8081/instrutor/'+ id);
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

function carregarDadosDoAluno(instrutor){
    console.log(instrutor);
    $('#nome').val(instrutor.nome);
    $('#dataNascimento').val(instrutor.dataDeNascimento);
    $('#sexo').val(instrutor.sexo);
    $('#cpf').val(instrutor.cpf);
    $('#celular').val(instrutor.numeroCelular);
    $('#celular-emergencia').val(instrutor.numeroCelularEmergencia);
    $('#valorMensalidade').val(instrutor.mensalidade);
    $('#numero').val(instrutor.endereco.numero);
    $('#cep').val(instrutor.endereco.cep);
    $('#cidade').val(instrutor.endereco.cidade);
    $('#bairro').val(instrutor.endereco.bairro);
    $('#uf').val(instrutor.endereco.uf);
    $('#email').val(instrutor.email);
    $('#dataMatricula').val(instrutor.dataMatricula);
    /*
   */
}

function atualizarDados(){
    http.open('PUT', 'http://localhost:8081/instrutor/'+ instrutor.id);
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
        endereco: {
            cep: $('#cep').val(),
            numero: $('#numero').val(),
            cidade: $('#cidade').val(),
            bairro: $('#bairro').val(),
            uf: $('#uf').val()
            },
        email: $('#email').val(),
    };

    http.onerro = () => alert('ERRO');
    http.send(JSON.stringify(novo));
    
}
buscarInstrutorPorId();