const saveTask = () => {
    console.log('o objeto chegou');
    const new_task = {
        titulo: document.getElementById('title').value,
        descrip: document.getElementById('descrip').value,
        data: document.getElementById('data').value,
    }
    for (let key in new_task) {
        const valor = new_task[key]
        if(valor.trim() === ''){
            key = null
            alert('preencha tudo!')
            return
        }
        continue
    }
    console.log(`Aqui a tarefa como veio: ${new_task}`);
}