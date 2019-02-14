(function(){
    jQuery(window).load(function () {
        $(".loader").delay(500).fadeOut("slow"); //retire o delay quando for copiar!
        $("#tudo_page").toggle("fast");
    });

let http = new XMLHttpRequest();
let data = new Date();
let diaParametro = '';
let corNaoPago = '(255,165,0)';
let corPago = '(0,255,127)';

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
     listaDeAlunos.content.forEach(element => {
        console.log("próximo"); 
        let mesCerto = element.registrosDePagamentos[0].pagamentos.filter(mes);
        console.log(mesCerto);
        if(mesCerto.length === 0){exibirAlunos(element.nome, "Em Falta :(", corNaoPago,element.diaDoPagamento)}
        else if(mesCerto.length !== 0){exibirAlunos(element.nome, mesCerto[0].dataDoPagamento, corPago,element.diaDoPagamento)}
     });   
}

function mes(pagamento){
  return pagamento.dataDoPagamento.slice(0,7) === data.toJSON().slice(0,7);
}

function exibirAlunos(nome, dataPagamento, cor,diaDoPagamento){
    let tr = $('<tr>');
    let cols = '';
    cols += '<th scope="row">*</th>';
    cols += '<th scope="row">' + nome + '</th>';
    cols += '<th scope="row">8888</th>';
    cols += '<th scope="row" style="background-color:#FFF;border:solid 1px;">'+ diaDoPagamento +'</th>';
    cols += '<th id="colunaMesTaual" style="background-color:rgb'+cor+';border:solid 1px;" scope="row"  >'+ dataPagamento +'</th>'
    cols += '<th scope="row"  onClick="editarAluno()"><img src="../../assets/icones/baseline-border_color-24px.svg"></th>';
    tr.append(cols);
    $('tbody').append(tr); 
}

function retornaAnoDosPagamentos(dataDoPagamento){
return dataDoPagamento.slice(0,4);
}

function carregarInformacaoDaTabela(){
   let info = document.getElementById('infoDaTabela');
   info.innerHTML += "Pagamentos até o dia " + data.toLocaleDateString();
   info.style.fontSize = '28px';
   info.style.textAlign = 'right';
}

passarDiaAtualParaParametro();
receberLista();
carregarInformacaoDaTabela();
})();   