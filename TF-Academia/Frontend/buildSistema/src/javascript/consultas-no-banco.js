

function buscarPorNomeNumeroC() {
    
    let valor = document.getElementById('buscaValor').value.toUpperCase();
    console.log(valor);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8081/aluno/buscarNomeCelular/' + valor + '/' + valor + '/0');

    xhr.onload = function () {
        if (this.status == 200) {
            alunoRequest = JSON.parse(this.responseText);
            exibirAlunoDaBusca(alunoRequest.content,alunoRequest.totalPages);
            console.log(alunoRequest);
        }
    };
    xhr.onerro = () => alert('ERRO');
    xhr.send();
}

