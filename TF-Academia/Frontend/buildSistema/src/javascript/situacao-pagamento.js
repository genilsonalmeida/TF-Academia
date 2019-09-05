
let registroId = localStorage.getItem('registroId');
let data = new Date();
let meses = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
let diaDaMatricula = 0;
let mesDaMatricula = 0;
let pagamentos = "";
$('#botao-voltar').click(function (event) {
    
    event.preventDefault();
    location.href = '../pages/lista-de-alunos.html';  

});

jQuery(window).load(function () {
    $(".loader").delay(500).fadeOut("slow"); //retire o delay quando for copiar!
    $("#tudo_page").toggle("fast");
});

function buscarpagamentosDeUmAluno(){
 
  return  fetch(`http://localhost:8081/registroPagamento/${registroId}`,{})
          .then(function(responce){       
            
           return responce.json();

        });

}



async function  tabela() {

   let registro = await buscarpagamentosDeUmAluno();
   pagamentos = extrairPagamentos(registro);
   console.log(pagamentos);
   if(pagamentos.length == 0)  exibirMessagenDetabelaVazia();
   gerarTabelaDePagamentos();
       

}

function extrairPagamentos(registro){
    return registro.pagamentos;
}

function gerarTabelaDePagamentos(){
    console.log("gerando tabela");
    let tabela = document.querySelector("#list-aluno");
    
       tabela.textContent = "";
    
      for (let pagamento  of pagamentos) {
        let indice = pagamentos.indexOf(pagamento);   
        let tr = document.createElement('tr');
        let tdIndice = retornarColunaComIndiceDo(indice);
        let dadosDasColunas =  extrairDadosParaTabela(pagamento);
                           
        tr.appendChild(tdIndice);
    
           for (let i in dadosDasColunas) {
               let td = document.createElement('td');
               td.textContent = dadosDasColunas[i];  
               tr.appendChild(td);
           }           
        
        let tdDeletar = document.createElement('td');
        tdDeletar =  retornarColunaDeletar(tdDeletar); 
        tdDeletar.onclick = function(){
            let  confirmaOpcao = confirm("Tem certeza que deseja excluir o pagamento?");
            if(confirmaOpcao){chamarMetodoParaDeletarPagamento(indice)}
            }; 
        tr.appendChild(tdDeletar);   
        tabela.appendChild(tr);     
      }
    
    }
         

function retornarColunaComIndiceDo(pagamentoIndice){
  
  let tdIndice = document.createElement('td');
  tdIndice.textContent = pagamentoIndice + 1;   
   
  return tdIndice; 
        
}

function retornarColunaDeletar(tdDeletar){
    let iconeDeletar = document.createElement('img');
        iconeDeletar.src = '../../assets/icones/baseline-delete-24px.svg';
        tdDeletar.appendChild(iconeDeletar);
        
        tdDeletar = adcionarStiloDaColuna(tdDeletar);
     return tdDeletar;   
}

function chamarMetodoParaDeletarPagamento(indice){
    return   removerPagamento(indice);     
}

function extrairDadosParaTabela(pagamento){
    let dado = [];
    
    dado.push(pagamento.dataDoPagamento);
    dado.push(pagamento.valor);
    dado.push(pagamento.descricaoDoPagamento);
    
   return dado;       
}




function carregarInformacoesDoAluno(){
    let titulo = document.querySelector('#nome-aluno');
    adicionarNomeDoAluno(titulo);
    adicionarDataDaMatricula(titulo);
}

function adicionarNomeDoAluno(titulo) {
    
    titulo.textContent = localStorage.getItem('alunoNome');
    
}

function adicionarDataDaMatricula(titulo){

    let dataDaMatricula = localStorage.getItem('alunoDataMatricula');
    titulo.textContent += " Matriculado desde " + formatarAno(dataDaMatricula);

}

function formatarAno(ano){
    let anoFormatado = ano.substring(8,10) 
                       + "/" + ano.substring(5,7) 
                       + "/" + ano.substring(0,4);
    diaDaMatricula =  ano.substring(8,10);
    return anoFormatado
}

async function removerPagamento(posicao) {

      let pagamento = pagamentos[posicao];
        console.log(pagamento);

      let url = 'http://localhost:8081/registroPagamento/' + registroId + '/deletePagamento';

      let pagamentoRemovido = await fetch(url,{
         method:'DELETE',
         mode: 'cors', // no-cors, cors, *same-origin
         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
         credentials: 'same-origin', // include, *same-origin, omit
         headers:{
           'Content-Type':'application/json',
         },
         redirect: 'follow', // manual, *follow, error
         referrer: 'no-referrer', // no-referrer, *client
         body: JSON.stringify(pagamento),
     }).then(function(){
         console.log(responce.json());
     }).catch(function(erro) {
        console.error(erro);
     });
     
      tabela(0);
  
}

 

function adcionarStiloDaColuna(td){
    td.onmousemove = function(){
        mudarCorDaColunaQuandoMousePassar(td);
    }
    td.onmouseout = function(){
        mudarCorDaColunaQuandoMouseSair(td);
    }
   return td; 
}


function mudarCorDaColunaQuandoMousePassar(x) {
    x.style.backgroundColor = "lightblue";
}

function mudarCorDaColunaQuandoMouseSair(x) {
    x.style.backgroundColor = "white";
}

function validarResultado(valor){
    if(valor === 0){
        console.log("não validado");
        return false;
    }else{
        console.log("validado");
        return true;
        }
}

function exibirMessagenDetabelaVazia(){
    let divContent = document.querySelector('#sem-pagamento');
    divContent.style.backgroundColor = 'rgba(255,166,77)';
    divContent.style.margin = '0px auto';
    divContent.style.width = '30%';
    divContent.style.padding = '5% 5% 5% 5%';
    divContent.style.borderRadius = '3% 3% 3% 3%';
    let menssagen = document.createElement('h3');
    menssagen.textContent = "Ainda Não há Pagamentos";
    menssagen.style.textAlign = 'center';
    divContent.appendChild(menssagen);
}

tabela();
carregarInformacoesDoAluno();