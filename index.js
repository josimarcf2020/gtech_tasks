function novaTarefa() {
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}

function fecharModal() {
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}

function buscarTarefas() {
    console.log("Buscando tarefas...");
    fetch('http://localhost:3000/tarefas')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        popularTarefas(data);
    })
}
buscarTarefas();

function popularTarefas(listaDetarefas) {
    if(listaDetarefas.length > 0) {
        lista.innerHTML = "";
        listaDetarefas.map(tarefa => {
            lista.innerHTML += 
                            `<li>
                                <h5>${tarefa.titulo}</h5>
                                <p>${tarefa.descricao}</p>
                                <div class="actions">
                                    <box-icon type='solid' name='trash' size='sm'></box-icon>
                                </div>
                            </li>`;
        })
    }
}