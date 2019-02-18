let http = new XMLHttpRequest();
//validar form cpf
let  data = new Date;
let recebeDataAtual;
let recebe;
let alunoMatricula = '';
$('#botao-cancelar').click(function(){
    var r = confirm("Tem certeza que deseja sair da tela de pagamento??");
    if (r == true) {
        location.href = '../pages/principal.html';
    }
});



function verificarmatricula(matricula){
    if(!(matriculaENula(matricula) && matriculaEVasia(matricula))){
       alunoMatricula = matricula;
       buscarAlunoPorMatricula();
    }
}

function matriculaENula(matricula){
    if(matricula === null){ return true;}
}
function matriculaEVasia(matricula){
    if(matricula === ''){ return true;}
}

function mandarValorDoElemento(){
    let matricula = document.getElementById('matricula-busca').value;
    verificarmatricula(matricula);
}

function madarValorDaMatriculaLocalStorag(){
    let matricula = localStorage.getItem('alunoMatricula');
    verificarmatricula(matricula);
}

function buscarAlunoPorMatricula(){
    http.open('GET','http://localhost:8081/aluno/buscarMatricula/'+ alunoMatricula.toUpperCase());
    http.onload = function (){
        if(this.status === 200){
            if(!validarrespostaJson(this.responseText)){
                recebe = JSON.parse(this.responseText);
                console.log(recebe);
                esconderDivBusca();
                exibirDivForm();
                carregarDadosDoAluno(recebe);
                limparValores();       
            }    
        }
    }
    
    http.onerro = () => alert('ERRO');
    http.send();
}

function limparValores(){
    alunoMatricula = '';
    localStorage.setItem("alunoMatricula",'');
}

function validarrespostaJson(validar){ 
    if(validar === ""){
        alert('Matricula não existe');
        return true;
    }
     return false;
}

function esconderDivBusca(){
    let div = document.getElementById('buscar-container');
	div.style.display = "none";
	div.style.visibility = "hidden";
}

function esconderDivForm(){
    let div = document.getElementById('card-pagamento');
	div.style.display = "none";
	div.style.visibility = "hidden";
}

function exibirDivForm(){
    let div = document.getElementById('card-pagamento');
	div.style.display = "block";
	div.style.visibility = "visible";
}

function carregarDadosDoAluno(aluno){
   let nome = document.getElementById('nome-cliente');
   let cpf = document.getElementById('cpf');
   let vencimento = document.getElementById('data-vencimento');
   let dataPagamento = document.getElementById('data-pagamento');
   let valor = document.getElementById('valor');
   nome.value = aluno.nome.toUpperCase();
   valor.value = aluno.mensalidade;
   cpf.value = aluno.cpf;
   vencimento.value = aluno.diaDoPagamento;
   dataPagamento.value = recebeDataAtual;
  
}


function formatandoData(){
  
  let  dayName = new Array ("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado");
  let  monName = new Array ("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "julho", "agosto","setembro", "outubro", "novembro", "dezembro");
  let descricao = dayName[data.getDay()] + ", " + data.getDate() + " de " + monName[data.getMonth()]  +  " de "  +     data.getFullYear () + "\npagamento da mensalidade realizado com sucesso";
  recebeDataAtual = dayName[data.getDay()] + ", " + data.getDate() + " de " + monName[data.getMonth()]  +  " de "  +     data.getFullYear (); 
  console.log(descricao); 
  return descricao;
}

function savePagamento(){
    let idRegistroPag = recebe.registrosDePagamentos[0].id;
    console.log(idRegistroPag);
    http.open('POST','http://localhost:8081/registroPagamento/'+idRegistroPag+'/addPagamento');
    http.setRequestHeader('Content-Type', 'application/json', true);
    http.onload = function (){
        if(this.status == 200){
           let recebe = JSON.parse(this.responseText);
           alert(formatandoData());
           document.location = "lista-de-alunos.html";
           console.log(recebe);   
         }else{
            alert("Pagamento não cadastrado");
         }
    }

    let pagamento = {
        "valor":recebe.mensalidade,
        "descricaoDoPagamento":formatandoData()
    };
    
    http.onerro = () => alert('ERRO');
   http.send(JSON.stringify(pagamento));
}

formatandoData();
esconderDivForm();
madarValorDaMatriculaLocalStorag();
