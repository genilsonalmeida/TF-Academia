$(document).ready(function () {

    var instruct = [
        { nome: 'joao sarado', cpf: '112.222.222-22' },
        { nome: 'Edvaldo didil', cpf: '222.122.222-22' },
        { nome: 'Emanoel do arrocha', cpf: '112.000.222-22' },
        { nome: 'Junin Genilson', cpf: '999.000.222-22' }
    ], posicao = 1;

    $('#botao-voltar').click(function () {
        location.href = '../pages/principal.html';
    });

    function atualizandoLista(instrutor) {
        let tr = $('<tr>');
        let cols = '';
        cols += '<th scope="row">' + posicao + '</th>';
        cols += '<th scope="row">' + instrutor.nome + '</th>';
        cols += '<th scope="row"><img src="../../assets/icones/baseline-border_color-24px.svg" id="edite"></th>';
        cols += '<th scope="row"><img src="../../assets/icones/baseline-delete-24px.svg" id="delete"></th>'

        tr.append(cols);
        $('tbody').append(tr);
    }

    instruct.forEach(function (instruct) {

        atualizandoLista(instruct);
        posicao++
    });




});