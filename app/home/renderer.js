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
const atualizar_tarefas = (tarefas) => {
    tarefas.forEach((task, index) => {
        const item = document.createElement('div')
        item.classList.add(`${task.checked ? "task-item completed" : "checkbox-task"}`)
        item.id = `${index+1}`
        item.innerHTML = `
        <input
            type= "checkbox"
            class = "task-checkbox"
            ${task.checked ? "checked" : ""}
        >
        <span class = "task-text">${task.titulo}</span>
        <button class = "delete-task-button"> 🗑️ </button>
        `
        listaHTML.appendChild(item)
    });
}


listaHTML.addEventListener('click', (event) => {
    if(event.target.classList.contains('task-checkbox') || event.target.classList.contains('')){
        const box = event.target.dataset.id
        window.api.checkBox(box).then((result) => {
            let tarefaEscolhida = document.querySelector(`input[id="${result}"]`);
            if(result === null){return}
            else if(result === true){
                tarefaEscolhida.classList.toggle('checkbox-task')
            }else{
                tarefaEscolhida.classList.toggle('task-item completed')
            }
        })
        // aqui envia a solicitação para o main colocar como 'checked' a task
    }
    return
})




