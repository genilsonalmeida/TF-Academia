let http = new XMLHttpRequest();
//validar form cpf



$('#botao-cancelar').click(function(){
    var r = confirm("Tem certeza que deseja sair da tela de pagamento??");
    if (r == true) {
        location.href = '../pages/principal.html';
    }
});

$('#btn-cancelar').click(function(){
    var r = confirm("Tem certeza que deseja sair da tela de pagamento??");
    if (r == true) {
        location.href = '../pages/principal.html';
    }
});

function buscarAlunoPorCpf(){
    let cpf = document.getElementById('cpf-busca').value;
    http.open('GET','http://localhost:8081/aluno/buscarCpf/'+ cpf);
    http.onload = function (){
        if(this.status == 200){
           let recebe = JSON.parse(this.responseText);
            console.log(recebe);
            esconderDivBusca();
            exibirDivForm();
            carregarDadosDoAluno(recebe);
        }
    }
    
    http.onerro = () => alert('ERRO');
    http.send();
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
   let vencimento = document.getElementById('nome-cliente');
   let dataPagamento = document.getElementById('data-pagamento');
   nome.value = aluno.nome;
   cpf.value = aluno.cpf;
}


function formatandoData(){
  let  now = new Date;
  let  dayName = new Array ("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado");
  let  monName = new Array ("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "julho", "agosto","setembro", "outubro", "novembro", "dezembro");
  let dataPagamento = dayName[now.getDay()] + ", " + now.getDate() + " de " + monName[now.getMonth()]  +  " de "  +     now.getFullYear () + "\npagamento da mensalidade realizado com sucesso";
  console.log(dataPagamento); 
  return dataPagamento;
}
formatandoData();
esconderDivForm();
