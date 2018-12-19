$(document).ready(function () {

    $('#botao-finalizar').click(save);

    function save(event) {
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8081/aluno');

        xhr.setRequestHeader('Content-Type', 'application/json', true);
         
        xhr.onload = function(){
            if(this.status == 200){
                alert('ok');
            }
        }
        let novo = {
            nome: $('#nome').val(),
            dataNascimento: $('#dataNascimento').val(),
            sexo: $('#sexo').val(),
            cpf: $('#cpf').val(),
            endereco: {
                cep: $('#cep').val(),
                numero: $('#numero').val(),
                cidade: $('#cidade').val(),
                bairro: $('#bairro').val(),
                uf: $('#uf').val()
                },
            email: $('#email').val(),
            dataMatricula: $('#dataMatricula').val(),
            valorMensalidade: $('#valorMensalidade').val(),
    
        };
        
        xhr.onerro = () => alert('ERRO');
        xhr.send(JSON.stringify(novo));
        
    }

});

$('#botao-cancelar').click(function(){
    var r = confirm("Tem certeza que deseja cancelar o cadastro?");
    if (r == true) {
        location.href = '../pages/principal.html';
    }
});