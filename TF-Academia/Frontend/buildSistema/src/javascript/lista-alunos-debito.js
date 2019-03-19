    jQuery(window).load(function () {
        $(".loader").delay(500).fadeOut("slow"); //retire o delay quando for copiar!
        $("#tudo_page").toggle("fast");
        buscarValorToTalDasMensalidadesEQuantidadeToTalDeAlunos();
    });

let http = new XMLHttpRequest();
let data = new Date();
let diaParametro = '';
let corNaoPago = 'rgb(255,165,0)';
let corPago = 'rgb(0,255,127)';
let meses = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
let alunosComDebito = [];
let alunosSemDebito = [];
let tbody = document.querySelector('table tbody');
let valorDosPagamentosRealizados = 0;
let valorEmDebito = 0;
let saldoTotalDoMes = 0;
let totalDeAlunos = 0;

$('#botao-voltar').click(function () {
    location.href = '../pages/principal.html';
});


$('#bnt-lista-pagos').click(function () {
    limparTabela();
    exibirAlunosSemDebito();
});

$('#bnt-lista-Debito').click(function () {
    limparTabela();
    exibirAlunosComDebito();
});


$('#recarregar-lista').click(function () {
    valorDosPagamentosRealizados = 0;
    valorEmDebito = 0;
    saldoTotalDoMes = 0;
    limparTabela();
    reiniciarAlunosComDebitoESemDebito();
    receberLista();
});

function receberLista(){
    
    http.open('GET','http://localhost:8081/aluno/listaVencimento/'+diaParametro);
    
    http.onload = function() {
        if(this.status==200){
            let recebe = JSON.parse(this.responseText);
            console.log(recebe);
            verificarRecebimentoDosAlunos(recebe);
            exibirValoresRelacionadosAosPagamentos();
        }else{
            console.log("erro");
        }
    }
    
    http.onerror = () => console.log("erro");
    http.send();
}



function carregarTabelaDeAlunos(resultado){
    console.log(resultado);
    reiniciarAlunosComDebitoESemDebito();    
    verificarRecebimentoDosAlunos(resultado);
}

function limparTabela(){
    tbody.textContent = "";
}

function reiniciarAlunosComDebitoESemDebito(){
    alunosComDebito = [];
    alunosSemDebito = [];
}

function verificarRecebimentoDosAlunos(alunos){
    if(alunos.content.length > 0){
        fecharAlerta();
        iniciarLista(alunos);
        buscarAlunosComDebito();
   }else{ exibirAlerta();}
 }

function exibirAlerta(){
    let divPrincipal = document.querySelector('#alert');
    divPrincipal.textContent = "";
    let divAlert = document.createElement('div');
    let button = document.createElement('button');
    let strong  = document.createElement('strong');
    divAlert.classList.add('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show')
    button.type = 'button';
    button.className = 'close';
    button.textContent = "x";
    button.dataset = "alert";
    
    divPrincipal.textContent = "";
    
    strong.textContent = "Não Encontrado";
    divAlert.appendChild(button);
    divAlert.appendChild(strong);
    divPrincipal.appendChild(divAlert);
} 

function fecharAlerta(){
    let divPrincipal = document.querySelector('#alert');
    divPrincipal.textContent = "";
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
   
     listaDeAlunos.content.forEach(element => {
        console.log("próximo"); 
        let mesCerto = element.registrosDePagamentos[0].pagamentos.filter(mes);
        
        if(mesCerto.length === 0){
            alunosComDebito.push(element);
        }
        else {
            alunosSemDebito.push(element);
        }
       
     });
     console.log(alunosSemDebito);
     exibirAlunosSemDebito();
     exibirAlunosComDebito();
     
}

function mes(pagamento){
  return pagamento.dataDoPagamento.slice(0,7) === data.toJSON().slice(0,7);
}

function exibirValoresRelacionadosAosPagamentos(){
    carregarSaldoDosPagamentosRealisadosEsteMes();
    carregarValorQueAindaFaltaSerPagoEsteMes();  
}

function carregarSaldoDosPagamentosRealisadosEsteMes(){
    let titulo = document.querySelector('#alunos-que-pagaram');
    titulo.textContent = "Valor Recebido de " + alunosSemDebito.length + " Alunos" ;
    let card = document.querySelector('#valores-pagos');
    card.textContent = " R$ = " + valorDosPagamentosRealizados + " reais";
}

function carregarValorQueAindaFaltaSerPagoEsteMes(){
    let titulo = document.querySelector('#alunos-em-debito');
    titulo.textContent = "Valor Não Recebido de " +  alunosComDebito.length + " Alunos";
    let card = document.querySelector('#valor-em-debito');
    card.textContent = " R$ = " + valorEmDebito + " reais";
}



function buscarValorToTalDasMensalidadesEQuantidadeToTalDeAlunos(){
    fetch('http://localhost:8081/aluno/retornarTotalDeMensalidadesEAlunos')
           .then(function(res){
               res.json().then(function(resultado){
                console.log(resultado);
                   pegarValorMensalidadesETotalDeAlunos(resultado.content[0]);
               })
           });         
}

function pegarValorMensalidadesETotalDeAlunos(resultado){
    totalDeAlunos = resultado[0]
    saldoTotalDoMes = resultado[1];
    console.log(totalDeAlunos);
    carregarValorTotalDasMesalidadesDoMes();
}

function carregarValorTotalDasMesalidadesDoMes(){
    
    let titulo = document.querySelector('#valor-total-mensalidaes');
    titulo.textContent = "Total de  Alunos " + totalDeAlunos;
    let card = document.querySelector('#valor-total');
    card.textContent = "total de mensalidades R$ = " + saldoTotalDoMes + " reais";

}

function exibirAlunosComDebito(){
   
    let dadosDoAlunoParaTabela = [];
    
    alunosComDebito.forEach(aluno =>{
        valorEmDebito += aluno.mensalidade;
        let tr = document.createElement('tr');
        dadosDoAlunoParaTabela = retornarDadosDoAlunoComDebtio(aluno);
        dadosDoAlunoParaTabela.forEach(dado =>{
            let td = criarElementoTd();
            td.textContent = dado;
            td.style.fontWeight = "700";
            tr.appendChild(td);
        });
        tr.appendChild(retornarColunaDoStatusDoPagamanto(corNaoPago,"Em Debito"));
        let tdPagar = retornaColunaParaRealizarOPagamentoComEventoOnclickComAMatricula(aluno);
        tdPagar.appendChild(adicionarIcone());
        tdPagar = adicionarEventosDeMudacaDeCorAColuna(tdPagar);
        tr.appendChild(tdPagar);
    
        tbody.appendChild(tr);
    });
}

function retornarColunaDoStatusDoPagamanto(corDaColuna, messagem){
    let tdStatus = document.createElement('td');
    tdStatus.style.backgroundColor = corDaColuna;
    tdStatus.style.fontWeight = "700";
    tdStatus.style.border = 'solid 1px';
    tdStatus.textContent = messagem;  
    return tdStatus;
}

function retornaColunaParaRealizarOPagamentoComEventoOnclickComAMatricula(aluno){
    let tdPagar = document.createElement('td');
    tdPagar.onclick = function(){
        localStorage.setItem('alunoMatricula',aluno.matricula);
        alert('Realizar pagamento do/da '+localStorage.getItem('alunoMatricula')+' '+aluno.nome);
        location.href = '../pages/pagamento.html';
    }    
    return tdPagar;
}

function adicionarIcone(){
    let img = document.createElement('img');
    img.src = "../../assets/icones/icons8-notas-de-dinheiro-24.png";
    return img;
}

function adicionarEventosDeMudacaDeCorAColuna(tdPagar){
    tdPagar.onmousemove = function(){
        mudarCorDaColunaQuandoMousePassar(tdPagar);
    }
    tdPagar.onmouseout = function(){
        mudarCorDaColunaQuandoMouseSair(tdPagar);
    }
    return tdPagar; 
}

function retornarDadosDoAlunoComDebtio(aluno){
     let informacoes = [];
     informacoes.push(aluno.matricula);
     informacoes.push(aluno.nome);
     informacoes.push(formatar(aluno.numeroCelular));
     informacoes.push(aluno.diaDoPagamento + " de " + meses[data.getMonth()]);
     return informacoes;
}

function criarElementoTd(){
    return  document.createElement('td');
}
function adicionarEstiloAColuna(){
   return style.fontWeight = "900";
}

function exibirAlunosSemDebito(){

let dadosDoAlunoParaTabela = [];
    alunosSemDebito.forEach(aluno =>{
    console.log("Mensalidade " + aluno. mensalidade + " + " + valorDosPagamentosRealizados);
        somarSaldoDeMensalidadesPagas(aluno. mensalidade);
        let tr = document.createElement('tr');
        dadosDoAlunoParaTabela = retornarDadosDoAlunoComDebtio(aluno);
        dadosDoAlunoParaTabela.forEach(dado =>{
            let td = criarElementoTd();
            td.textContent = dado;
            td.style.fontWeight = "700";
            tr.appendChild(td);
        });
        tr.appendChild(retornarColunaDoStatusDoPagamanto(corPago,"Pago"));
        let tdPagar = document.createElement('td');
        tdPagar.onclick = function(){return alert('Pagamento Deste Mês Já Foi Realizado!')};
        tdPagar.appendChild(adicionarIcone());
        tdPagar = adicionarEventosDeMudacaDeCorAColuna(tdPagar);
        tr.appendChild(tdPagar);
    
        tbody.appendChild(tr);
    });
}

function somarSaldoDeMensalidadesPagas(valor){
    valorDosPagamentosRealizados += valor;
    console.log(valorDosPagamentosRealizados);
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
function formatar(num) {
    let resultado = num.substr(0, 0) + "(" + num.substr(0);
    resultado = resultado.substr(0, 3) + ")" + resultado.substr(3);
    resultado = resultado.substr(0, 4) + " " + resultado.substr(4);
    resultado = resultado.substr(0, 10) + "-" + resultado.substr(10);

    return resultado;
}



passarDiaAtualParaParametro();
receberLista();
carregarInformacaoDaTabela();