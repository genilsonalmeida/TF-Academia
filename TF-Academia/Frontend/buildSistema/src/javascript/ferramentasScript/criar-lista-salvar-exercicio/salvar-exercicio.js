let exercicios = [];
let exerciciosArmazenados = [];
let numeroDeinput = 0;
let quantidadeDeExerciciosSalvos = 0;

function pegarNomeDoExerciocio(){
    numeroDeinput = document.getElementsByClassName("nomeExercicio").length;
    let i = 1 - numeroDeinput;
    console.log(numeroDeinput)
    i = (i * (-1))
    for(; i <= numeroDeinput - 1; i++){
        exercicio = document.getElementsByClassName("nomeExercicio")[i-1].value;
        console.log(exercicio)
        exercicios.push(exercicio);
        console.log(exercicios);
    }
   
}

async function  salvarExercicios(){
    if(exerciciosArmazenados.length > -1){
        console.log('verificar já existentes');
         let novosExercicios = await verificarSeExercicioJaExiste();
         salvarNovoExercicio(novosExercicios);
        //console.log(novosExercicios);
        //console.log(exerciciosArmazenados)
        pegarNomesDoSelects();
    }else{
        alert('estarvasio');
    }
    
}

function verificarSeExercicioJaExiste(){     
 return  exercicios.filter(function(iten){
    let exerciciosSalvos = localStorage.getItem('exercicios');
    console.log(exerciciosSalvos.includes(iten))
    return ! exerciciosSalvos.includes(iten);
    });
}

function salvarNovoExercicio(novosExercicios){
    novosExercicios.forEach(iten =>{
        exerciciosArmazenados.push(iten);
    });
    localStorage.setItem('exercicios', exerciciosArmazenados);
    iniciarListas();
}

async function  carregarExerciciosDoLocalStorage(){  
    exerciciosArmazenados = await retornaArrayDeExerciciosSalvos();
    console.log(exerciciosArmazenados)
}

function retornaArrayDeExerciciosSalvos(){
   return localStorage.getItem('exercicios').split(',');
}

carregarExerciciosDoLocalStorage();