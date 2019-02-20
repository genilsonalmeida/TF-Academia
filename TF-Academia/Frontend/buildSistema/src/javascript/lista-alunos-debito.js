    jQuery(window).load(function () {
        $(".loader").delay(500).fadeOut("slow"); //retire o delay quando for copiar!
        $("#tudo_page").toggle("fast");
    });

let http = new XMLHttpRequest();
let data = new Date();
let diaParametro = '';
let corNaoPago = '(255,165,0)';
let corPago = '(0,255,127)';
let meses = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
$('#botao-voltar').click(function () {
    location.href = '../pages/principal.html';
});

function receberLista(){
    
    http.open('GET','http://localhost:8081/aluno/listaVencimento/'+diaParametro);
    
    http.onload = function() {
        if(this.status==200){
            let recebe = JSON.parse(this.responseText);
            console.log(recebe.content);
            verificarRecebimentoDosAlunos(recebe);
        }else{
            console.log("erro");
        }
    }
    
    http.onerror = () => console.log("erro");
    http.send();
}

function verificarRecebimentoDosAlunos(alunos){
if(alunos.content.length > 0){
    iniciarLista(alunos);
    buscarAlunosComDebito();
}
}

function iniciarLista(lista){
    listaDeAlunos = lista; 
}

function passarDiaAtualParaParametro(){
    diaParametro = retonarDiaAtaual();      
    if(validarDiaMenorQue10(diaParametro)){
        adicionar0AntesDoDia();
    }
}

function retonarDiaAtaual(){
    let hoje = data.getDate();
    console.log(hoje);
    return hoje; 
}

function validarDiaMenorQue10(dia){
    if(dia < 10){
        return true;
    }
}

function adicionar0AntesDoDia(){   
    diaParametro = '0'+diaParametro;
    console.log(diaParametro);
}

function buscarAlunosComDebito(){
    console.log("entrando no filter");
    let pos = 0;
     listaDeAlunos.content.forEach(element => {
        console.log("próximo"); 
        let mesCerto = element.registrosDePagamentos[0].pagamentos.filter(mes);
        
        if(mesCerto.length === 0){
             exibirAlunos(element.nome, "Em Falta", corNaoPago,
             element.diaDoPagamento,
             pos,
             element.numeroCelular,
             element.matricula)
        }
        else {
            console.log(mesCerto);
            console.log(mesCerto);
            exibirAlunos(element.nome, "pago", 
            corPago,
            element.diaDoPagamento,
            pos,
            element.numeroCelular,
            element.matricula)
        }
        pos++;
     });   
}

function mes(pagamento){
  return pagamento.dataDoPagamento.slice(0,7) === data.toJSON().slice(0,7);
}

function exibirAlunos(nome, dataPagamento, cor,diaDoPagamento, pos, numero,matricula){
    
    let tr = $('<tr>');
    let cols = '';
    cols += '<th scope="row">'+matricula+'</th>';
    cols += '<th scope="row">' + nome + '</th>';
    cols += '<th scope="row">'+numero+'</th>';
    cols += '<th scope="row" style="background-color:#FFF;">'+ diaDoPagamento +' de '+meses[data.getMonth()]+'</th>';
    cols += '<th id="colunaMesTaual" style="background-color:rgb'+cor+';border:solid 1px;" scope="row"  >'+ dataPagamento +'</th>'
    cols += '<th scope="row" onmouseover="mudarCorDaColunaQuandoMousePassar(this)" onmouseout="mudarCorDaColunaQuandoMouseSair(this)"  onclick="salvarMatriculaNoLocalStorag('+pos+')"><img src="../../assets/icones/icons8-notas-de-dinheiro-24.png"></th>';
    tr.append(cols);
    $('tbody').append(tr); 
}

function mudarCorDaColunaQuandoMousePassar(x) {
    x.style.backgroundColor = "lightblue";
}
  
  function mudarCorDaColunaQuandoMouseSair(x) {
    x.style.backgroundColor = "white";  
}

function carregarInformacaoDaTabela(){
   let info = document.getElementById('infoDaTabela');
   info.innerHTML += "Pagamentos até o dia " + data.toLocaleDateString();
   info.style.fontSize = '28px';
   info.style.textAlign = 'right';
}
function salvarMatriculaNoLocalStorag(pos){ 
let alunoMatricula = listaDeAlunos.content[pos].matricula;
let alunoNome = listaDeAlunos.content[pos].nome;
    localStorage.setItem('alunoMatricula',alunoMatricula);
    alert('Realizar pagamento do/da '+localStorage.getItem('alunoMatricula')+' '+alunoNome);
    location.href = '../pages/pagamento.html';
}

passarDiaAtualParaParametro();
receberLista();
carregarInformacaoDaTabela();

  