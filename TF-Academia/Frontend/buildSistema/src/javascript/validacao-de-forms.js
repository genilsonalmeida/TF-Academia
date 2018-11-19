/// reponsavel pela validacão 
$(document).ready(function () {

    $('#cpf').mask('000.000.000-00');
    $('#cep').mask('00.000-000');
    $('#numero').mask('0000');
    $('#valorMensalidade').mask('000,00',{reverse:true});
    $('#celular').mask('(00) 00000-0000');
    $('#residencial').mask('(00) 0000-0000');
    $('#dataMatricula').val('00/00/0000 00-:-00');
     
});
// fim da validação
