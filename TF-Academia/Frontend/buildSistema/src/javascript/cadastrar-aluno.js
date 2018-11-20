$(document).ready(function () {

    $('#botao-finalizar').click(save);

    function save(event) {
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8081/aluno');

        xhr.setRequestHeader('Content-Type', 'application/json', true);

        let novo = {
            nome: $('#nome').val(),
            dataNascimento: $('#dataNascimento').val(),
            sexo: $('#sexo').val(),
            cpf: $('#cpf').val(),
            cep: $('#cep').val(),
            endereco: $('#endereco').val(),
            numero: $('#numero').val(),
            cidade: $('#cidade').val(),
            bairro: $('#bairro').val(),
            uf: $('#uf').val(),
            email: $('#email').val(),
            dataMatricula: $('#dataMatricula').val(),
            valorMensalidade: $('#valorMensalidade').val(),
            celular: $('#celular').val(),
            residencial: $('#residencial').val(),

        };
        
        xhr.onerro = () => alert('ERRO');
        xhr.send(JSON.stringify(novo));
        
    }



});