// Mudar para tela de criação de tarefa >>>>>
const add_taskButton = document.getElementById("botao-addTask")
add_taskButton.addEventListener('click', () => {
    window.location.href = './taskWindow/task.html'
})
// atualizando a página home com as tarefas do usuário >>>>
const listaHTML = document.getElementById('lista-de-tarefas')
document.addEventListener('DOMContentLoaded', () => {
    listaHTML.innerHTML = ''
    window.api.getInitTask().then(tarefas => {
            atualizar_tarefas(tarefas)
    }).catch(err => {
        alert('Erro ao carregar tarefas: ', err)
    })
})
const atualizar_tarefas = (tarefas, diaSemana) => {
    tarefas.forEach((task, index) => {
        const item = document.createElement('div')
        item.classList.add(`task-item`)
        if(task.checked){
            item.classList.add('completed')
        }
        item.innerHTML = `
        <input
            type= "checkbox"
            class = "task-checkbox"
            data-id = ${task.id}
            ${task.checked ? "checked" : ""}
        >
        <span class = "task-text">${task.titulo}</span>
        <button class = "delete-task-button"> 🗑️ </button>
        `
        listaHTML.appendChild(item)
    });
}


listaHTML.addEventListener('click', (event) => {
    if(event.target.classList.contains('task-checkbox')){
        const box = parseInt(event.target.dataset.id)
        const taskDiv = event.target.closest('.task-item')
        window.api.checkBox(box).then((result) => {
            if(result === true){
                taskDiv.classList.add('completed')
            }else if(result === false){
                taskDiv.classList.remove('completed')
            }
        })
        // aqui envia a solicitação para o main colocar como 'checked' a task
    }
    else if(event.target.classList.contains('delete-task-button')){
        const taskID = parseInt(event.target.dataset.id)
        window.api.delete_task(taskID).then((result) => {
            // criar interação para deletar a task
        })
    }
    return
})




