function novaTarefa() {
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}

function fecharModal() {
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}

function buscarTarefas() {
    fetch('http://localhost:3000/tarefas')
    .then(response => response.json())
    .then(data => {
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

function persistirTarefa() {
    event.preventDefault();
    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value
    }

    fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    })
    .then(response => response.json())
    .then(data => {
        fecharModal();
        buscarTarefas();    
    })
    
}

