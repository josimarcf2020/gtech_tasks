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
                                    <box-icon class="delete-icon" type='solid' name='trash' size='sm' data-id='${tarefa.id}'></box-icon>
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

function deletarTarefa(id){
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert("Tarefa deletada com sucesso!");
        buscarTarefas();
    })
}

const lista = document.querySelector('#lista'); // Certifique-se que o seletor '#lista' corresponde ao seu elemento UL/OL
if (lista) {
    lista.addEventListener('click', function(event) {
        const deleteButton = event.target.closest('.delete-icon'); // Verifica se o clique foi no ícone ou dentro dele
        if (deleteButton) {
            const tarefaId = deleteButton.getAttribute('data-id');
            deletarTarefa(tarefaId);
        }
    });
}

function pesquisarTarefa(){
    let lis = document.querySelectorAll("ul li");
    if(busca.value.length > 0){
        lis.forEach(li => {
            if(!li.children[0].innerText.includes(busca.value)){
                li.classList.add('oculto');
            }else{
                li.classList.remove('oculto');
            }
        })
    }else {
        lis.forEach(li => {
            li.classList.remove('oculto');
        })
    }
}
