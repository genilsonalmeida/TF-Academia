/// reponsavel pela validacão 
$(document).ready(function () {

    $('#cpf').mask('000.000.000-00');
    $('#cep').mask('00.000-000');
    $('#numero').mask('0000');
    $('#valorMensalidade').mask('000,00',{reverse:true});
    $('#celular').mask('(00) 00000-0000');
    $('#residencial').mask('(00) 0000-0000');
    let data = new Date();
    $('#dataMatricula').val(data.getDay()+'/'+data.getMonth()+'/'+data.getFullYear());
     
});
// fim da validação

function save(){
    let xhr = new XMLHttpRequest(); 
    xhr.open('POST','http://localhost:8081/aluno');

    xhr.setRequestHeader('Content-Type', 'application/json',true);
    
    
    
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let cpf = document.getElementById('CPF').value;
    let cep = document.getElementById('endereco').value;
    let novo = {
            "nome": `${nome}`,
            "email":`${email}`,
            "cpf":`${cpf}`,
            "cep":`${cep}`
          };
              
    xhr.onerro = () => alert('ERRO');
    xhr.send(JSON.stringify(novo));
  
   
   
}