let numberTask = 0
const saveTask = (event) => {
    event.preventDefault()
    numberTask++
    const new_task = {
        titulo: document.getElementById('title').value,
        descrip: document.getElementById('descrip').value,
        data: document.getElementById('data').value,
        prioridade: document.getElementById('prioridade').value,
        checked: false,
        id: numberTask
    }
    for (let key in new_task) {
        const valor = new_task[key]
        if(typeof valor === "string" && valor.trim() === ''){
            throw Error(`O campo '${key}' está`)
        }
        continue
    }
    alert(`O objeto chegou aqui`)
    window.api.criarTask(new_task)
}
const botao_save = document.getElementById('botao-save')
botao_save.addEventListener('click', (event) => {
    try{
        saveTask(event)
    }catch(e){
        console.error(e)
        return
    }
})