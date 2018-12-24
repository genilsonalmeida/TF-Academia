let http = new XMLHttpRequest();

$('#botao-cancelar').click(function(){
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
esconderDivForm();
