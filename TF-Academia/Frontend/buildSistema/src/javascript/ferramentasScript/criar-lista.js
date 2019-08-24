
const select = document.querySelector.bind(document);
const creat = document.createElement.bind(document);
let  inpultNomeExercicio;
let chaveId = 0;

document.getElementById('mais').addEventListener(
    'click', executar, false
);

function executar(evt){
    evt.preventDefault();
    adicionarMaisUmExercicio();
    pegarNomeDoExerciocio();
}



 function adicionarMaisUmExercicio(){
    
   let form = select('.form');
   let formRow = creat('div');
   let label = creat('label');

   formRow.classList.add('form-row');
   label.textContent = "EXERCICIOS";
   
   inpultSelect =  adicionarfomrGrop(criarInputSelectExercicios());
   inpultNomeExercicio =  adicionarfomrGrop(adicionarInputDoNomeDoExercicio());
   inputQntSeries =  adicionarfomrGrop(adicionarQuantidadeDeSeries());
   inpultQtnRepeticoes = adicionarfomrGrop(adicionarInputQuantidadeDeExercicio());
   
  // inpultSelect = sincronizarSelectComInputNomeExercicio(inpultSelect, inpultNomeExercicio);
    
   formRow.appendChild(inpultSelect);
   formRow.appendChild(inpultNomeExercicio);
   formRow.appendChild(inputQntSeries);
   formRow.appendChild(inpultQtnRepeticoes);
   formRow.id = chaveId;
   form.appendChild(formRow);
   chaveId++;
   console.log(chaveId);
}

function adicionarfomrGrop(element){
    const formGrop = creat('div');
    formGrop.classList.add("form-group","col-md-2");
    formGrop.appendChild(element);
    return formGrop;
}

function criarInputSelectExercicios(){
  let select = creat('select');
  select.classList.add('form-control','selecionar','select');
  select.id = "slect" + chaveId;
  select = carregarOpcoesDoSelectExercicio(select)
  
  return select;
}

function adicionarInputDoNomeDoExercicio(){
    let input = creat('input');
    input.classList.add('form-control','nomeExercicio','nomeExercicio');
    input.placeholder = "ex:Nome do execício";
    input.id = "nome" + chaveId;
    input.onfocus = function(){localStorage.getItem('aluno-nome')};
    return input;
}

function adicionarQuantidadeDeSeries(){
    let inputSeries = creat('input');
    inputSeries.classList.add('form-control','series','col-md-6');
    inputSeries.type = 'number';
    inputSeries.min = 1; 
    return inputSeries;
}

function adicionarInputQuantidadeDeExercicio(){
    const inputNumber = creat('input');
    inputNumber.classList.add('form-control','qntExercicio','col-md-6');
    inputNumber.type = 'number';
    inputNumber.min = 1;
    return inputNumber;
}

function carregarOpcoesDoSelectExercicio(select){
    let optionVasio = creat('option');
    optionVasio.textContent = "escolher";
    
    select.appendChild(optionVasio);
    
    exerciciosArmazenados.forEach(exercicio =>{
        let option = creat('option');
        option.textContent = exercicio;
        option.value = exercicio;
        //console.log(option)
        select.appendChild(option);
    })
    
    return select;
}

function carregarOPrimeiroSelet(){
    let selectOne = select('#select');
    selectOne = carregarOpcoesDoSelectExercicio(selectOne);
}

function salvarValor(event){
    alert(event);
}
