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

        let numCelular = trim($('#celular').val());
        let numCelEmergencia = trim($('#celular-emergencia').val());
        let matriculaGerada = gerarMatricula();
        let diaDoPagamentoValidado = validarDiaDoPagamento($('#diaDoPagamento').val());
        
        let novo = {
            nome: $('#nome').val().toUpperCase(),
            dataDeNascimento: $('#dataNascimento').val(),
            dataDeMatricula:$('#dataDeMatricula').val(),
            sexo: $('#sexo').val(),
            cpf: $('#cpf').val(),
            numeroCelular: numCelular,
            numeroCelularEmergencia: numCelEmergencia,
            mensalidade: $('#valorMensalidade').val(),
            matricula:matriculaGerada,
            endereco: {
                cep: $('#cep').val(),
                numero: $('#numero').val(),
                cidade: $('#cidade').val().toLowerCase(),
                bairro: $('#bairro').val().toLowerCase(),
                uf: $('#uf').val().toLowerCase(),
                rua: $('#rua').val().toLowerCase()
            },
            registrosDePagamentos: [
                {
                    descricaoDoregistro: 'mensalidade'
                }
            ],
            email: $('#email').val().toLowerCase(),
            diaDoPagamento: diaDoPagamentoValidado,
            mensalidade: $('#valorMensalidade').val(),
        };

        xhr.onerro = () => alert('ERRO');
        xhr.send(JSON.stringify(novo));

    }

});

function validarDiaDoPagamento(diaDoPagamento){
   if( diaDoPagamento <= 9){
        return '0'+diaDoPagamento;    
   }else if(diaDoPagamento > 31){
        return 15;
   }

   
   return diaDoPagamento;
}

function gerarMatricula(){
    let matricula = letraDaMatricula();
        matricula += numeroDaMatricula();
        alert(matricula);
        return matricula;
}

function letraDaMatricula(){
    let nome = $('#nome').val().toUpperCase();
    return nome.slice(0,1);
}

function numeroDaMatricula(){
    let numero = trim($('#celular').val());
        numero  =  numero.slice(7,11);   
        return numero;
}

function trim(vlr) {
    var resultado = vlr.replace(/ /g, "");
    resultado = resultado.replace('(', '');
    resultado = resultado.replace(')', '');
    resultado = resultado.replace('-', '');
    return resultado;
}

$('#botao-cancelar').click(function () {
    var r = confirm("Tem certeza que deseja cancelar o cadastro?");
    if (r == true) {
        location.href = '../pages/principal.html';
    }
});