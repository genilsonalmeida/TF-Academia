




$('#botao-cancelar').click(function () {
    var r = confirm("Tem certeza que deseja cancelar o cadastro?");
    if (r == true) {
        location.href = '../pages/principal.html';
    }
});

$('#botao-finalizar').click(function (event) {
    event.preventDefault();

    save(event);
    location.href = '../pages/principal.html';
});


function save(event) {
    var novo = {
        nome: $('#nome').val(),
        email: $('#email').val(),
        dataDeNascimento: $('#dataNascimento').val(),
        sexo: $('#sexo').val(),
        cpf: $('#cpf').val(),
        endereco: {
        cep: $('#cep').val(),
        numero: $('#numero').val(),
        cidade: $('#cidade').val(),
        bairro: $('#bairro').val(),
        uf: $('#uf').val()
        },
        numeroCelular: $('#celular').val(),
        numeroCelularEmergencia: $('#residencial').val(),
    };

    event.preventDefault();
    
   
    let xhr = new XMLHttpRequest();
    xhr.open('POST',  'http://localhost:8081/instrutor');

    xhr.setRequestHeader('Content-Type', 'application/json', true);
    xhr.onload = function() {
        if(this.status == 200){
            console.log('ok');
      } 
}
xhr.onerro = () => alert('ERRO');
xhr.send(JSON.stringify(novo));
}
