let contador = 0;
let input = document.getElementById('inputTarefa')
let btnAdd = document.getElementById('btnAdd')
let main = document.getElementById('areaLista')


function salvarTarefas() {
    let tarefas = [];
    document.querySelectorAll('.item').forEach(item => {
        let id = item.id;
        let texto = item.querySelector('.item-nome').innerText;
        let concluido = item.classList.contains('clicado');
        tarefas.push({ id, texto, concluido });
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}


function addTask() {
    
    let valorInput = input.value;

   
    if ((valorInput !== "") && (valorInput !== null) && (valorInput !== undefined)) {

        ++contador;
      
        let novoItem = ` <div id="${contador}" class="item">
            <div  onclick="completeTask(${contador})" class="item-icone">
                <i id="icone_${contador}" class="mdi mdi-circle-outline"></i>
            </div>
             <div onclick="completeTask(${contador})" class="item-nome" id="nome_${contador}">
            ${valorInput}
            </div>
            <div class="item-botao">
                <button onclick="editarTask(${contador})" class="edit"><i class="mdi mdi-pencil"></i>Editar</button>
                <button onclick="deletar(${contador})" class="delete"><i class="mdi mdi-delete"></i>Deletar</button>
            </div>
        </div>`


        main.innerHTML += novoItem;

        salvarTarefas();
        input.value = "";
        input.focus();

    }
}

function deletar(id) {
    var task = document.getElementById(id);
    task.remove();
    salvarTarefas();
}

function editarTask(id) {
    let itemNome = document.getElementById(`nome_${id}`); 
    let novoTexto = prompt("Edite a tarefa:", itemNome.innerText); 

    if (novoTexto !== null && novoTexto.trim() !== "") { 
        itemNome.innerText = novoTexto; 
    }
    salvarTarefas();
}

function completeTask(id) {
    var item = document.getElementById(id)
    var classe = item.getAttribute('class')
    console.log(classe)

    if (classe == "item") {
        item.classList.add('clicado');
        var icone = document.getElementById('icone_' + id);
        icone.classList.remove('mdi-circle-outline')
        icone.classList.add('mdi-check-circle')

        item.parentNode.appendChild(item);
    } else {
        item.classList.remove('clicado');

        var icone = document.getElementById('icone_' + id);
        icone.classList.remove('mdi-check-circle')
        icone.classList.add('mdi-circle-outline')
    }
    salvarTarefas();
}


function carregarTarefas() {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(tarefa => {
        let novoItem = `
        <div id="${tarefa.id}" class="item ${tarefa.concluido ? 'clicado' : ''}">
            <div onclick="completeTask(${tarefa.id})" class="item-icone">
                <i id="icone_${tarefa.id}" class="mdi ${tarefa.concluido ? 'mdi-check-circle' : 'mdi-circle-outline'}"></i>
            </div>
            <div onclick="completeTask(${tarefa.id})" class="item-nome" id="nome_${tarefa.id}">
               ${tarefa.texto}
            </div>
            <div class="item-botao">
                <button onclick="editarTask(${tarefa.id})" class="edit"><i class="mdi mdi-pencil"></i>Editar</button>
                <button onclick="deletar(${tarefa.id})" class="delete"><i class="mdi mdi-delete"></i>Deletar</button>
            </div>
        </div>`;
        main.innerHTML += novoItem;
    });
    contador = tarefas.length;
}

document.addEventListener('DOMContentLoaded', carregarTarefas);