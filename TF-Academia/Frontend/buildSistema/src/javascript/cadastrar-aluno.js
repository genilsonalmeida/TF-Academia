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

        console.log($('#celular').val());

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
            registrosDePagamentos:[
                {
                    descricaoDoregistro:'mensalidade'
                }
            ],
            email: $('#email').val(),
            diaDoPagamento: $('#diaDoPagamento').val(),
            mensalidade: $('#valorMensalidade').val(),
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