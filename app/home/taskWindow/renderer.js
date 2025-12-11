import { formatar_data, set_diaDaSemana } from "../../function/function.js"
const saveTask = (event) => {
    event.preventDefault()
    const dataAtual = new Date()
    const new_task = {
        titulo: document.getElementById('title').value,
        descrip: document.getElementById('descrip').value,
        data: set_diaDaSemana(dataAtual),
        prioridade: document.getElementById('prioridade').value,
        date_create: formatar_data(dataAtual),
        data_conclusao: document.getElementById('data').value,
        checked: false,
        id: null
    }
    for (let key in new_task) {
        const valor = new_task[key]
        if(typeof valor === "string" && valor.trim() === ''){
            throw Error(`O campo '${key}' está`)
        }
        continue
    }
    if(new Date(new_task.data_conclusao).getTime() < dataAtual.getTime()){
        // crie aqui uma funcionalidade para emitir um alerta personalizado 
        return
    }
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