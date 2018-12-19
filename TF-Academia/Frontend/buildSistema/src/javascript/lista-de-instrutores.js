$(document).ready(function () {
    let recebe;
    let convete;

    function tabela() {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8081/instrutor');

        xhr.onload = function () {

            if (this.status == 200) {
                recebe = JSON.parse(this.responseText);
                console.log(recebe);
                atualizandoLista();
            }
        };
        xhr.onerro = () => alert('ERRO');
        xhr.send();

    }

    $('#botao-voltar').click(function () {
        location.href = '../pages/principal.html';
    });

    $('#alertSair').click(function () {
        console.log('sair');
        document.getElementById('alert').innerHTML = "";
    });

    
    $('#button-addon2').click(function () {
        document.getElementById('listaEncontrados').innerHTML = "";

        buscarPorNome();
    });
    $("a#ajax").click(function() { // inclui todos os links com id="ajax"
    $("#ajaxContent").load($(this).attr("href")); // carrega o conteúdo da página em HREF dentro da DIV #ajaxContent (id="ajaxContent")
    return false; // remove a ação do link para navegar até a página do HREF, pois ela já foi carregada na DIV
     });
    function editarAluno() {

    }

    function removerAluno() {

    }
    
    function buscarPorNome(){
        
        let nome = document.getElementById('nomeInstrutor').value;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8081/instrutor/find-name/' + nome);
        let li = " ";

        xhr.onload = function () {
            if (this.status == 200) {
                recebe = JSON.parse(this.responseText);
                console.log(recebe);
                if(recebe.content.length == 0){
                    document.getElementById('alert').innerHTML = '<div class="alert alert-danger alert-dismissible">'
                    +'<strong>Não Encontrado!</strong> Este nome não Refere-se a um aluno Cadastrado.'  
                    +'</div>'
                }else{
                    document.getElementById('alert').innerHTML = "";
                }
                 
                li = '<li class="list-group-item active">Encontrados</li>';


                for (var i = 0; i < recebe.content.length; i++) {
                     
                    
                    li += ' <li class="list-group-item"> Nome: ' + recebe.content[i].nome + ' || Email: ' + recebe.content[i].email + ' </li>';
                  
                    $('ul').append(li);
        
                }
            }
        };
        xhr.onerro = () => alert('ERRO');
        xhr.send();

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