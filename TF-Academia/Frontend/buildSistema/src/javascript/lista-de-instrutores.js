$(document).ready(function () {
    
    //Função para carregar o cabeçalho
    $("#cabecalho").load("cabecalho.html");

    
    let recebe;
    let convete;

    function tabela() {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8081/aluno');

        xhr.onload = function () {

            if (this.status == 200) {
                recebe = JSON.parse(this.responseText);
                atualizandoLista();
            }
        };
        xhr.onerro = () => alert('ERRO');
        xhr.send();

    }

    $('#botao-voltar').click(function () {
        location.href = '../pages/principal.html';
    });

    function editarAluno() {

    }

    function removerAluno() {

    }


    function atualizandoLista() {
        for (var i = 0; i < recebe.content.length; i++) {
            let tr = $('<tr>');
            let cols = '';
            cols += '<th scope="row">' + i + '</th>';
            cols += '<th scope="row">' + recebe.content[i].nome + '</th>';
            cols += '<th scope="row" onClick="editarAluno()"><img src="../../assets/icones/baseline-border_color-24px.svg"></th>';
            cols += '<th scope="row" onClick="removerAluno()"><img src="../../assets/icones/baseline-delete-24px.svg"></th>'
            tr.append(cols);
            $('tbody').append(tr);

        }
    }

    tabela();

});