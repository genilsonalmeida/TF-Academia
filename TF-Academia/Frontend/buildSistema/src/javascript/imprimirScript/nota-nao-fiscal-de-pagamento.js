let notaEmTexto = "";
let numeroDoWats = 0;

function imprimir() {
    window.print();
}

function voltar() {
    document.location = "../lista-alunos-debito.html";
}

function criarNotaDePagamento() {
    document.getElementById('nome').innerHTML += localStorage.getItem('aluno-nome');
    document.getElementById('mensalidade').innerHTML += localStorage.getItem('aluno-mensalidade');
    document.getElementById('diaPagamento').innerHTML += localStorage.getItem('aluno-diaPagamento') + " " + localStorage.getItem('data-vencimento');
    document.getElementById('descricao').innerHTML += localStorage.getItem('descricao');
    document.getElementById('pagamento').innerHTML += localStorage.getItem('valor-do-pagamento');
    document.getElementById('troco').innerHTML += localStorage.getItem('troco');
    console.log(localStorage.getItem('aluno-telefone'));
}

function enviarNotaPeloWatszap() {
    editarNotaEmTexto();
    pegarNumeroDoAluno();

    let a = document.querySelector('#link');
    let https = `https://wa.me/55${numeroDoWats}?text=${notaEmTexto}`;
    a.href = https;
    a.target = '_blank';
}

function editarNotaEmTexto() {

    notaEmTexto += `Aluno: ${localStorage.getItem('aluno-nome')} *** Mensalidade: ${localStorage.getItem('aluno-mensalidade')} *** Pagamento:${localStorage.getItem('valor-do-pagamento')} *** Troco: ${localStorage.getItem('troco')} *** ${localStorage.getItem('descricao')}!!`;
}

function pegarNumeroDoAluno() {

    numeroDoWats = localStorage.getItem('aluno-telefone');

}

var data = new Date();

var dia = data.getDate(); // 1-31
var mes = data.getMonth(); // 0-11 (zero=janeiro)
var ano4 = data.getFullYear(); // 4 dígitos
var hora = data.getHours(); // 0-23
var min = data.getMinutes(); // 0-59
var seg = data.getSeconds(); // 0-59

// Formata a data e a hora (note o mês + 1)
var str_data = dia + '/' + (mes + 1) + '/' + ano4;
var str_hora = hora + ':' + min + ':' + seg;

Document.querySelector('#dtHora').textContent = str_data;


criarNotaDePagamento();