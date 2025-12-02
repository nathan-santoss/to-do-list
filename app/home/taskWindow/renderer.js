const saveTask = () => {
    const new_task = {
        titulo: document.getElementById('title').value,
        descrip: document.getElementById('descrip').value,
        data: document.getElementById('data').value,
    }
    for (const key in new_task) {
        if(key.trim() === ''){
            key = null
            alert('preencha tudo!')
            return
        }
        continue
    }
}