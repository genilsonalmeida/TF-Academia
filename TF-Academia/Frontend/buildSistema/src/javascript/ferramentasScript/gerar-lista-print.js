let valorDosSelects = [];
let valorDosNomesDosExercicios = [];
let valorDasSeries = [];
let valorDasRepeticoes = [];
let quantidadeDeFormsRow = document.getElementsByClassName("form-row").length;

function iniciarListas(){
valorDosSelects = carregarNoArrayValoresDosInpults(document.getElementsByClassName("select"));
valorDosNomesDosExercicios = carregarNoArrayValoresDosInpults(document.getElementsByClassName("nomeExercicio"));
valorDasSeries = carregarNoArrayValoresDosInpults(document.getElementsByClassName("series"));
valorDasRepeticoes = carregarNoArrayValoresDosInpults(document.getElementsByClassName("qntExercicio"));
criarListaQueVaiSerImprimida();
}

function carregarNoArrayValoresDosInpults(inpult){
    let valores = [];
     for(let i = 0; i <= inpult.length -1; i++){
         valores.push(inpult[i].value);
      }
     return valores; 
}

function criarListaQueVaiSerImprimida(){
  let p = document.createElement("p");
  p.textContent = "Olá !";
  console.log(p);
    for(let i = 0; i <= quantidadeDeFormsRow - 1; i++){
      document.write("<font size='2'>"+ valorDosSelects[i] + valorDosNomesDosExercicios +"</font>");
    }
   	window.print();
    window.close();            
}
