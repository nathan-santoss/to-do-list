const irTask = () => {
    window.api.abrirTask()
}
window.api.makeTask((event, task) => {
    document.getElementById('teste-task').innerHTML = 'Sua tarefa chegou aqui'
})