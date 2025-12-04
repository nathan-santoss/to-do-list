const saveTask = (event) => {
    event.preventDefault()
    console.log('o objeto chegou');
    const new_task = {
        titulo: document.getElementById('title').value,
        descrip: document.getElementById('descrip').value,
        data: document.getElementById('data').value,
        prioridade: document.getElementById('prioridade').value
    }
    for (let key in new_task) {
        const valor = new_task[key]
        console.log(`Aqui a tarefa como veio: ${valor}`);
        if(valor.trim() === ''){
            key = null
            alert('preencha tudo!')
            return
        }
        continue
    }
    window.api.criarTask(new_task)
}
const botao_save = document.getElementById('botao-save')
botao_save.addEventListener('click', saveTask)