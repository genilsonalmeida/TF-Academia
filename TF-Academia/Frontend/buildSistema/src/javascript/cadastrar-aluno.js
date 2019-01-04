$(document).ready(function () {

    $('#botao-finalizar').click(save);


    function save(event) {
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8081/aluno');

        xhr.setRequestHeader('Content-Type', 'application/json', true);

        xhr.onload = function () {
            if (this.status === 200) {
                alert('Usuário Cadastrado com sucesso!');
                var r = confirm("Deseja cadastrar um novo usuário?");
                if (r == true) {
                    location.href = '../pages/cadastrar-aluno.html';
                } else {
                    location.href = '../pages/principal.html';
                }
            }else if (this.status == 400){
              let  erro = JSON.parse(this.responseText);
              let messagem = "";
              console.log(erro);
              
            for(let i = 0; i < erro.errors.length; i++){
                messagem  += erro.errors[i].defaultMessage + ", ";
            }
            document.getElementById('alert').innerHTML = '<div class="alert alert-danger alert-dismissible"><strong>Não Encontrado!</strong> '+messagem+' </div>';         
            }else if(this.status == 500){
                document.getElementById('alert').innerHTML = '<div class="alert alert-danger alert-dismissible"><strong>Alerta!</strong> Email ou Cpf ou número de celular já existe </div>';         
            }
        }

        console.log($('#celular').val());

        let novo = {
            nome: $('#nome').val(),
            dataDeNascimento: $('#dataNascimento').val(),
            sexo: $('#sexo').val(),
            cpf: $('#cpf').val(),
            numeroCelular: $('#celular').val(),
            numeroCelularEmergencia: $('#celular-emergencia').val(),
            mensalidade: $('#valorMensalidade').val(),
            endereco: {
                cep: $('#cep').val(),
                numero: $('#numero').val(),
                cidade: $('#cidade').val(),
                bairro: $('#bairro').val(),
                uf: $('#uf').val(),
                rua: $('#rua').val()
            },
            registrosDePagamentos: [
                {
                    descricaoDoregistro: 'mensalidade'
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

$('#botao-cancelar').click(function () {
    var r = confirm("Tem certeza que deseja cancelar o cadastro?");
    if (r == true) {
        location.href = '../pages/principal.html';
    }
});