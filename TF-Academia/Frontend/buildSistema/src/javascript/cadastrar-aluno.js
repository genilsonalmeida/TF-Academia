
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