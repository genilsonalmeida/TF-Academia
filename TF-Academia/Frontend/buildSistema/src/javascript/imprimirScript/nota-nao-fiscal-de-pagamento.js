let notaEmTexto = "";
let numeroDoWats = 0;

function imprimir() {
   	window.print();  
}
function voltar(){
    document.location = "../lista-alunos-debito.html";
}

function criarNotaDePagamento(){
   document.getElementById('nome').innerHTML += localStorage.getItem('aluno-nome');
   document.getElementById('mensalidade').innerHTML += localStorage.getItem('aluno-mensalidade');
   document.getElementById('diaPagamento').innerHTML += localStorage.getItem('aluno-diaPagamento') + " " + localStorage.getItem('data-vencimento');
   document.getElementById('descricao').innerHTML += localStorage.getItem('descricao');
   document.getElementById('pagamento').innerHTML += localStorage.getItem('valor-do-pagamento');
   document.getElementById('troco').innerHTML += localStorage.getItem('troco');
   console.log(localStorage.getItem('aluno-telefone'));
}

function enviarNotaPeloWatszap(){
  editarNotaEmTexto();
  pegarNumeroDoAluno();

  let a = document.querySelector('#link');
  let https = `https://wa.me/55${numeroDoWats}?text=${notaEmTexto}`; 
  a.href = https;
  a.target = '_blank';
}

function editarNotaEmTexto(){

    notaEmTexto += `Aluno: ${localStorage.getItem('aluno-nome')} *** Mensalidade: ${localStorage.getItem('aluno-mensalidade')} *** Pagamento:${localStorage.getItem('valor-do-pagamento')} *** Troco: ${localStorage.getItem('troco')} *** ${localStorage.getItem('descricao')}!!`;
}

function pegarNumeroDoAluno(){

  numeroDoWats = localStorage.getItem('aluno-telefone');
  
}

criarNotaDePagamento();
