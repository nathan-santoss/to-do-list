const irTask = () => {
    window.location.href = './taskWindow/task.html'
}

window.api.makeTask((event, task) => {
    alert('chegou')
    document.getElementById('teste-task').innerHTML = 'Sua tarefa chegou aqui'
})