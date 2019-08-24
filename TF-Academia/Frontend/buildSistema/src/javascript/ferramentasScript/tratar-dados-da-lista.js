let nomeDosExercicios = [];

function pegarNomesDosExercicios(){
    let nomesSelect = pegarNomesDoSelects();
}

function pegarNomesDoSelects(){
    let quantidadeDeElementos = document.getElementsByClassName('select');
    let nomesValidos = [];

    console.log(quantidadeDeElementos.length);
    for(let i in quantidadeDeElementos){
        console.log(quantidadeDeElementos[i].value);
        nomesValidos = validarNomes(quantidadeDeElementos[i].value);
    }
}

function validarNomes(nome){
    return nome;
}