const irTask = () => {
    window.location.href = './taskWindow/task.html'
}

window.api.makeTask((event, task, usuario) => {
    alert('chegou: ', usuario.nome)
    document.getElementById('teste-task').innerHTML = 'Sua tarefa chegou aqui'
})