$(document).ready(function () {
    let instruct;
    let recebe;
    let convete;
   
    function tabela(){

        
        let xhr = new XMLHttpRequest();
 
        xhr.open('GET','http://localhost:8081/aluno');
        
        xhr.onload = function(){
            
            if(this.status == 200){
                recebe = JSON.parse(this.responseText);
                console.log(recebe);
                atualizandoLista();  

        
       
            }
            
        };
        xhr.onerro = () => alert('ERRO');
        xhr.send();

    }
     
     instruct = [
        { nome: "df", cpf: '112.222.222-22' },
        { nome: 'Edvaldo didil', cpf: '222.122.222-22' },
        { nome: 'Emanoel do arrocha', cpf: '112.000.222-22' },
        { nome: 'Junin Genilson', cpf: '999.000.222-22' }
    ], posicao = 1;

    $('#botao-voltar').click(function () {
        location.href = '../pages/principal.html';
    });

    function atualizandoLista() {
        for (var i = 0; i < recebe.content.length; i++) {
            let tr = $('<tr>');
            let cols = '';
            cols += '<th scope="row">' + i + '</th>';
            cols += '<th scope="row">' + recebe.content[i].nome + '</th>';
            cols += '<th scope="row"><img src="../../assets/icones/baseline-border_color-24px.svg" id="edite"></th>';
            cols += '<th scope="row"><img src="../../assets/icones/baseline-delete-24px.svg" id="delete"></th>'
            tr.append(cols);
            $('tbody').append(tr);

        }
    }


    tabela();


});