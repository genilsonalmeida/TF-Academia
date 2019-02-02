




$('#botao-cancelar').click(function () {
    var r = confirm("Tem certeza que deseja cancelar o cadastro?");
    if (r == true) {
        location.href = '../pages/principal.html';
    }
});

$('#botao-finalizar').click(function (event) {
    event.preventDefault();

    save(event);
   
});

function exibirAlertsDeconfirmação(){
    alert('Instrutor Cadastrado com sucesso!');
    var r = confirm("Deseja cadastrar um novo instrutor?");
    if (r == true) {
        location.href = '../pages/cadastrar-instrutor.html';
    } else {
        location.href = '../pages/principal.html';
    }
}

function save(event) {
    

    event.preventDefault();


    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8081/instrutor');

    xhr.setRequestHeader('Content-Type', 'application/json', true);
    xhr.onload = function () {
        if (this.status == 200) {
            console.log('ok');
            exibirAlertsDeconfirmação();
        }
        else if (this.status === 400){
            let  erro = JSON.parse(this.responseText);
            let messagem = "";
            console.log(erro);
            
          for(let i = 0; i < erro.errors.length; i++){
              messagem  += erro.errors[i].defaultMessage + ", ";
          }
          document.getElementById('alert').innerHTML = '<div class="alert alert-danger alert-dismissible"><strong>Não Encontrado!</strong> '+messagem+' </div>';         
          }else if(this.status === 500){
              document.getElementById('alert').innerHTML = '<div class="alert alert-danger alert-dismissible"><strong>Alerta!</strong> Email ou Cpf ou número de celular já existe </div>';         
          }
    }

    let numCelular = trim($('#celular').val());
    let numCelEmergencia = trim($('#celular-emergencia').val());

    var novo = {
        nome: $('#nome').val().toUpperCase(),
        email: $('#email').val(),
        dataDeNascimento: $('#dataNascimento').val(),
        sexo: $('#sexo').val(),
        cpf: $('#cpf').val(),
        endereco: {
            cep: $('#cep').val(),
            numero: $('#numero').val(),
            cidade: $('#cidade').val().toLowerCase(),
            bairro: $('#bairro').val().toLowerCase(),
            uf: $('#uf').val().toLowerCase(),
            rua: $('#rua').val().toLowerCase()
        },
        numeroCelular: numCelular,
        numeroCelularEmergencia: numCelEmergencia,
    };
    
    xhr.onerro = () => alert('ERRO');
    xhr.send(JSON.stringify(novo));
}

function trim(vlr) {
    var resultado = vlr.replace(/ /g, "");
    resultado = resultado.replace('(', '');
    resultado = resultado.replace(')', '');
    resultado = resultado.replace('-', '');
    return resultado;
}