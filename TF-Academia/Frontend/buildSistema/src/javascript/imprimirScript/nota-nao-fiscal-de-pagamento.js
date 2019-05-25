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

}
criarNotaDePagamento();
imprimir();