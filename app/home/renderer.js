const irTask = () => {
    window.location.href = './taskWindow/task.html'
}

document.addEventListener('DOMContentLoaded', () => {
    window.api.getInitTask().then(tarefas => {
        if(tarefas.length > 0){
            document.getElementById('teste-task').innerHTML = 'A tarefa chegou'
        }
    }).catch(err => {
        alert('Erro ao carregar tarefas: ', err)
    })
})

window.api.makeTask((event, tarefas) => {
    tarefas.forEach(task => {
        document.getElementById('lista-de-tarefas').innerHTML = `<div class="task-item" id="tarefa-1">
                        <input type="checkbox" class="task-checkbox">
                        <span class="task-text">${task.titulo}</span>
                        <button class="delete-task-button">🗑️</button>
                    </div>`
    });
})

